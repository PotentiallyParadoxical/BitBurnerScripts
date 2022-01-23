/** @param {import(".").NS } ns */
export async function main(ns) {
	let target = "foodnstuff";

	// Make sure the server has at least 75% of possible money before hacking it
	let moneyThresh = ns.getServerMaxMoney(target) * 0.75;

	// If the security is higher than this we must weaken first
	let securityThresh = ns.getServerMinSecurityLevel(target) + 5;
	
	// Infinitly loop hack/grow/weaken on target
	while("GLASS") {
		if(ns.getServerSecurityLevel(target) > securityThresh){
			await ns.weaken(target);
			continue;
		}
		if(ns.getServerMoneyAvailable(target) < moneyThresh){
			await ns.grow(target);
			continue;
		}
		await ns.hack(target);
	}
}