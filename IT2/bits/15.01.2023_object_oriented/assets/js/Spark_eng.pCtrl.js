
//-------------------------------------------------------------------------------------------------------------
//------------------------------------Player CTRL--------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------

//p_control is modified for this purpose

const keys = {};
document.addEventListener("keydown",(e) =>{
    keys[e.key] = true;
});
document.addEventListener("keyup",(e)=>{
    keys[e.key] = false;
});
function check_player_input(){
    const key_W = keys["W"] || keys["w"];
    const key_A = keys["A"] || keys["a"];
    const key_S = keys["S"] || keys["s"];
    const key_D = keys["D"] || keys["d"];    
    if(key_W){
        if(DEBUG){
            console.log("w");
        }
        
        //checks if player is allowed to move in said direction
        if(GameState.player.obstructed_state.top == false){
            //check if player is about to not collide, and move
            if(!IScollided(GameState.player.position.x, GameState.player.size.x,  GameState.player.position.y - GameState.player.playerMaxSpeed,GameState.player.size.y, "col_mesh")[0]){
                GameState.player.position.y=GameState.player.position.y - GameState.player.playerMaxSpeed;
            }
        }
        
    }
    else if(key_A){
        if(DEBUG){
            console.log("a");
        }
        //checks if player is allowed to move in said direction
        if(GameState.player.obstructed_state.left == false){
            //check if player is about to not collide, and move
            if(!IScollided(GameState.player.position.x - GameState.player.playerMaxSpeed, GameState.player.size.x,  GameState.player.position.y,GameState.player.size.y, "col_mesh")[2]){
                GameState.player.position.x=GameState.player.position.x - GameState.player.playerMaxSpeed;
            }
        }
    }
    else if(key_S){
        if(DEBUG){
            console.log("s");
        }
        //checks if player is allowed to move in said direction
        if(GameState.player.obstructed_state.bottom == false){
            //check if player is about to not collide, and move
            if(!IScollided(GameState.player.position.x, GameState.player.size.x,  GameState.player.position.y - GameState.player.playerMaxSpeed + 18,GameState.player.size.y, "col_mesh")[1]){
                GameState.player.position.y= GameState.player.position.y + GameState.player.playerMaxSpeed;
            }
        }
    }
    else if(key_D){
        if(DEBUG){
            console.log("D");   
        }
        //checks if player is allowed to move in said direction
        if(GameState.player.obstructed_state.right == false){
            //check if player is about to not collide, and move
            if(!IScollided(GameState.player.position.x + GameState.player.playerMaxSpeed, GameState.player.size.x,  GameState.player.position.y,GameState.player.size.y, "col_mesh")[3]){
                GameState.player.position.x= GameState.player.position.x + GameState.player.playerMaxSpeed;
            }
        }
    }
    
    /*DEBUG*/
    //Press E, and things in here will run.
    const debug_key = keys["E"] || keys["e"];
    if(debug_key){
        checkforwall(); 
    }
    /*DEBUG*/




}
//-------------------------------------------------------------------------------------------------------------
//------------------------------------Player CTRL--------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
