/** @param {NS} ns **/
export async function main(ns) {
	// Continuously try to purchase servers until we've reached the maximum
	// amount of servers
	let ram = 8;
	let i = 0;

	while (i < ns.getPurchasedServerLimit()) {
		// Check if we have enough money to purchase a server
		if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
			// Don't buy server /w name if already exists
			if (ns.serverExists("ps"+ i)) {++i; continue;}
			// If we have enough money, then:
			//  1. Purchase the server
			//  2. Copy our hacking script onto the newly-purchased server
			//  3. Run our hacking script on the newly-purchased server with 3 threads
			//  4. Increment our iterator to indicate that we've bought a new server
			let hostname = ns.purchaseServer("ps" + i, ram);
			await ns.scp("farm.js", hostname);
			ns.exec("farm.js", hostname, 3);
			++i;
		}
		await ns.sleep(1000);
	}
	ns.print("Purchased all possible Servers");
}