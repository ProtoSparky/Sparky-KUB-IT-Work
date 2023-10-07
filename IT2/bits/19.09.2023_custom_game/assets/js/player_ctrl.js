var player;
var current_player_X;
var current_player_Y;
var player_speed = 10;
var player_sizeX = 56;
var player_sizeY = 56; 
var col_mesh;
var DEBUG = false; 
var gamestate_int = 1; 

var player_breath = 250;

//-------------------------------------------------------------------------------------------------------------
//------------------------------------VARS---------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
var second_loop_counter = 0;
function game_loop(){
    //This loop runs every 10ms. Us it for fast OPS
    check_player_input(); 
    

    if(IsPlayerUnderWater("player","underwater")){
        point_element = document.getElementById("drown_counter");
        current_points = parseInt(point_element.innerHTML);
        let future_points = current_points - 2;
        
        if(future_points < 0){
            gamestate_int = 0
            gamestate = document.getElementById("gamestate");
            gamestate.innerHTML = "Dead!";
            console.log("Player Dead");
        }
        else{
            point_element.innerHTML = future_points;
        }
    }
    else{
        point_element = document.getElementById("drown_counter");
        if(parseInt(point_element.innerHTML) < player_breath){
            current_points = parseInt(point_element.innerHTML);
            point_element.innerHTML  = current_points + 1;
        }
        
        
    }
    if(gamestate_int == 0){
        //Stop movement
        console.log("deathtriggered");
        player = document.getElementById("player1");
        player.style.top  =(innerHeight /5);
        player.style.left =(innerWidth /2);  

        air_countdown = document.getElementById("drown_counter");
        air_countdown.innerHTML = "0";

        air_countdown = document.getElementById("time_left_counter");
        air_countdown.innerHTML = "0s";

        player_Death = document.getElementById("player1");
        player_Death.innerHTML = "DEAD!";

        player_Death = document.getElementById("door_counter");
        player_Death.innerHTML = "5s";

        player_Death = document.getElementById("sea_surface");
        player_Death.style.left = -1000;      
    

    }

}
function second_game_loop(){
    //This loop runs every 800ms 
    for(let ai_arr_key = 0; ai_arr_key <= ClassIndexLength("enemy") - 1; ai_arr_key ++){
        MoveAi("enemy", ai_arr_key);
    }
    

}
function second_timed_game_loop(){
    //This loop runs every 1s
    open_door();
    update_time_left();
}


function init(){
    //This function runs before everything else. That's why it's called init you dumb fuck. Isn't it fun to document a bunch of code?
    //console.log("init start");
    console.log("Welcome to the world's worst game engine. Check for updates at github.com/ProtoSparky/SparkGameEngine");
    console.log("init() run correctly!")
    player = document.getElementById("player1");
    player.style.top  =(innerHeight /5);
    player.style.left =(innerWidth /2);  

    summon_enemy(RandomRangedIntiger(30,60));
    
   
}


//-------------------------------------------------------------------------------------------------------------
//------------------------------------Player CTRL--------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
const keys = {};
document.addEventListener("keydown",(e) =>{
    keys[e.key] = true;
});
document.addEventListener("keyup",(e)=>{
    keys[e.key] = false;
});
function check_player_input(){
    current_player_X = parseInt(player.style.left);
    current_player_Y = parseInt(player.style.top);
    const key_W = keys["W"] || keys["w"];
    const key_A = keys["A"] || keys["a"];
    const key_S = keys["S"] || keys["s"];
    const key_D = keys["D"] || keys["d"];
    const snatch = keys[" "] || keys[" "];

    

    if(key_W && key_A){
        if(DEBUG){
            console.log("wa"); 
        }
        //check if player is about to not collide, and move
        if(!IScollided(current_player_X, player_sizeX,  current_player_Y - player_speed,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallTop","col_mesh")] && !IScollided(current_player_X - player_speed, player_sizeX,  current_player_Y,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallLeft","col_mesh")] ){
            player.style.top = (current_player_Y - player_speed);
            player.style.left = (current_player_X - player_speed);
        }
        else if(!IScollided(current_player_X, player_sizeX,  current_player_Y - player_speed,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallTop","col_mesh")]){
            player.style.top = (current_player_Y - player_speed);
        }
        else if(!IScollided(current_player_X - player_speed, player_sizeX,  current_player_Y,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallLeft","col_mesh")]){
            player.style.left = (current_player_X - player_speed);
        }
    }
    else if(key_W && key_D){
        if(DEBUG){
            console.log("wd");
        }
        //check if player is about to not collide, and move
        if(!IScollided(current_player_X, player_sizeX,  current_player_Y - player_speed,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallTop","col_mesh")] && !IScollided(current_player_X + player_speed, player_sizeX,  current_player_Y,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallRight","col_mesh")] && !IScollided(current_player_X, player_sizeX,  current_player_Y+player_speed,player_sizeY, "col_mesh")[ClassIndexLookup("sea","col_mesh")]){
            player.style.top = (current_player_Y - player_speed);
            player.style.left = (current_player_X + player_speed);
        }
        else if(!IScollided(current_player_X, player_sizeX,  current_player_Y - player_speed,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallTop","col_mesh")] && !IScollided(current_player_X, player_sizeX,  current_player_Y+player_speed,player_sizeY, "col_mesh")[ClassIndexLookup("sea","col_mesh")]){
            player.style.top = (current_player_Y - player_speed);
        }
        else if(!IScollided(current_player_X + player_speed, player_sizeX,  current_player_Y,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallRight","col_mesh")]){
            player.style.left = (current_player_X + player_speed);
        }
    }
    else if(key_A && key_S){
        if(DEBUG){
            console.log("as");
        }
        //check if player is about to not collide, and move
        if(!IScollided(current_player_X - player_speed, player_sizeX,  current_player_Y,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallLeft","col_mesh")] && !IScollided(current_player_X, player_sizeX,  current_player_Y + player_speed,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallBottom","col_mesh")] && !IScollided(current_player_X, player_sizeX,  current_player_Y+player_speed,player_sizeY, "col_mesh")[ClassIndexLookup("sea","col_mesh")]){
            player.style.left = (current_player_X - player_speed);
            player.style.top = (current_player_Y + player_speed);
        }
        else if(!IScollided(current_player_X, player_sizeX,  current_player_Y + player_speed,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallBottom","col_mesh")] && !IScollided(current_player_X, player_sizeX,  current_player_Y+player_speed,player_sizeY, "col_mesh")[ClassIndexLookup("sea","col_mesh")]){
            player.style.top = (current_player_Y + player_speed);   
        }
        else if(!IScollided(current_player_X - player_speed, player_sizeX,  current_player_Y,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallLeft","col_mesh")]){
            player.style.left = (current_player_X - player_speed);
        }    

        
        
    }
    else if(key_S && key_D){
        if(DEBUG){
            console.log("sd");
        }
        //check if player is about to not collide, and move
        if(!IScollided(current_player_X + player_speed, player_sizeX,  current_player_Y,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallRight","col_mesh")] && !IScollided(current_player_X, player_sizeX,  current_player_Y+ player_speed,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallBottom","col_mesh")] && !IScollided(current_player_X, player_sizeX,  current_player_Y+player_speed,player_sizeY, "col_mesh")[ClassIndexLookup("sea","col_mesh")]){
            player.style.top = (current_player_Y + player_speed);
            player.style.left = (current_player_X + player_speed);
        }
        else if (!IScollided(current_player_X, player_sizeX,  current_player_Y + player_speed,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallBottom","col_mesh")] && !IScollided(current_player_X, player_sizeX,  current_player_Y+player_speed,player_sizeY, "col_mesh")[ClassIndexLookup("sea","col_mesh")]){
            player.style.top = (current_player_Y + player_speed);
        }

        
        else if(!IScollided(current_player_X - player_speed, player_sizeX,  current_player_Y,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallBottom","col_mesh")] && !IScollided(current_player_X + player_speed, player_sizeX,  current_player_Y,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallRight","col_mesh")]){
            player.style.left = (current_player_X + player_speed);
        }
        
    }
    else if(key_W){
        if(DEBUG){
            console.log("w");
        }
        //check if player is about to not collide, and move
        if(!IScollided(current_player_X, player_sizeX,  current_player_Y- player_speed,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallTop","col_mesh")] && !IScollided(current_player_X, player_sizeX,  current_player_Y + player_speed +100,player_sizeY, "col_mesh")[ClassIndexLookup("sea","col_mesh")]){
            player.style.top = (current_player_Y - player_speed);
        }
        
    }
    else if(key_A){
        if(DEBUG){
            console.log("a");
        }
        //check if player is about to not collide, and move
        if(!IScollided(current_player_X - player_speed, player_sizeX,  current_player_Y,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallLeft","col_mesh")]){
            player.style.left = (current_player_X - player_speed);
        }
    }
    else if(key_S){
        if(DEBUG){
            console.log("s");
        }
        //check if player is about to not collide, and move
        if(!IScollided(current_player_X, player_sizeX,  current_player_Y+player_speed,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallBottom","col_mesh")] && !IScollided(current_player_X, player_sizeX,  current_player_Y+player_speed,player_sizeY, "col_mesh")[ClassIndexLookup("sea","col_mesh")]){
            player.style.top = (current_player_Y + player_speed);
        }

        else if(IScollided(current_player_X, player_sizeX,  current_player_Y+player_speed,player_sizeY, "sea_surface")[ClassIndexLookup("sea_surface","sea_surface")] ){
            player.style.top = (current_player_Y + player_speed);
            
        }
    }
    else if(key_D){
        if(DEBUG){
            console.log("D");   
        }
        //check if player is about to not collide, and move
        if(!IScollided(current_player_X + player_speed, player_sizeX,  current_player_Y,player_sizeY, "col_mesh")[ClassIndexLookup("GameWallRight","col_mesh")]){
            player.style.left = (current_player_X + player_speed);
        }
    }
    else if(snatch){
        KillEnemy();
    }
    
    /*DEBUG*/
    //Press E, and things in here will run.
    const debug_key = keys["E"] || keys["e"];
    if(debug_key){
        //console.log(IsPlayerUnderWater("player","underwater"));
        open_door();
    }
    /*DEBUG*/

}
//-------------------------------------------------------------------------------------------------------------
//------------------------------------Player CTRL--------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------

//This function checks if any of the two arrays have similar numbers
function ArraysCommon(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr2.includes(arr1[i])) {
        return true; // Found a common element
      }
    }
    return false; // No common elements found
}

//-------------------------------------------------------------------------------------------------------------
//------------------------------------HITBOX COLLISION---------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
function IScollided(playerCoordinateX,playerCoordinateX_W, playerCoordinateY, playerCoordinateY_W, ColMeshName){
    col_mesh = document.getElementsByClassName(ColMeshName);
    const playerCoordinateX_from_right = playerCoordinateX_W + playerCoordinateX;
    const playerCoordinateY_W_from_bottom = playerCoordinateY_W + playerCoordinateY; 
    let playerPossibleCoordinateX = [];
    let playerPossibleCoordinateY = [];
    let IsCollided = [];
    for(let playerMeshCoordinateX = playerCoordinateX; playerMeshCoordinateX <= playerCoordinateX_from_right; playerMeshCoordinateX ++){
        for(let playerMeshCoordinateY = playerCoordinateY; playerMeshCoordinateY <= playerCoordinateY_W_from_bottom; playerMeshCoordinateY++){
            const playerMeshCoordinateX_offset = playerMeshCoordinateX - playerCoordinateX; 
            const playerMeshCoordinateY_offset = playerMeshCoordinateY - playerCoordinateY; 
            playerPossibleCoordinateX[playerMeshCoordinateX_offset]=playerMeshCoordinateX;
            playerPossibleCoordinateY[playerMeshCoordinateY_offset]=playerMeshCoordinateY;
            //this for loop checks for all coordinates the player occupies.
        }
    }

    for (let colMeshPointer = 0; colMeshPointer < col_mesh.length; colMeshPointer++){
        let colMeshPossibleCoordinateX = [];  
        let colMeshPossibleCoordinateY = []; 

        //run for all meshes   
        const current_col_mesh = col_mesh[colMeshPointer];
        const current_col_mesh_X1 = parseInt(current_col_mesh.offsetLeft);
        const current_col_mesh_Y1 = parseInt(current_col_mesh.offsetTop);
        const current_col_mesh_X2 = parseInt(current_col_mesh.offsetWidth);
        const current_col_mesh_Y2 = parseInt(current_col_mesh.offsetHeight);
        //console.log(current_col_mesh_X1 + "X1 " + current_col_mesh_Y1 + "Y1 " + current_col_mesh_X2 + "X2 " + current_col_mesh_Y2 + "Y2");      

        const current_col_mesh_Y_from_bottom = current_col_mesh_Y1 + current_col_mesh_Y2; //this is the value from bottom of col mesh to top in px value
        const current_col_mesh_X_from_right  = current_col_mesh_X1 + current_col_mesh_X2; //Same here but from right. Why am i even remindimg myself?         
        for(let colMeshCoordinateY = current_col_mesh_Y1; colMeshCoordinateY <= current_col_mesh_Y_from_bottom; colMeshCoordinateY++ ){
            //checks for all possible y coordinates on col mesh
            for(let colMeshCoordinateX = current_col_mesh_X1; colMeshCoordinateX <= current_col_mesh_X_from_right; colMeshCoordinateX++){              
                const colMeshCoordinateX_offset = colMeshCoordinateX - current_col_mesh_X1;
                const colMeshCoordinateY_offset = colMeshCoordinateY - current_col_mesh_Y1;
                colMeshPossibleCoordinateX[colMeshCoordinateX_offset] = colMeshCoordinateX;
                colMeshPossibleCoordinateY[colMeshCoordinateY_offset] = colMeshCoordinateY;        
            }  
        }
        //This bad boy checks if the player and collision object x and y values match. If it's a tinder match, itll return true. IF one or the other
        //rejects, its a false
        if(ArraysCommon(colMeshPossibleCoordinateX,playerPossibleCoordinateX) && ArraysCommon(colMeshPossibleCoordinateY, playerPossibleCoordinateY)){
            IsCollided[colMeshPointer] = true;
        }
        else{            
            IsCollided[colMeshPointer] = false;
        }     
     
    }

    return IsCollided; //return true or false for all col_mesh    
}
//-------------------------------------------------------------------------------------------------------------
//------------------------------------HITBOX COLLISION---------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------



function GetElementSize(IdOrClass, divname, divID){
    //divID only used for classes
    returnARR = []; 
    if(IdOrClass == 0){
        if(document.getElementById(divname) == null){
            const ERROR = "ERROR element ID"+IdOrClass+" '"+divname+"' not found in GetElementSize()";
            console.warn(ERROR);
            return null;
        }
        else{
            //Run for id
            object = document.getElementById(divname);
            const current_object_X = parseInt(object.style.left);
            const current_object_Y = parseInt(object.style.top);
            const current_object_X_W = parseInt(object.clientWidth);
            const current_object_Y_H = parseInt(object.clientHeight);
            const current_object_X_IW = current_object_X + current_object_X_W;
            const current_object_Y_FB = current_object_Y + current_object_Y_H;

            // Current object name; Current object x coordinate; current object width; current object x coordinate inc width; current object y; current object height; current object coordinate inc H
            returnARR = [divname, current_object_X , current_object_X_W, current_object_X_IW, current_object_Y,current_object_Y_H, current_object_Y_FB, divID]; 
            return returnARR; 
        }
    }
    else if(IdOrClass == 1){
        if(document.getElementsByClassName(divname)[divID] == null){
            const ERROR = "ERROR element ID"+IdOrClass+" '"+divname+"' not found in GetElementSize()";
            console.warn(ERROR);
            return null;
            
        }
        else{          
            //run for class
            object = document.getElementsByClassName(divname);
            const current_object_X = parseInt(object[divID].offsetLeft);
            const current_object_Y = parseInt(object[divID].offsetTop);
            const current_object_X_W = parseInt(object[divID].offsetWidth);
            const current_object_Y_H = parseInt(object[divID].offsetHeight);
            const current_object_X_IW = current_object_X + current_object_X_W;
            const current_object_Y_FB = current_object_Y + current_object_Y_H;
            
            // Current object name; Current object x coordinate; current object width; current object x coordinate inc width; current object y; current object height; current object coordinate inc H
            returnARR = [divname, current_object_X , current_object_X_W, current_object_X_IW, current_object_Y,current_object_Y_H, current_object_Y_FB, divID]; 
            return returnARR; 
        }
    }    
}



function RandomRangedIntiger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ClassIndexLookup(id, class_name){
    const elements = document.getElementsByClassName(class_name);
    for(let arr_index = 0; arr_index <elements.length; arr_index ++){
        if(elements[arr_index].id === id){
            return arr_index; //return array index if id matches
        }
    }  
    console.error("ERROR: ClassIndexLookup() could not find arr key for class: '" + class_name + "' id: '" + id + "'");
    return -1; //return -1 if id not found  
}

function ClassIndexToId(class_name, index) {
    const elements = document.getElementsByClassName(class_name);
    if (index >= 0 && index < elements.length) {
      return elements[index].id;
    } else {
      console.error("ERROR: ClassIndexToId() could not find ID for class: '" + class_name + "' and index: '" + index + "'");
      return null; // return null on faliure
    }
}



//-------------------------------------------------------------------------------------------------------------
//------------------------------------GAME LOOP---------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
//This is the game interval. It runs a function named game_loop() every 10ms.
setInterval(game_loop,10);
setInterval(second_game_loop, 900);
setInterval(second_timed_game_loop, 1000);