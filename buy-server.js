/** @param {import(".").NS } ns */
export async function main(ns) {
    ns.tprint(ns.purchaseServer(ns.args[0], ns.args[1]));
}