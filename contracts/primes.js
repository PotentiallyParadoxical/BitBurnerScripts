/** @param {NS} ns **/
export async function main(ns) {
	function largestPrimeFactor(n) {
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
	ns.tprint(largestPrimeFactor(ns.args[0]));
}