/** @param {import(".").NS } ns */
export async function main(ns) {
	let i = 0;
	let cost = ns.getScriptRam("farm.js");

    ns.print("ping");
	let servers = getAllRootedServers(10);
    ns.print(servers);
    for (let i = 0; i < servers.length; i++) {
        ns.print("setting up " + servers[i]);
        const server = servers[i];
		ns.killall(server);
		await ns.scp("farm.js", server);

        let maxThreads = Math.floor(ns.getServerMaxRam(server)/cost);
        if (maxThreads > 0){
            ns.exec("farm.js", server, maxThreads);
        }
	};

	function getAllRootedServers(depth) {
		let servers = [];
        let serversVuln = [];
		let rhost = ns.getHostname();

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