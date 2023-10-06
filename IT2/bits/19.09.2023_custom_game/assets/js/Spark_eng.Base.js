var DEBUG = false; 
//-------------------------------------------------------------------------------------------------------------
//------------------------------------VARS---------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
var second_loop_counter = 0;
function game_loop(){
    //This loop runs every 10ms. Us it for fast OPS
    check_player_input(); 
}
function second_game_loop(){
    //This loop runs every 
}

function init(){
    //This function runs before everything else. That's why it's called init you dumb fuck. Isn't it fun to document a bunch of code?
    //console.log("init start");
    console.log("Welcome to the world's worst game engine. Check for updates at github.com/ProtoSparky/SparkGameEngine");
    console.log("init() run correctly!")
    player = document.getElementById("player1");
    player.style.top  =(innerHeight /5);
    player.style.left =(innerWidth /2);  
   
}


//-------------------------------------------------------------------------------------------------------------
//------------------------------------GAME LOOP---------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
//This is the game interval. It runs a function named game_loop() every 10ms.
setInterval(game_loop,10);
setInterval(second_game_loop, 1000);