var player;
var current_player_X;
var current_player_Y
var player_speed = 10;

var player_sizeX = 50;
var player_sizeY = 50;
var col_mesh;

function game_loop(){
    check_player_input();
    

}

function init(){
    console.log("init start");
    player = document.getElementById("player1");
    player.style.top  =(innerHeight /5);
    player.style.left =(innerWidth /2);  
   
}
//player input

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
    
    /*DEBUG*/
    const debug_key = keys["E"] || keys["e"];
    if(debug_key){

        console.log(IScollided(current_player_X, player_sizeX,  current_player_Y,player_sizeY, "col_mesh"));

    }
    /*DEBUG*/

}
function ArraysCommon(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr2.includes(arr1[i])) {
        return true; // Found a common element
      }
    }
    return false; // No common elements found
}


function IScollided(playerCoordinateX,playerCoordinateX_W, playerCoordinateY, playerCoordinateY_W, ColMeshName){
    col_mesh = document.getElementsByClassName(ColMeshName);
    /*
    const playerCoordinateX_W = 50;
    const playerCoordinateY_W = 50;
    */
    const playerCoordinateX_from_right = playerCoordinateX_W + playerCoordinateX;
    const playerCoordinateY_W_from_bottom = playerCoordinateY_W + playerCoordinateY; 
    let playerPossibleCoordinateX = [];
    let playerPossibleCoordinateY = [];
    let colMeshPossibleCoordinateX = [];  
    let colMeshPossibleCoordinateY = [];  

    for(let playerMeshCoordinateX = playerCoordinateX; playerMeshCoordinateX <= playerCoordinateX_from_right; playerMeshCoordinateX ++){
        for(let playerMeshCoordinateY = playerCoordinateY; playerMeshCoordinateY <= playerCoordinateY_W_from_bottom; playerMeshCoordinateY++){
            const playerMeshCoordinateX_offset = playerMeshCoordinateX - playerCoordinateX; 
            const playerMeshCoordinateY_offset = playerMeshCoordinateY - playerCoordinateY; 
            playerPossibleCoordinateX[playerMeshCoordinateX_offset]=playerMeshCoordinateX;
            playerPossibleCoordinateY[playerMeshCoordinateY_offset]=playerMeshCoordinateY;
            //this for loop checks for all coordinates the player occupies
        }
    }

    for(let colMeshPointer=0; colMeshPointer<col_mesh.length; colMeshPointer++){     
        //run for all meshes   
        const current_col_mesh = col_mesh[colMeshPointer];
        const current_col_mesh_X1 = current_col_mesh.offsetLeft;
        const current_col_mesh_Y1 = parseInt(current_col_mesh.offsetTop);
        const current_col_mesh_X2 = current_col_mesh.offsetWidth;
        const current_col_mesh_Y2 = parseInt(current_col_mesh.offsetHeight);
        //console.log(current_col_mesh_X1 + "X1 " + current_col_mesh_Y1 + "Y1 " + current_col_mesh_X2 + "X2 " + current_col_mesh_Y2 + "Y2");
      

        const current_col_mesh_Y_from_bottom = current_col_mesh_Y1 + current_col_mesh_Y2; //this is the value from bottom of col mesh to top in px value
        const current_col_mesh_X_from_right  = current_col_mesh_X1 + current_col_mesh_X2; //Same here but from right 
        
        for(let colMeshCoordinateY = current_col_mesh_Y1; colMeshCoordinateY <= current_col_mesh_Y_from_bottom; colMeshCoordinateY++ ){
            //checks for all possible y coordinates on col mesh
            for(let colMeshCoordinateX = current_col_mesh_X1; colMeshCoordinateX <= current_col_mesh_X_from_right; colMeshCoordinateX++){              
                const colMeshCoordinateX_offset = colMeshCoordinateX - current_col_mesh_X1;
                const colMeshCoordinateY_offset = colMeshCoordinateY - current_col_mesh_Y1;
                colMeshPossibleCoordinateX[colMeshCoordinateX_offset] = colMeshCoordinateX;
                colMeshPossibleCoordinateY[colMeshCoordinateY_offset] = colMeshCoordinateY;        

            }  

        }
        console.log(col_mesh.length);
        if(ArraysCommon(colMeshPossibleCoordinateX,playerPossibleCoordinateX) && ArraysCommon(colMeshPossibleCoordinateY, playerPossibleCoordinateY)){
            return [true, colMeshPointer];
        }
        else{
            
            return [false, colMeshPointer];
        }
        
        

     
     
    }

    
}

setInterval(game_loop,10);

