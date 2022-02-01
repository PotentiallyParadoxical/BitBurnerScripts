/** @param {import(".").NS } ns */
export async function main(ns) {
    if (ns.args.length < 2){
        ns.tprint(ns.getPurchasedServerCost(ns.args[0]));
    }else{
        ns.tprint(ns.purchaseServer(ns.args[0], ns.args[1]));
    }
}