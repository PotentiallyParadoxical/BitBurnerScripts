/** @param {import(".").NS } ns */
export async function main(ns) {
	let i = 0;
	let cost = ns.getScriptRam("farm.js");

	let servers = getAllRootedServers(3);
    ns.print(servers);
    ns.print("ping");
    for (let i = 0; i < servers.length; i++) {
        ns.print("setting up " + servers[i]);
        const server = servers[i];
		ns.killall(server);
		await ns.scp("farm.js", server);
		ns.exec("farm.js", server, Math.floor(ns.getServerMaxRam(server)/cost));
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
				}
			});
            return subservers;
		}
        return serversVuln;
	}
}