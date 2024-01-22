
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
        //check if player is about to not collide, and move
        GameState.player.heading = 270; 
        
    }
    else if(key_A){
        if(DEBUG){
            console.log("a");
        }
        //check if player is about to not collide, and move

        GameState.player.heading = 180; 
    }
    else if(key_S){
        if(DEBUG){
            console.log("s");
        }

        //check if player is about to not collide, and move
        GameState.player.heading = 90; 


    }
    else if(key_D){
        if(DEBUG){
            console.log("D");   
        }        
        //check if player is about to not collide, and move
        GameState.player.heading = 0; 

    }

    
    /*DEBUG*/
    //Press E, and things in here will run.
    const debug_key = keys["E"] || keys["e"];
    if(debug_key){
        Startgame();
    }
    /*DEBUG*/




}
//-------------------------------------------------------------------------------------------------------------
//------------------------------------Player CTRL--------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
