function getRootedSubServers(host){
    let subservers = ns.scan(host)
    subservers.forEach(server => {
        if (!servers.includes(server) && server !== rhost){
            ns.print("Found " + server);
            servers.push(server);
            
            // Snatch all contracts
            if (ns.ls(server, ".cct").length > 0) {
                ns.tprint("Contract " + ns.ls(server, ".cct") + "found on server " + server + "!");
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