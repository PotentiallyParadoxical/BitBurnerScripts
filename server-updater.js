import { buildTree } from "./lib";

/** @param {import(".").NS } ns */
export async function main(ns) {
	let cost = ns.getScriptRam("threadScripts/grower.js");

	let servers = buildTree(ns);
    let threadsDeployed = 0;
    let totalRamHacked = 0;
    let totalRam = 0;
    
    await recursiveServerCheck(servers);
    async function recursiveServerCheck(servers) {
        let server = servers.name

        if (server == ns.getHostname()) {return;} // Don't want to ruin stuff running on host.

        ns.print("Checking " + server);
        totalRam += ns.getServerMaxRam(server);
        // If server is rooted then run hacking script on it.
        if (ns.hasRootAccess(server)){
            await recruteServer(server);
        }
        else {
            // Try breaking in
            let toolsUsed = 0;
            if (ns.fileExists("BruteSSH.exe")) { ns.brutessh(server); ++toolsUsed; }
            if (ns.fileExists("FTPCrack.exe")) { ns.ftpcrack(server); ++toolsUsed; }
            if (ns.fileExists("HTTPWorm.exe")) { ns.httpworm(server); ++toolsUsed; }
            if (ns.fileExists("SQLInject.exe")) { ns.sqlinject(server); ++toolsUsed; }
            if (toolsUsed >= ns.getServerNumPortsRequired(server)){
                ns.nuke(server);
            }
            if (ns.hasRootAccess(server)){
                await recruteServer(server);
            }
        }
        for (let i = 0; i < servers.sub.length; i++) {
            await recursiveServerCheck(servers.sub[i]);
        }
    }

    ns.print(totalRamHacked + "/" + totalRam);
    ns.print("DONE");

    async function recruteServer(server){
        ns.print("Installing on " + server);
        ns.killall(server);
		//await ns.scp("threadScripts/farm.js", server); // Old farmer script
        await ns.scp("threadScripts/weakener.js", server);
        await ns.scp("threadScripts/grower.js", server);
        await ns.scp("threadScripts/hacker.js", server);

        let targets = ["iron-gym"]
        let target = targets[Math.floor(Math.random()*targets.length)];

        let maxThreads = Math.floor(ns.getServerMaxRam(server)/cost);
        totalRamHacked += ns.getServerMaxRam(server);

        let weakThreads = 0;
        let growThreads = 0;
        let hackThreads = 0;
        for (let thread = 0; thread < maxThreads; thread++) {
            if (threadsDeployed%10 <= 5){
                ++growThreads;
            }
            else if (threadsDeployed%10 <= 7){
                ++weakThreads;
            }
            else {
                ++hackThreads;
            }
            ++threadsDeployed;
        }
        if (maxThreads > 0){
            if (weakThreads>0) {ns.exec("threadScripts/weakener.js", server, weakThreads, target);}
            if (growThreads>0) {ns.exec("threadScripts/grower.js", server, growThreads, target);}
            if (hackThreads>0) {ns.exec("threadScripts/hacker.js", server, hackThreads, target);}
        }
    }
}