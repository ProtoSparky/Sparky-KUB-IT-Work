//-------------------------------------------------------------------------------------------------------------
//------------------------------------DEPENDENCIES-------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------

if (typeof ArraysCommon !== 'function') {
    console.log("ERROR: ArraysCommon() not found. Did you forget to add Spark_eng.ArrComm.js? ");         
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
