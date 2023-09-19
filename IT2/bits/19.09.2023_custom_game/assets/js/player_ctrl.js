var player;
var current_player_X;
var current_player_Y
var player_speed = 10;
var col_mesh;

function game_loop(){
    check_player_input();
}

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
        IScollided(300, 281, "col_mesh");
    }
    /*DEBUG*/

}

function IScollided(playerCoordinateX,playerCoordinateY,ColMeshName){
    col_mesh = document.getElementsByClassName(ColMeshName);
    for(let colMeshPointer=0; colMeshPointer<col_mesh.length; colMeshPointer++){
     const current_col_mesh = col_mesh[colMeshPointer];
     const current_col_mesh_X1 = current_col_mesh.offsetLeft;
     const current_col_mesh_Y1 = parseInt(current_col_mesh.offsetTop);
     const current_col_mesh_X2 = current_col_mesh.offsetWidth;
     const current_col_mesh_Y2 = parseInt(current_col_mesh.offsetHeight);
     console.log(current_col_mesh_X1 + "X1 " + current_col_mesh_Y1 + "Y1 " + current_col_mesh_X2 + "X2 " + current_col_mesh_Y2 + "Y2");
     //console.log(current_col_mesh_Y1-current_col_mesh_Y2);

     const current_col_mesh_Y_from_bottom = current_col_mesh_Y1 + current_col_mesh_Y2; //this is the value from bottom of col mesh to top in px value
     const current_col_mesh_X_from_right  = current_col_mesh_X1 + current_col_mesh_X2; //Same here but from right 
     for(let colMeshCoordinateY = current_col_mesh_Y1; colMeshCoordinateY <= current_col_mesh_Y_from_bottom; colMeshCoordinateY++ ){
        /*
        if(colMeshCoordinateY == playerCoordinateY){
            console.log("Y coordinate is same");    
        }
        */
        for(let colMeshCoordinateX = current_col_mesh_X1; colMeshCoordinateX <= current_col_mesh_X_from_right; colMeshCoordinateX++){
            if(colMeshCoordinateY == playerCoordinateY && colMeshCoordinateX == playerCoordinateX){
                console.log("X and Y coordinate is same!");    
                return true;
            }
        }     
        

     }
     
     
    }
}

setInterval(game_loop,10);

