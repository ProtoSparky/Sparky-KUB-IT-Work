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
        "min_enemy":3,
        "enemy_size":{
            "x":30,
            "y":30
        },
        "safezones":{
            "left_zone":{
                "position":{
                    "x":0,
                    "-y":0,
                    "z":10
                },
                "size":{
                    "x":200,
                    "y":80
                }
            },
            "right_zone":{
                "position":{
                    "-x":0,
                    "-y":0,
                    "z":10
                },
                "size":{
                    "x":200,
                    "y":80
                }
            }
        }
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
    safezone1.style.left = GameState.gamesettings.safezones.left_zone.position.x + "px";
    safezone1.style.bottom = GameState.gamesettings.safezones.left_zone.position["-y"] + "px";
    safezone1.style.width = GameState.gamesettings.safezones.left_zone.size.x + "px";
    safezone1.style.height = GameState.gamesettings.safezones.left_zone.size.y + "px";
    safezone1.style.zIndex = GameState.gamesettings.safezones.left_zone.position.z;
    document.getElementById("content").appendChild(safezone1); 

    const safezone2 = document.createElement("div");
    safezone2.id = "safezone2";
    safezone2.className = "safezone";
    safezone2.style.position ="absolute";
    safezone2.style.backgroundColor = "white";
    safezone2.style.right = GameState.gamesettings.safezones.right_zone.position["-x"] + "px";
    safezone2.style.bottom = GameState.gamesettings.safezones.right_zone.position["-y"] + "px";
    safezone2.style.width = GameState.gamesettings.safezones.right_zone.size.x + "px";
    safezone2.style.height = GameState.gamesettings.safezones.right_zone.size.y + "px";
    safezone2.style.zIndex = GameState.gamesettings.safezones.right_zone.position.z;
    document.getElementById("content").appendChild(safezone2);
    setInterval(ConstantUpdater,10);

    //set up enemies
    spawn_enemies();
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
    const enemy_amount = RandomRangedIntiger(GameState.gamesettings.min_enemy,GameState.gamesettings.max_enemy);
    let collisions = 0; // this number increases if the "else" creates an overlapping enemy. It is super cursed as it is O^n 
    //generate coordinates for all enemies
    for(let currentEnemy = 0; currentEnemy < enemy_amount; currentEnemy ++){
        let new_x = RandomRangedIntiger(10,window.innerWidth - 10);
        let new_y = RandomRangedIntiger(10,window.innerHeight - 10);

        if(IScollidedObject(new_x, GameState.gamesettings.enemy_size.x, new_y, GameState.gamesettings.enemy_size.y, GameState.enemies) == null){
            //spawn first object
            //GameState.enemies = {}; initializes the object so that Object.keys could actually read it
            GameState.enemies = {};
            GameState.enemies[Object.keys(GameState.enemies).length] = {
                "position":{
                    "x":new_x,
                    "y":new_y
                },
                "size":{
                    "x":GameState.gamesettings.enemy_size.x,
                    "y":GameState.gamesettings.enemy_size.y
                }
            };            
        }
        else{
            //this is where things become outright cursed
            const DataArray = IScollidedObject(new_x, GameState.gamesettings.enemy_size.x, new_y, GameState.gamesettings.enemy_size.y, GameState.enemies);
            for(let RunnerPointer = 0; RunnerPointer < DataArray.length; RunnerPointer ++){
                if(DataArray[RunnerPointer]){
                    //checks if the coordinates are true. If they are, it'll set some new ones. 
                    GameState.enemies[RunnerPointer].position.x = RandomRangedIntiger(10,document.getElementById("content").innerWidth - 10);
                    GameState.enemies[RunnerPointer].position.y = RandomRangedIntiger(10,document.getElementById("content").innerHeight - 10);
                    collisions = collisions + 1;
                }
            }
            //set normal coordinate
            GameState.enemies[Object.keys(GameState.enemies).length] = {
                "position":{
                    "x":new_x,
                    "y":new_y
                },
                "size":{
                    "x":GameState.gamesettings.enemy_size.x,
                    "y":GameState.gamesettings.enemy_size.y
                }
            };

        }


    }
    console.info("spawning enemy... Caused " + collisions + " collisions"); //counter for how many enemies had to have their coordinates relocated


    for(let CurrentEnemy = 0; CurrentEnemy < Object.keys(GameState.enemies).length; CurrentEnemy ++){
        const enemy = document.createElement("div");
        enemy.className = "enemy";
        enemy.id = "enemy " + CurrentEnemy;
        enemy.style.top = GameState.enemies[CurrentEnemy].position.y; 
        enemy.style.left = GameState.enemies[CurrentEnemy].position.x; 
        enemy.style.width = GameState.enemies[CurrentEnemy].size.x; 
        enemy.style.height = GameState.enemies[CurrentEnemy].size.y; 
        enemy.style.position = "absolute";
        enemy.style.borderColor = "red";
        enemy.style.borderStyle = "dashed";
        document.getElementById("content").appendChild(enemy);
    }

}
