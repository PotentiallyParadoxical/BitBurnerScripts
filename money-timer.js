/** @param {import(".").NS } ns */
export async function main(ns) {
    while(true){
        if (ns.getServerMoneyAvailable("home") > ns.args[0]){
            playAudio();
        }
        await ns.sleep(3000);
    }
}

function playAudio(){
    var audio = new Audio("file:///home/andy/Music/ags_rr.mp3");
    audio.play();
}