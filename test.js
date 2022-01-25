/** @param {import(".").NS } ns */
export async function main(ns) {
    let i = 1;
    while("bread") {
        ns.print(i);
        laugh();
        await ns.sleep(4000);
        ++i;
    }
}
function laugh(){
    var audio = new Audio("http://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg");
    audio.play();
}   