var player;
var current_player_X;
var current_player_Y
var player_speed = 5;

function init(){
    console.log("init start");
    /*
    const player = document.querySelector('#player1');
    const top_offset = player.style.top;
    console.log(top_offset);
    */
   player = document.getElementById("player1");
   player.style.top  =(innerHeight /5);
   player.style.left =(innerWidth /2); 
   console.log(current_player_X +"X" + current_player_Y);
   
   
    
}
/*
document.addEventListener("keydown", function(key_press){
    current_player_X = parseInt(player.style.left);
    current_player_Y = parseInt(player.style.top);
    if(key_press.key == "w"){
        console.log('w');
    }
    else if(key_press.key == "a"){
        console.log('a');
    }
    else if(key_press.key == "s"){
        console.log('s');
    }
    else if(key_press.key == "d"){
        console.log('d');
    }
});
*/

//player input

const keys = {};
document.addEventListener("keydown",(e) =>{
    keys[e.key] = true; //set key to active when pressed
});
document.addEventListener("keyup",(e)=>{
    keys[e.key] = false;
});
function check_player_input(){
    const key_W = keys["W"] || keys["w"];
    const key_A = keys["A"] || keys["a"];
    const key_S = keys["S"] || keys["s"];
    const key_D = keys["D"] || keys["d"];
    current_player_X = parseInt(player.style.left);
    current_player_Y = parseInt(player.style.top);
    

    if(key_W && key_A){
        console.log("wa");
        player.style.top = (current_player_Y - player_speed);
        player.style.left = (current_player_X - player_speed);
    }
    else if(key_W && key_D){
        console.log("wd");
        player.style.top = (current_player_Y - player_speed);
        player.style.left = (current_player_X + player_speed);
    }
    else if(key_A && key_S){
        console.log("as");
        player.style.left = (current_player_X - player_speed);
        player.style.top = (current_player_Y + player_speed);
    }
    else if(key_S && key_D){
        console.log("sd");
        player.style.top = (current_player_Y + player_speed);
        player.style.left = (current_player_X + player_speed);
    }
    else if(key_W){
        console.log("w");
        player.style.top = (current_player_Y - player_speed);
    }
    else if(key_A){
        console.log("a");
        player.style.left = (current_player_X - player_speed);
    }
    else if(key_S){
        console.log("s");
        player.style.top = (current_player_Y + player_speed);
    }
    else if(key_D){
        console.log("D");
        player.style.left = (current_player_X + player_speed);
    }
    //console.log(key_W + "+" + key_A + "+" + key_S + "+" + key_D);
}

setInterval(check_player_input,10);