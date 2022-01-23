/** @param {import(".").NS } ns */
export async function main(ns) {

    let allowance = 0.5;

    while (true) {
        // Figure out what the cheapest upgrade will be
        var upgradeType = "null";
        var upgradeNode = 0;
        var upgradeCost = 100000000000;

        if (ns.hacknet.numNodes() < ns.hacknet.maxNumNodes()) {
            upgradeType = "new";
            upgradeCost = ns.hacknet.getPurchaseNodeCost();
        }
        for (let i = 0; i < ns.hacknet.numNodes(); i++) {
            if (ns.hacknet.getLevelUpgradeCost(i, 1) < upgradeCost){
                upgradeType = "level";
                upgradeNode = i;
            }
            if (ns.hacknet.getRamUpgradeCost(i, 1) < upgradeCost){
                upgradeType = "ram";
                upgradeNode = i;
            }
            if (ns.hacknet.getCoreUpgradeCost(i, 1) < upgradeCost){
                upgradeType = "core";
                upgradeNode = i;
            }
        }
        
        // Try buying it?
        if (upgradeType == null) { 
            ns.alert("Maxed out hacknet?!")
            return;
        }
        // Sleep longer to wait for money
        let money = ns.getPlayer().money * allowance;
        ns.print("I have " + money + "; Planning to buy " + upgradeType + " for node " + upgradeNode + " for " + upgradeCost);
        if (money < upgradeCost) { await ns.sleep(500); continue;}
        switch (upgradeType) {
            case "new":
                ns.hacknet.purchaseNode();
                break;
            case "level":
                ns.hacknet.upgradeLevel(upgradeNode, 1);
                break;
            case "ram":
                ns.hacknet.upgradeRam(upgradeNode, 1);
                break;
            case "core":
                ns.hacknet.upgradeCore(upgradeNode, 1);
                break;
        }
        await ns.sleep(10);
    }
}