/* Wap to create a timer for 15 minutes using setInterval and setTimeout. Display the passing time */
/*var timer = 15 * 60; // 15 minutes in seconds
var interval = setInterval(() => {
    timer--;
    console.log(timer);
    if (timer <= 0) {
        clearInterval(interval);
        console.log("Time's up!");
    }
}, 1000);


counter=90;
setTimeout(setInterval( ()=>{
    counter--;
console.log(parseInt(counter/60), counter%60);
},1000),
50
) */

var totalsecondsleft= 900;
var counter=0;

let timer=setInterval( ()=>{
    totalsecondsleft--;
    console.log(counter + " seconds have passed");
    if(totalsecondsleft==0){
        clearInterval(timer);
        console.log("Time's up!");
    }
},1000);

function display(){
    let seconds= totalsecondsleft%60;
    let minutes= parseInt(totalsecondsleft/60);
    console.log(minutes + " minutes and " + seconds + " seconds left");
}