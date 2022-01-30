/** @param {import(".").NS } ns */
export function buildTree(ns) {
    let seenServers = [];
    return ServerStruct(ns.getHostname());
    function ServerStruct(server) {
        seenServers.push(server);
        let subservers = ns.scan(server);
        let structedSubs = [];
        ns.print("asdf " + subservers);
        for (let i = 0; i < subservers.length; i++) {
            if (!seenServers.includes(subservers[i])) {
                structedSubs.push(ServerStruct(subservers[i]));
            }
        }
        return {
            name: server,
            sub: structedSubs
        }
    }
}
export function connectLine(path) {
    let line = "";
    let jumps = path.split("/");
    for (let i = 1; i < jumps.length; i++) {
        line += "connect " + jumps[i] + "; "
    }
    return line;
}