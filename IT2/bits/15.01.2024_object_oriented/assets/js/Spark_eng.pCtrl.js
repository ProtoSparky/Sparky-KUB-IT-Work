
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
    const key_space = keys[" "];  
    if(key_W){
        if(DEBUG){
            console.log("w");
        }
        //check if player is about to not collide, and move
        GameState.player.playerHeading = 270; 
        const new_coords = calculateCoordinates(GameState.player.position.x,GameState.player.position.y, GameState.player.playerHeading, GameState.player.playerMaxSpeed); 
        if(!IScollided(new_coords[0], GameState.player.size.x,  new_coords[1],GameState.player.size.y, "col_mesh")[0]){
            //GameState.player.position.x= new_coords[0]; //this fixes some braindead bug 
            GameState.player.position.y= new_coords[1];
        }

        
    }
    else if(key_A){
        if(DEBUG){
            console.log("a");
        }
        //check if player is about to not collide, and move
        GameState.player.playerHeading = 180; 
        const new_coords = calculateCoordinates(GameState.player.position.x,GameState.player.position.y, GameState.player.playerHeading, GameState.player.playerMaxSpeed); 
        if(!IScollided(new_coords[0], GameState.player.size.x,  new_coords[1],GameState.player.size.y, "col_mesh")[2]){
            GameState.player.position.x= new_coords[0];
            GameState.player.position.y= new_coords[1];
        }
    }
    else if(key_S){
        if(DEBUG){
            console.log("s");
        }

        //check if player is about to not collide, and move
        GameState.player.playerHeading = 90; 
        const new_coords = calculateCoordinates(GameState.player.position.x,GameState.player.position.y, GameState.player.playerHeading, GameState.player.playerMaxSpeed); 
        if(!IScollided(new_coords[0], GameState.player.size.x,  new_coords[1],GameState.player.size.y, "col_mesh")[1]){
            GameState.player.position.x= new_coords[0];
            GameState.player.position.y= new_coords[1];
        }

    }
    else if(key_D){
        if(DEBUG){
            console.log("D");   
        }        
        //check if player is about to not collide, and move
        GameState.player.playerHeading = 0; 
        const new_coords = calculateCoordinates(GameState.player.position.x,GameState.player.position.y, GameState.player.playerHeading, GameState.player.playerMaxSpeed); 
        if(!IScollided(new_coords[0], GameState.player.size.x,  new_coords[1],GameState.player.size.y, "col_mesh")[3]){
            GameState.player.position.x= new_coords[0];
            GameState.player.position.y= new_coords[1];
        }

    }
    else if(key_space){
        if(DEBUG){
            console.log("space");   
        }
        capture_sheep();
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
