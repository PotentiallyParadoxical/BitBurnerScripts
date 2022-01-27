import { buildTree, connectLine } from "./lib";

/** @param {import(".").NS } ns */
export async function main(ns) {
    checkRecurive(buildTree(ns), "");
    function checkRecurive(servers, path) {
        let server = servers.name;
        let contracts = ns.ls(server, ".cct");
        if (contracts.length > 0){
            ns.tprint("Contracts found on " + server);
            ns.tprint(connectLine(path + "/" + server));
            contracts.forEach(contract => {
                ns.tprint("    " + contract);
            });
        }

        for (let i = 0; i < servers.sub.length; i++) {
            checkRecurive(servers.sub[i], path + "/" + server);
        }
    }
}