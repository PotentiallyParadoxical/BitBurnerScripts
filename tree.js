import { buildTree } from "./lib";

/** @param {import(".").NS } ns */
export async function main(ns) {
    ns.codingcontract
    let farmingStats = false;
    //Exec
    printDataStructure(
        buildTree(ns)
    );
    function printDataStructure(data) {
        printWithChildren(data, "", true);

        function printWithChildren(server, leftpadding, lastChild) {
            let nextPadding = leftpadding;
            if (lastChild) {
                ns.tprint(leftpadding + "└─" + createPrintLine(server.name));
                nextPadding += "  ";
            } else {
                ns.tprint(leftpadding + "├─" + createPrintLine(server.name));
                nextPadding += "| ";
            }
            for (let child = 0; child < server.sub.length; child++) {
                if (child == server.sub.length - 1) {
                    printWithChildren(server.sub[child], nextPadding, true);
                    continue;
                }
                printWithChildren(server.sub[child], nextPadding, false);
            }
        }

        function createPrintLine(server) {
            let line = server
            if (ns.hasRootAccess(server)) {
                line += "# "
            }
            else {
                line += "$ "
            }
            line += "LV" + ns.getServerRequiredHackingLevel(server) + " "
            if (ns.getServerNumPortsRequired(server) > 0) {
                line += "NeededPorts" + ns.getServerNumPortsRequired(server) + " ";
            }

            if (!farmingStats) {
                line += ns.getServerMaxRam(server) + "GiB"
                return line;
            }
            //Otherwise add farming related stats
            if (ns.getServerMaxRam(server) > 0) {
                line += ns.getServerUsedRam(server) + "/" + ns.getServerMaxRam(server) + "GiB ";
            }
            if (ns.getServerMaxMoney(server) > 0) {
                line += "$" + server.money + "/" + server.maxMoney + " ";
            }
            if (ns.getServerGrowth(server) > 0) {
                line += "Growth" + ns.getServerGrowth(server) + " ";
            }
            if (ns.getServerSecurityLevel(server) > 0) {
                line += "Security" + ns.getServerMinSecurityLevel(server) + "/" + ns.getServerSecurityLevel(server);
            }
            return line;
        }
    }
}