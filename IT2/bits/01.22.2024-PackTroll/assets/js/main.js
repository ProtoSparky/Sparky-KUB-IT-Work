var GameState = {
    "player":{
        "position":{
            "x":window.innerWidth / 2,
            "y":window.innerHeight / 2, 
        },
        "size":{
            "x":40,
            "y":40,
        },
        "speed":{
            "starting_speed":1,
            "current_speed":null,
            "speed_increments":1,
        },
        "heading":null,
        "points":null, 
        "style":{
            "color":"black",
            "backgroundColor":"green", 
        },
        "id":"player",
    },
    "settings":{
        "game_started":false, 
        "game_borders":{
            //position for walls so player cannot exit game view
            "top":{
                "id":"GameMeshTop", 
                "position":{
                    "x":0,
                    "y":-10
                },
                "size":{
                    "x":window.innerWidth,
                    "y":1
                }
            },
            "right":{
                "id":"GameMeshRight",
                "position":{
                    "x":window.innerWidth,
                    "y":0
                },
                "size":{
                    "x":1,
                    "y":window.innerHeight,
                }
            },
            "bottom":{
                "id":"GameMeshBottom",
                "position":{
                    "x":0,
                    "y":window.innerHeight
                },
                "size":{
                    "x":window.innerWidth,
                    "y":1
                }
            },
            "left":{
                "id":"GameMeshLeft", 
                "position":{
                    "x":0,
                    "y":0
                },
                "size":{
                    "x":1,
                    "y":window.innerHeight
                }
            }
        }
    },
    "gamearea":{
        "id":"content-fullscreen",
    }

}
var DEBUG = false; 
function init(){
    //draw player
    const player = document.createElement("div");
    player.style.position = "absolute";
    player.style.backgroundColor = GameState.player.style.backgroundColor;
    player.style.top = GameState.player.position.y;
    player.style.left = GameState.player.position.x;
    player.style.color = GameState.player.style.color;
    player.style.width = GameState.player.size.x;
    player.style.height = GameState.player.size.y;
    player.id = GameState.player.id; 
    document.getElementById("content-fullscreen").appendChild(player);


    //set up game areas 
    const GameMeshTop = document.createElement("div");
    GameMeshTop.style.position = "absolute";
    GameMeshTop.style.top = GameState.settings.game_borders.top.position.y;
    GameMeshTop.style.left = GameState.settings.game_borders.top.position.x;
    GameMeshTop.style.width = GameState.settings.game_borders.top.size.x;
    GameMeshTop.style.height = GameState.settings.game_borders.top.size.y; 
    GameMeshTop.id = GameState.settings.game_borders.top.id;
    document.getElementById("content-fullscreen").appendChild(GameMeshTop);

    const GameMeshLeft = document.createElement("div");
    GameMeshLeft.style.position = "absolute";
    GameMeshLeft.style.top = GameState.settings.game_borders.left.position.y;
    GameMeshLeft.style.left = GameState.settings.game_borders.left.position.x;
    GameMeshLeft.style.width = GameState.settings.game_borders.left.size.x;
    GameMeshLeft.style.height = GameState.settings.game_borders.left.size.y; 
    GameMeshLeft.id = GameState.settings.game_borders.left.id;
    document.getElementById("content-fullscreen").appendChild(GameMeshLeft);

    const GameMeshRight = document.createElement("div");
    GameMeshRight.style.position = "absolute";
    GameMeshRight.style.top = GameState.settings.game_borders.right.position.y;
    GameMeshRight.style.left = GameState.settings.game_borders.right.position.x;
    GameMeshRight.style.width = GameState.settings.game_borders.right.size.x;
    GameMeshRight.style.height = GameState.settings.game_borders.right.size.y; 
    GameMeshRight.id = GameState.settings.game_borders.right.id;
    document.getElementById("content-fullscreen").appendChild(GameMeshRight);

    const GameMeshBottom = document.createElement("div");
    GameMeshBottom.style.position = "absolute";
    GameMeshBottom.style.top = GameState.settings.game_borders.bottom.position.y;
    GameMeshBottom.style.left = GameState.settings.game_borders.bottom.position.x;
    GameMeshBottom.style.width = GameState.settings.game_borders.bottom.size.x;
    GameMeshBottom.style.height = GameState.settings.game_borders.bottom.size.y; 
    GameMeshBottom.id = GameState.settings.game_borders.bottom.id;
    document.getElementById("content-fullscreen").appendChild(GameMeshBottom);

    document.body.style.overflow = "hidden";

    if(GameState.player.heading == null){
        GameState.player.heading = 0; 
    }

    //set up infinitly repeating updates

    setInterval(ConstantUpdate,10);
    setInterval(ConstantUpdate_LP,1000);
}
function ConstantUpdate(){
    //updates every 10ms
    check_player_input(); //check player for input
    UpdateDIVS();
    UpdatePlayerPos();

}
function ConstantUpdate_LP(){
    //updates every 1s

}
function UpdatePlayerPos(){
    //set up nogo zone
    if(GameState.settings.game_started == true){
        //run controls if the game is started
        var NOGO = {};

        //add collision meshes
        for(let GameWallPointer =0; GameWallPointer < Object.keys(GameState.settings.game_borders).length; GameWallPointer ++){
            const CurrentGameWallPointerName = Object.keys(GameState.settings.game_borders)[GameWallPointer];
            NOGO[GameWallPointer] = GameState.settings.game_borders[CurrentGameWallPointerName]; 
        }
        
        const new_coords = calculateCoordinates(GameState.player.position.x, GameState.player.position.y,GameState.player.heading, GameState.player.speed.current_speed);
        if(!tester(IScollidedObject(new_coords[0], GameState.player.size.x, new_coords[1],GameState.player.size.y,NOGO))){
            
            GameState.player.position.x = new_coords[0];
            GameState.player.position.y = new_coords[1];
        }
        else{
            GameState.settings.game_started == false;
        }
        


        function tester(collisions){
            for(let current_collision = 0; current_collision < collisions.length; current_collision ++){
                if(collisions[current_collision]){
                    return true        
                }
            }
            return false; 
        }
    }
};
function UpdateDIVS(){
    //shows player position in div
    const player = document.getElementById(GameState.player.id);
    player.style.backgroundColor = GameState.player.style.backgroundColor;
    player.style.top = GameState.player.position.y;
    player.style.left = GameState.player.position.x;
    player.style.color = GameState.player.style.color;
    player.style.width = GameState.player.size.x;
    player.style.height = GameState.player.size.y;
}
function Startgame(){
    GameState.settings.game_started = true;
    GameState.player.speed.current_speed = GameState.player.speed.starting_speed; 
    console.log("game started");
}

