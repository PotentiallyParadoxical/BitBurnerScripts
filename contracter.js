import { buildTree, connectLine} from "./lib";

/** @param {import(".").NS } ns */
export async function main(ns) {

    let autoFillout = false;
    if (ns.args.length >= 1){
        if (ns.args[0] = "fill") { autoFillout = true; }
    }

    checkRecurive(buildTree(ns), "");
    function checkRecurive(servers, path) {
        let server = servers.name;
        let contracts = ns.ls(server, ".cct");
        if (contracts.length > 0){
            ns.tprint("Contracts found on " + server);
            ns.tprint(connectLine(path + "/" + server));
            contracts.forEach(contract => {
                ns.tprint("    " + contract);
                ns.tprint("    " + "    " + ns.codingcontract.getContractType(contract, server));
                ns.tprint("    " + "    " + ns.codingcontract.getDescription(contract, server));
                ns.tprint("    " + "    " + ns.codingcontract.getData(contract, server));
                let method = getCorrectSolution(contract, server);
                if (method !== null){
                    let sollution = ns.codingcontract.getData(contract, server);
                    if (autoFillout) {
                        ns.codingcontract.attempt(
                            sollution,
                            contract,
                            server
                        )
                    } else {
                        ns.tprint("    " + "    " + "sollution: " + sollution)
                    }
                }
            });
        }

        for (let i = 0; i < servers.sub.length; i++) {
            checkRecurive(servers.sub[i], path + "/" + server);
        }
    }

    function getCorrectSolution(contract, server){
        switch (ns.codingcontract.getContractType(contract, server)) {
            case "Algorithmic Stock Trader I":
                return contract_algoStockCrude;
            case "Find Largest Prime Factor":
                return contract_largestPrimeFactor;
            default:
                ns.tprint("    " + "    " + "Don't have a script for this type of contract yet. :(")
                return null;
        }
    }
}
export function contract_largestPrimeFactor(n) {
    var i = 2;
    while (i <= n) {
        if (n % i == 0) {
            n /= i;
        } else {
            i++;
        }
    }
    return i;
}
export function contract_algoStockCrude(array) {
	let largestIncrease = 0;
	for (let start = 0; start < array.length; start++) {
		for (let end = start+1; end < array.length; end++) {
			if (array[end] - array[start] > largestIncrease){ largestIncrease = array[end] - array[start]; }
		}
	}
	return largestIncrease;
}
export function contract_MergeOverLappingIntervals(array) {
	
	return i;
}
export function contract_GenerateIPAddresses(n) {

	return i;
}