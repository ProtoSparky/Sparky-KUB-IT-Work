var player;
var current_player_X;
var current_player_Y;
var player_speed = 10;
var player_sizeX = 30;
var player_sizeY = 150;
var col_mesh;
var DEBUG = false; 
//-------------------------------------------------------------------------------------------------------------
//------------------------------------VARS---------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------

function game_loop(){
    check_player_input(); 
    //summon_enemy("ball_1");
    
    

}

function init(){
    //This function runs before everything else. That's why it's called init you dumb fuck. Isn't it fun to document a bunch of code?
    console.log("init start");
    console.log("Welcome to the world's worst game engine. It's so bad, it should be invited into a freak show.... Anyways, it looks like things started correctly");
    player = document.getElementById("player1");
    player.style.top  =(innerHeight /5);
    player.style.left =(innerWidth /1.1);  

    place_ball("ball_1");
    

   
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

    
    /*
    if(key_W && key_A){
        if(DEBUG){
            console.log("wa"); 
        }
        //check if player is about to not collide, and move
        if(!IScollided(current_player_X, player_sizeX,  current_player_Y - player_speed,player_sizeY, "col_mesh")[2] && !IScollided(current_player_X - player_speed, player_sizeX,  current_player_Y,player_sizeY, "col_mesh")[0]){
            player.style.top = (current_player_Y - player_speed);
            player.style.left = (current_player_X - player_speed);
        }
    }
    
    else if(key_W && key_D){
        if(DEBUG){
            console.log("wd");
        }
        //check if player is about to not collide, and move
        if(!IScollided(current_player_X, player_sizeX,  current_player_Y - player_speed,player_sizeY, "col_mesh")[2] && !IScollided(current_player_X + player_speed, player_sizeX,  current_player_Y,player_sizeY, "col_mesh")[1]){
            player.style.top = (current_player_Y - player_speed);
            player.style.left = (current_player_X + player_speed);
        }
    }
    else if(key_A && key_S){
        if(DEBUG){
            console.log("as");
        }
        //check if player is about to not collide, and move
        if(!IScollided(current_player_X - player_speed, player_sizeX,  current_player_Y,player_sizeY, "col_mesh")[0] && !IScollided(current_player_X, player_sizeX,  current_player_Y + player_speed,player_sizeY, "col_mesh")[3]){
            player.style.left = (current_player_X - player_speed);
            player.style.top = (current_player_Y + player_speed);
        }

        

        
        
    }
    else if(key_S && key_D){
        if(DEBUG){
            console.log("sd");
        }
        //check if player is about to not collide, and move
        if(!IScollided(current_player_X + player_speed, player_sizeX,  current_player_Y,player_sizeY, "col_mesh")[1] && !IScollided(current_player_X, player_sizeX,  current_player_Y+ player_speed,player_sizeY, "col_mesh")[3]){
            player.style.top = (current_player_Y + player_speed);
            player.style.left = (current_player_X + player_speed);
        }
    }
     */
    if(key_W){
        if(DEBUG){
            console.log("w");
        }
        //check if player is about to not collide, and move
        if(!IScollided(current_player_X, player_sizeX,  current_player_Y- player_speed,player_sizeY, "col_mesh")[3]){
            player.style.top = (current_player_Y - player_speed);
        }
        
    }
    /*
    else if(key_A){
        if(DEBUG){
            console.log("a");
        }
        //check if player is about to not collide, and move
        if(!IScollided(current_player_X - player_speed, player_sizeX,  current_player_Y,player_sizeY, "col_mesh")[0]){
            player.style.left = (current_player_X - player_speed);
        }
    }
    */
    else if(key_S){
        if(DEBUG){
            console.log("s");
        }
        //check if player is about to not collide, and move
        if(!IScollided(current_player_X, player_sizeX,  current_player_Y+player_speed,player_sizeY, "col_mesh")[4]){
            player.style.top = (current_player_Y + player_speed);
        }
    }
    /*
    else if(key_D){
        if(DEBUG){
            console.log("D");   
        }
        //check if player is about to not collide, and move
        if(!IScollided(current_player_X + player_speed, player_sizeX,  current_player_Y,player_sizeY, "col_mesh")[1]){
            player.style.left = (current_player_X + player_speed);
        }
    }
    */
    
    /*DEBUG*/
    //Press E, and things in here will run.
    const debug_key = keys["E"] || keys["e"];
    if(debug_key){
        //console.log(IScollided(current_player_X, player_sizeX,  current_player_Y,player_sizeY, "col_mesh"));
        //console.log(GetElementSize(1, "col_mesh", 3));
        summon_enemy("ball_1");
        
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
        /* I think this code is redundant, which is why i commented it away. What could go wrong ¯\_(ツ)_/¯

            for(let cplayerMeshCoordinateX = playerCoordinateX; cplayerMeshCoordinateX <= playerCoordinateX_from_right; cplayerMeshCoordinateX ++){
                for(let cplayerMeshCoordinateY = playerCoordinateY; cplayerMeshCoordinateY <= playerCoordinateY_W_from_bottom; cplayerMeshCoordinateY++){
                    const cplayerMeshCoordinateX_offset = cplayerMeshCoordinateX - playerCoordinateX; 
                    const cplayerMeshCoordinateY_offset = cplayerMeshCoordinateY - playerCoordinateY; 
                    playerPossibleCoordinateX[cplayerMeshCoordinateX_offset]=cplayerMeshCoordinateX;
                    playerPossibleCoordinateY[cplayerMeshCoordinateY_offset]=cplayerMeshCoordinateY;
                    //this for loop checks for all possible coordinates the player occupies
                }
            }
        */

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

//This is the game interval. It runs a function named game_loop() every 10ms.
setInterval(game_loop,10);

function GetElementSize(IdOrClass, divname, divID){
    //divID only used for classes
    returnARR = []; 
    if(IdOrClass == 0){
        if(document.getElementById(divname) == null){
            const ERROR = "ERROR element ID"+IdOrClass+" '"+divname+"' not found in GetElementSize()";
            console.log(ERROR);
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
            console.log(ERROR);
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
