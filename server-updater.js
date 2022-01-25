/** @param {import(".").NS } ns */
export async function main(ns) {
	let i = 0;
	let cost = ns.getScriptRam("grower.js");

    ns.print("ping");
	let servers = getAllRootedServers(10);
    ns.print(servers);
    let threadsDeployed = 0
    let totalRam = 0
    for (let i = 0; i < servers.length; i++) {
        ns.print("setting up " + servers[i]);
        const server = servers[i];
		ns.killall(server);
		await ns.scp("farm.js", server); // Old farmer script
        await ns.scp("weakener.js", server);
        await ns.scp("grower.js", server);
        await ns.scp("hacker.js", server);

        let targets = ["iron-gym"]
        let target = targets[Math.floor(Math.random()*targets.length)];

        let maxThreads = Math.floor(ns.getServerMaxRam(server)/cost);
        totalRam += ns.getServerMaxRam(server);

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
            if (weakThreads>0) {ns.exec("weakener.js", server, weakThreads, target);}
            if (growThreads>0) {ns.exec("grower.js", server, growThreads, target);}
            if (hackThreads>0) {ns.exec("hacker.js", server, hackThreads, target);}
        }
	}
    ns.print(totalRam);
	function getAllRootedServers(depth) {
		let servers = [];
        let serversVuln = [];
		let rhost = ns.getHostname();

        let path = ""
		getRootedSubServers(rhost);
		for (let i = 1; i < depth; i++) {
			servers.forEach(server => {
				getRootedSubServers(server);
			});
		}

		function getRootedSubServers(host){
			let subservers = ns.scan(host)
			subservers.forEach(server => {
				if (!servers.includes(server) && server !== rhost){
                    ns.print("Found " + server);
                    servers.push(server);
                    
                    // Snatch all contracts
                    if (ns.ls(server, ".cct").length > 0) {
                        ns.tprint("Contract " + ns.ls(server, ".cct") + " found on server " + server + "!\n" + path);
                    }
                    
                    if (ns.hasRootAccess(server)){
                        serversVuln.push(server);
                    }
                    else {
                        // Try breaking in
                        let toolsUsed = 0;
                        if (ns.fileExists("BruteSSH.exe")) { ns.brutessh(server); ++toolsUsed; }
                        if (ns.fileExists("FTPCrack.exe")) { ns.ftpcrack(server); ++toolsUsed; }
                        if (ns.fileExists("HTTPWorm.exe")) { ns.httpworm(server); ++toolsUsed; }
                        if (toolsUsed >= ns.getServerNumPortsRequired(server)){
                            ns.nuke(server);
                        }
                        ns.print("Forced " + server + " with " + toolsUsed + "/" + ns.getServerNumPortsRequired(server) + " tools");
                        if (ns.hasRootAccess(server)){
                            serversVuln.push(server);
                        }
                    }
				}
			});
            return subservers;
		}
        return serversVuln;
	}
    ns.print("DONE");
}