/** @param {NS} ns **/
export async function main(ns) {
	ns.tprint(crudeGetLargestIncrease(ns.args[0]));
}
export function algoStockCrude(array) {
	let largestIncrease = 0;
	for (let start = 0; start < array.length; start++) {
		for (let end = start+1; end < array.length; end++) {
			if (array[end] - array[start] > largestIncrease){ largestIncrease = array[end] - array[start]; }
		}
	}
	return largestIncrease;
}