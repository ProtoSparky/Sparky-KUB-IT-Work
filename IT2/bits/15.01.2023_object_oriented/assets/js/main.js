var GameState = {
    "player":{
        "position":{
            "x":0,
            "y":0
        },
        "size":{
            "x":40,
            "y":40
        },
        "playerMaxSpeed":10,
        "PlayerID":"player"
        
    },
    "collectibles":{
        
    },
    "hinderances":{

    },
    "enemies":{

    },
    "gamesettings":{
        "max_enemy":10,
        "min_enemy":3
    }

};
var DEBUG = false;

function init(){
    console.info("INIT");
    var player = document.createElement("div");
    player.id = GameState.player.PlayerID;
    player.className = "player";
    player.style.position = "absolute";
    player.style.top = GameState.player.position.y + "px";
    player.style.left = GameState.player.position.x + "px";
    player.style.width = GameState.player.size.x + "px";
    player.style.height = GameState.player.size.y + "px";
    player.style.borderColor = "white";
    player.style.borderStyle = "dashed";
    player.style.zIndex = 99;
    document.getElementById("content").appendChild(player);
    document.body.style.overflow = "hidden";


    //spawn colision meshes

    //top mesh
    const col_mesh_top = document.createElement("div");
    col_mesh_top.className = "col_mesh";
    col_mesh_top.style.position = "absolute";
    col_mesh_top.style.top = "-1px";
    col_mesh_top.style.width = "1px";
    col_mesh_top.style.left = "0px";
    col_mesh_top.id = "col_mesh_top"; 
    col_mesh_top.style.width = window.innerWidth + "px"; 
    document.getElementById("content").appendChild(col_mesh_top);


    //bottom mesh
    const col_mesh_bottom = document.createElement("div");
    col_mesh_bottom.className = "col_mesh";
    col_mesh_bottom.style.position ="absolute";
    col_mesh_bottom.id ="col_mesh_bottom";
    col_mesh_bottom.style.width = window.innerWidth + "px";
    col_mesh_bottom.style.bottom = "-1px";
    col_mesh_bottom.style.height = "1px";
    document.getElementById("content").appendChild(col_mesh_bottom);

    //left mesh

    const col_mesh_left = document.createElement("div");
    col_mesh_left.style.position = "absolute";
    col_mesh_left.style.width = "1px";
    col_mesh_left.style.left = "-1px";
    col_mesh_left.style.top = "0px";
    col_mesh_left.style.height = window.innerHeight + "px";
    col_mesh_left.className = "col_mesh";
    col_mesh_left.id = "col_mesh_left";
    document.getElementById("content").appendChild(col_mesh_left);

    //right mesh
    const col_mesh_right = document.createElement("div");
    col_mesh_right.style.position = "absolute";
    col_mesh_right.style.top = "0px";
    col_mesh_right.style.right = "-1px";
    col_mesh_right.className = "col_mesh";
    col_mesh_right.id = "col_mesh_right";
    col_mesh_right.style.height = window.innerHeight + "px";
    col_mesh_right.style.width = "1px"; 
    document.getElementById("content").appendChild(col_mesh_right);

    //create safezones
    const safezone1 = document.createElement("div");
    safezone1.id = "safezone1";
    safezone1.className = "safezone";
    safezone1.style.position ="absolute";
    safezone1.style.backgroundColor = "white";
    safezone1.style.left = "0px";
    safezone1.style.bottom = "0px";
    safezone1.style.width = "200px";
    safezone1.style.height = "80px";
    safezone1.style.zIndex = 10;
    document.getElementById("content").appendChild(safezone1); 

    const safezone2 = document.createElement("div");
    safezone2.id = "safezone2";
    safezone2.className = "safezone";
    safezone2.style.position ="absolute";
    safezone2.style.backgroundColor = "white";
    safezone2.style.right = "0px";
    safezone2.style.bottom = "0px";
    safezone2.style.width = "200px";
    safezone2.style.height = "80px";
    safezone2.style.zIndex = 10;
    document.getElementById("content").appendChild(safezone2);
    setInterval(ConstantUpdater,10);

    //set up enemies


}
function ConstantUpdater(){
    check_player_input();
    ApplyPlayerState();
}; 

function ApplyPlayerState(){
    document.getElementById(GameState.player.PlayerID).style.top = GameState.player.position.y;
    document.getElementById(GameState.player.PlayerID).style.left = GameState.player.position.x;
    for(let SafezonePointer = 0; SafezonePointer < (document.getElementsByClassName("safezone").length)-1 ; SafezonePointer ++){
        if(IScollided(GameState.player.position.x , GameState.player.size.x,  GameState.player.position.y,GameState.player.size.y, "safezone")[SafezonePointer]){
            document.getElementById(GameState.player.PlayerID).style.borderColor = "black";
        }
        else{
            document.getElementById(GameState.player.PlayerID).style.borderColor = "white";
        }
    }
}
function spawn_enemies(){
    //function that spawns enemies in the game area
    const enemy_amount = randomRangedIntiger(GameState.gamesettings.min_enemy,GameState.gamesettings.max_enemy);
    for(let currentEnemy = 0; currentEnemy < enemy_amount; currentEnemy ++){
        const CurrentEnemy_object = document.createElement("div");
        CurrentEnemy_object.style.position = "absolute";
        CurrentEnemy_object.style.top
    }
}
