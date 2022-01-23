/** @param {NS} ns **/
export async function main(ns) {
	let i = 0;

	while ("asdf") {
		if (!ns.serverExists("ps" + i)) {break;}

		let hostname = "ps" + i;
		ns.killall(hostname);
		await ns.scp("farm.js", hostname);
		ns.exec("farm.js", hostname, 3);
		++i;
	}	
}