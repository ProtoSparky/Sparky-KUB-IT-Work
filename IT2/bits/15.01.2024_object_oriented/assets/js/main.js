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
        "playerMaxSpeed":10, //the actual speed the player has in any instance
        "stock_player_speed":10, //the starting speed the player has
        "PlayerID":"player", //div id for player
        "safe":true, //is player in safezone
        "playerHeading":null, //degrees headin
        "inventory":{
            "inventory_full":false, 
            "captured_collectible_id":null,
        },
        "points":0, 
        "current_health":null,
        "max_health":500,
        "health_text":"Health ",
        "dead":false,
        "death_message":"You're dead!",
        "win_message":"You Won!",
        
    },
    "collectibles":{
        //this is where all the sheep stay
    },
    "hinderances":{
        //this is where all the stone walls are placed
    },
    "enemies":{
        //this is where the enemies are placed
    },
    "gamesettings":{
        "HUD":{
          "position":{
            "x":0,
            "y":0
          },
          "size":{
            "x":250,
            "y":130
          },
          "color":{
            "BackgroundColor":"white",
            "color":"black",
            "opacity":0.7,
          },
          "text":{
            "added_text":" sheep captured", 
          },
          "controls":"WASD for movement <br> SPACE to capture yellow <br> Green area = safezones", 
           
        },
        "game_walls":{
            //position for walls so player cannot exit game view
            "top":{
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
                "position":{
                    "x":0,
                    "y":0
                },
                "size":{
                    "x":1,
                    "y":window.innerHeight
                }
            }
        },        
        "sheep":{
            //settings for sheep
            "sheep_id":"sheep",
            "sheep_amount":3,
            "speed":5,
            "size":{
                "x":15,
                "y":15
            }
        },
        "hinderances":{
            "min_hinderances":3,
            "max_hinderances":10,
            "size":{
                "x":20,
                "y":20
            },
            "style":{
                "backgroundColor":"gray",
            }
        },
        "max_enemy":10,
        "min_enemy":3,
        "enemy_walk_speed":3,
        "enemy_agro_speed":10,
        "enemy_id":"enemy",
        "enemy_size":{
            "x":30,
            "y":30
        },
        "enemy_agro_radius":470, //in pixels
        "safezones":{
            "left_zone":{
                "position":{
                    "x":0,
                    "y":0,
                    "z":10
                },
                "size":{
                    "x":200,
                    "y":80
                }
            },
            "right_zone":{
                "position":{
                    "x":0,
                    "y":0,
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
    document.getElementById("content-fullscreen").appendChild(player);
    //document.body.style.overflow = "hidden";

    //spawn colision meshes

    //top mesh
    const col_mesh_top = document.createElement("div");
    col_mesh_top.className = "col_mesh";
    col_mesh_top.style.position = "absolute";
    col_mesh_top.style.top = GameState.gamesettings.game_walls.top.position.y;
    col_mesh_top.style.width = GameState.gamesettings.game_walls.top.size.x;
    col_mesh_top.style.left = GameState.gamesettings.game_walls.top.position.x; 
    col_mesh_top.id = "col_mesh_top"; 
    document.getElementById("content-fullscreen").appendChild(col_mesh_top);


    //bottom mesh
    const col_mesh_bottom = document.createElement("div");
    col_mesh_bottom.className = "col_mesh";
    col_mesh_bottom.style.position ="absolute";
    col_mesh_bottom.id ="col_mesh_bottom";
    col_mesh_bottom.style.width = GameState.gamesettings.game_walls.bottom.size.x;
    col_mesh_bottom.style.left = GameState.gamesettings.game_walls.bottom.position.x;
    col_mesh_bottom.style.top = GameState.gamesettings.game_walls.bottom.position.y; 
    col_mesh_bottom.style.height = GameState.gamesettings.game_walls.bottom.size.y;
    document.getElementById("content-fullscreen").appendChild(col_mesh_bottom);
    

    //left mesh
    const col_mesh_left = document.createElement("div");
    col_mesh_left.style.position = "absolute";
    col_mesh_left.style.width = GameState.gamesettings.game_walls.left.size.x; 
    col_mesh_left.style.left = GameState.gamesettings.game_walls.left.position.x;
    col_mesh_left.style.top = GameState.gamesettings.game_walls.left.position.y;
    col_mesh_left.style.height = GameState.gamesettings.game_walls.left.size.y;
    col_mesh_left.className = "col_mesh";
    col_mesh_left.id = "col_mesh_left";
    document.getElementById("content-fullscreen").appendChild(col_mesh_left);


    //right mesh
    const col_mesh_right = document.createElement("div");
    col_mesh_right.style.position = "absolute";
    col_mesh_right.style.top = GameState.gamesettings.game_walls.right.position.y;
    col_mesh_right.style.left = GameState.gamesettings.game_walls.right.position.x; 
    col_mesh_right.className = "col_mesh";
    col_mesh_right.id = "col_mesh_right";
    col_mesh_right.style.height = GameState.gamesettings.game_walls.right.size.y;
    col_mesh_right.style.width = "1px"; 
    document.getElementById("content-fullscreen").appendChild(col_mesh_right);

    //create safezones
    const safezone1 = document.createElement("div");
    safezone1.id = "safezone1";
    safezone1.className = "safezone";
    safezone1.style.position ="absolute";
    safezone1.style.backgroundColor = "#9dff73";
    safezone1.style.left = GameState.gamesettings.safezones.left_zone.position.x + "px";
    safezone1.style.top = GameState.gamesettings.safezones.left_zone.position["y"] + "px";
    safezone1.style.width = GameState.gamesettings.safezones.left_zone.size.x + "px";
    safezone1.style.height = GameState.gamesettings.safezones.left_zone.size.y + "px";
    safezone1.style.zIndex = GameState.gamesettings.safezones.left_zone.position.z;
    document.getElementById("content-fullscreen").appendChild(safezone1); 

    const safezone2 = document.createElement("div");
    safezone2.id = "safezone2";
    safezone2.className = "safezone";
    safezone2.style.position ="absolute";
    safezone2.style.backgroundColor = "#9dff73";
    safezone2.style.left = GameState.gamesettings.safezones.right_zone.position["x"] + "px";
    safezone2.style.top = GameState.gamesettings.safezones.right_zone.position["y"] + "px";
    safezone2.style.width = GameState.gamesettings.safezones.right_zone.size.x + "px";
    safezone2.style.height = GameState.gamesettings.safezones.right_zone.size.y + "px";
    safezone2.style.zIndex = GameState.gamesettings.safezones.right_zone.position.z;
    document.getElementById("content-fullscreen").appendChild(safezone2);

    //set initial safezone positions at the bottom
    GameState.gamesettings.safezones.left_zone.position.x = 0;
    GameState.gamesettings.safezones.left_zone.position.y = (document.getElementById("content-fullscreen").offsetHeight - GameState.gamesettings.safezones.left_zone.size.y);
    document.getElementById("safezone1").style.top = GameState.gamesettings.safezones.left_zone.position.y;
    GameState.gamesettings.safezones.right_zone.position.x = (document.getElementById("content-fullscreen").offsetWidth - GameState.gamesettings.safezones.right_zone.size.x);
    GameState.gamesettings.safezones.right_zone.position.y = (document.getElementById("content-fullscreen").offsetHeight - GameState.gamesettings.safezones.right_zone.size.y);
    document.getElementById("safezone2").style.left = GameState.gamesettings.safezones.right_zone.position.x;
    document.getElementById("safezone2").style.top = GameState.gamesettings.safezones.right_zone.position.y;

    //set initial player position
    GameState.player.position.y = GameState.gamesettings.safezones.left_zone.position.y + 10;


    //set up hud
    const HUD = document.createElement("div");
    HUD.style.position = "absolute";
    HUD.style.top = GameState.gamesettings.HUD.position.y;
    HUD.style.left = GameState.gamesettings.HUD.position.x;
    HUD.style.width = GameState.gamesettings.HUD.size.x;
    HUD.style.height = GameState.gamesettings.HUD.size.y; 
    HUD.style.backgroundColor = GameState.gamesettings.HUD.color.BackgroundColor; 
    HUD.style.opacity = GameState.gamesettings.HUD.color.opacity;
    document.getElementById("content-fullscreen").appendChild(HUD);

    //set up points
    const HUD_points = document.createElement("div");
    HUD_points.className = "text";
    HUD_points.style.position = "absolute";
    HUD_points.style.top = "60";
    HUD_points.style.left = "30";
    HUD_points.id = "HUD_points";
    HUD.appendChild(HUD_points)

    //set player health
    if(GameState.player.current_health == null){
        GameState.player.current_health = GameState.player.max_health;
    }
    //show player health
    const PlayerHealth = document.createElement("div");
    PlayerHealth.style.position = "absolute";
    PlayerHealth.className  ="text";
    PlayerHealth.id = "PlayerHealth";
    PlayerHealth.style.top = "80px";
    PlayerHealth.style.left = "30px";
    HUD.appendChild(PlayerHealth);

    //create death message
    const DeathMessage = document.createElement("div");
    DeathMessage.style.position = "absolute";
    DeathMessage.id = "DeathMessage";
    DeathMessage.className = "text";
    DeathMessage.style.top = "100px";
    DeathMessage.style.left = "30px"; 
    HUD.appendChild(DeathMessage); 

    //tutorial message
    const controls = document.createElement("div"); 
    controls.id = "controls";
    controls.className = "text";
    controls.style.position ="absolute";
    controls.style.left = "30px";
    controls.style.top = "0px"; 
    controls.innerHTML = GameState.gamesettings.HUD.controls;
    HUD.appendChild(controls);


    //set up enemies
    spawn_enemies();
    
    //set up sheep
    spawn_sheep();

    //spawn hinderances
    spawn_hinderances();

    setInterval(ConstantUpdater,10);
    setInterval(ConstantUpdater_LLP,30);
    setInterval(ConstantUpdate_LP,1000);
}
function ConstantUpdater(){
    //update things once every 10 ms 
    if(GameState.player.dead == true){
        const DeathMessage = document.getElementById("DeathMessage");
        DeathMessage.innerHTML = GameState.player.death_message; 
    }
    else if(GameState.player.points == GameState.gamesettings.sheep.sheep_amount){
        const DeathMessage = document.getElementById("DeathMessage");
        DeathMessage.innerHTML = GameState.player.win_message; 
    }
    else if(GameState.player.dead == false){
        check_player_input();
        ApplyPlayerState();
    }
    checkforwall(); //stops player if they hit grey walls
    BindCollectible(); //if player captures sheep, bind sheep position to player. Also remove sheep once player is in safezone
}; 
function ConstantUpdater_LLP(){
    //had to set up a slightly slower updater due to fps drops
    UpdateAIPositions(); //update all ai positions to divs
    AI_update(1);
}
function ConstantUpdate_LP(){
    //update stuff once a second
    GameState.gamesettings.safezones.left_zone.position.x = 0;
    GameState.gamesettings.safezones.left_zone.position.y = (document.getElementById("content-fullscreen").offsetHeight - GameState.gamesettings.safezones.left_zone.size.y);
    document.getElementById("safezone1").style.top = GameState.gamesettings.safezones.left_zone.position.y;
    GameState.gamesettings.safezones.right_zone.position.x = (document.getElementById("content-fullscreen").offsetWidth - GameState.gamesettings.safezones.right_zone.size.x);
    GameState.gamesettings.safezones.right_zone.position.y = (document.getElementById("content-fullscreen").offsetHeight - GameState.gamesettings.safezones.right_zone.size.y);
    document.getElementById("safezone2").style.left = GameState.gamesettings.safezones.right_zone.position.x;
    document.getElementById("safezone2").style.top = GameState.gamesettings.safezones.right_zone.position.y;


    //i really fucking hate that i wasted hours trying to fix a problem, and this is the solution. 
    //set hinderance positions to new places
    for(let hinderance_pointer = 0; hinderance_pointer < Object.keys(GameState.hinderances).length; hinderance_pointer ++){
        const current_hinderance = GameState.hinderances[hinderance_pointer];
        const hinderance_object = document.getElementById("Hinderance"+hinderance_pointer);
        hinderance_object.style.left = current_hinderance.position.x; 
        hinderance_object.style.top = current_hinderance.position.y; 
        hinderance_object.style.width = current_hinderance.size.x; 
        hinderance_object.style.height = current_hinderance.size.y; 
        
    }

    //update HUD
    const HUD_points = document.getElementById("HUD_points");
    HUD_points.innerHTML = GameState.player.points + "/" + GameState.gamesettings.sheep.sheep_amount + GameState.gamesettings.HUD.text.added_text; 

    const PlayerHealth = document.getElementById("PlayerHealth");
    PlayerHealth.innerHTML = GameState.player.health_text + GameState.player.current_health + "/" + GameState.player.max_health; 




    //update AI
    AI_update(0);
}

function ApplyPlayerState(){
    document.getElementById(GameState.player.PlayerID).style.top = GameState.player.position.y;
    document.getElementById(GameState.player.PlayerID).style.left = GameState.player.position.x;
    const colliderJSON = {
        "0":{
            "position":{
                "x":GameState.gamesettings.safezones.left_zone.position.x,
                "y":GameState.gamesettings.safezones.left_zone.position.y
            },
            "size":{
                "x":GameState.gamesettings.safezones.left_zone.size.x,
                "y":GameState.gamesettings.safezones.left_zone.size.y
            }
        },
        "1":{
            "position":{
                "x":GameState.gamesettings.safezones.right_zone.position.x,
                "y":GameState.gamesettings.safezones.right_zone.position.y
            },
            "size":{
                "x":GameState.gamesettings.safezones.right_zone.size.x,
                "y":GameState.gamesettings.safezones.right_zone.size.y
            }
        }
    };
    const SafeZoneChecker = IScollidedObject((GameState.player.position.x) , (GameState.player.size.x),  (GameState.player.position.y),(GameState.player.size.y),colliderJSON);    
    if(SafeZoneChecker[0] || SafeZoneChecker[1]){
        document.getElementById(GameState.player.PlayerID).style.borderColor = "black";
        //set state so player is outside of zones
        GameState.player.safe = true;
    }
    else{
        document.getElementById(GameState.player.PlayerID).style.borderColor = "white";
        GameState.player.safe = false;
    }    
    
}
function spawn_enemies(){
    //function that spawns enemies in the game area
    const enemy_amount = RandomRangedIntiger(GameState.gamesettings.min_enemy,GameState.gamesettings.max_enemy);
    let collisions = 0; // this number increases if the "else" creates an overlapping enemy. It is super cursed as it is O^n 
    //generate coordinates for all enemies
    for(let currentEnemy = 0; currentEnemy < enemy_amount; currentEnemy ++){
        let new_x = RandomRangedIntiger(10,window.innerWidth - 50);
        let new_y = RandomRangedIntiger(10,window.innerHeight - 10);

        let enemies_already_saved = Object.keys(GameState.enemies).length; 
        for(let enemy_checker_pointer = 0; enemy_checker_pointer < enemies_already_saved; enemy_checker_pointer ++){
            if(IScollidedObject(new_x,GameState.gamesettings.enemy_size.x, new_y,GameState.gamesettings.enemy_size.y,GameState.enemies)[enemy_checker_pointer]){
                new_y = RandomRangedIntiger(10,window.innerHeight - 10);
                new_x = RandomRangedIntiger(10,window.innerWidth - 50);
                collisions = collisions + 1; 
            }
        } 
        GameState.enemies[currentEnemy] = {
            "position":{
                "x":new_x,
                "y":new_y,
            },
            "size":{
                "x":GameState.gamesettings.enemy_size.x,
                "y":GameState.gamesettings.enemy_size.y,
            },
            "heading":null,
            "agro":false, 
        }    
    }
    console.info("spawning enemy... Caused " + collisions + " collisions"); //counter for how many enemies had to have their coordinates relocated

    for(let CurrentEnemy = 0; CurrentEnemy < Object.keys(GameState.enemies).length; CurrentEnemy ++){
        const enemy = document.createElement("div");
        enemy.className = "enemy";
        enemy.id = GameState.gamesettings.enemy_id+ CurrentEnemy;
        enemy.style.top = GameState.enemies[CurrentEnemy].position.y; 
        enemy.style.left = GameState.enemies[CurrentEnemy].position.x; 
        enemy.style.width = GameState.enemies[CurrentEnemy].size.x; 
        enemy.style.height = GameState.enemies[CurrentEnemy].size.y; 
        enemy.style.position = "absolute";
        enemy.style.borderColor = "red";
        enemy.style.borderStyle = "dashed";
        document.getElementById("content-fullscreen").appendChild(enemy);
    }


}
function spawn_sheep(){
    let collisions = 0; 
    let NoGoZones = {}; 
    //add safezones
    const safezone_amount = Object.keys(GameState.gamesettings.safezones).length; 
    const enemies_amount = Object.keys(GameState.enemies).length; 
    //add enemies
    for(let enemy_nogo_pointer = 0; enemy_nogo_pointer < enemies_amount; enemy_nogo_pointer ++){
        NoGoZones[enemy_nogo_pointer] = GameState.enemies[enemy_nogo_pointer];
    }
    //add safezones
    for(let safezone_nogo_pointer = enemies_amount; safezone_nogo_pointer < safezone_amount + enemies_amount; safezone_nogo_pointer ++){
        let current_pointer = safezone_nogo_pointer - enemies_amount;
        let safezone_names = Object.keys(GameState.gamesettings.safezones)[current_pointer]; 
        NoGoZones[safezone_nogo_pointer] = GameState.gamesettings.safezones[safezone_names];
    }
    
    //spawn sheep
    for(let sheep_pointer = 0; sheep_pointer < GameState.gamesettings.sheep.sheep_amount; sheep_pointer ++){
        //create new coordinates
        let new_x = RandomRangedIntiger(10,window.innerWidth - 50);
        let new_y = RandomRangedIntiger(10,window.innerHeight - 10);

        //check if coordinates conflict
        let sheep_already_spawned = Object.keys(GameState.collectibles).length; 
        for(let sheep_checker_pointer = 0; sheep_checker_pointer < sheep_already_spawned; sheep_checker_pointer ++){
            if(IScollidedObject(new_x,GameState.gamesettings.sheep.size.x, new_y,GameState.gamesettings.sheep.size.y,NoGoZones)[sheep_checker_pointer]){
                new_y = RandomRangedIntiger(10,window.innerHeight - 10);
                new_x = RandomRangedIntiger(10,window.innerWidth - 50);
                collisions = collisions + 1; 
            }
        } 

        GameState.collectibles[sheep_pointer] = {
            "position":{
                "x":new_x,
                "y":new_y,
            },
            "size":{
                "x":GameState.gamesettings.enemy_size.x,
                "y":GameState.gamesettings.enemy_size.y,
            },
            "has_ai":true,
            "heading":null,
        };

    }
    console.info("spawning sheep... Caused " + collisions + " collisions"); //counter for how many enemies had to have their coordinates relocated


    //spawn sheep
    const SheepAmount = Object.keys(GameState.collectibles).length;
    for(let SheepPointer = 0; SheepPointer < SheepAmount; SheepPointer ++){
        const Sheep = document.createElement("div");
        Sheep.id = GameState.gamesettings.sheep.sheep_id + SheepPointer;
        Sheep.className = "Sheep";
        Sheep.style.position =  "absolute";
        Sheep.style.borderColor = "yellow";
        Sheep.style.borderStyle = "dashed";
        Sheep.style.left = GameState.collectibles[SheepPointer].position.x;
        Sheep.style.top = GameState.collectibles[SheepPointer].position.y;
        Sheep.style.width = GameState.gamesettings.sheep.size.x;
        Sheep.style.height = GameState.gamesettings.sheep.size.y;
        Sheep.style.transition = "2s";
        document.getElementById("content-fullscreen").appendChild(Sheep);
    }
    
}
function spawn_hinderances(){
    let Enemies_Spawned = GameState.enemies;
    let Sheep_Spawned = GameState.collectibles;
    let Safezones_Spawned = GameState.gamesettings.safezones;
    //combine everything into one object
    let CombinedObject = {

    };

    let Collisions = 0; 
    
    //for loop for enemies
    for(let loop_pointer = 0; loop_pointer < Object.keys(Enemies_Spawned).length; loop_pointer++){
        CombinedObject[loop_pointer] = Enemies_Spawned[loop_pointer];
    }

    //Sheep spawned
    const CombinedObjectLength1 = Object.keys(CombinedObject).length;
    for(let loop_pointer1 = CombinedObjectLength1; loop_pointer1 < (Object.keys(Sheep_Spawned).length + CombinedObjectLength1); loop_pointer1 ++){
        CombinedObject[loop_pointer1] = Sheep_Spawned[loop_pointer1 - CombinedObjectLength1]; 
    }

    //combine safezones
    const CombinedObjectLength2 = Object.keys(CombinedObject).length; 
    for(let loop_pointer2 = CombinedObjectLength2; loop_pointer2 <(Object.keys(Safezones_Spawned).length + CombinedObjectLength2); loop_pointer2 ++){
        CombinedObject[loop_pointer2] = Safezones_Spawned[Object.keys(Safezones_Spawned)[loop_pointer2 - CombinedObjectLength2]];
    }
    
    //generate random amount of hinderances
    const HinderancesAmount = RandomRangedIntiger(GameState.gamesettings.hinderances.min_hinderances,GameState.gamesettings.hinderances.max_hinderances);

    for(let HinderancePointer = 0; HinderancePointer < HinderancesAmount; HinderancePointer ++){
        let new_x = RandomRangedIntiger(10,window.innerWidth - 50);
        let new_y = RandomRangedIntiger(10,window.innerHeight - 10);
        
        //check corrdinates against disallowed ones
        for(let hinderance_pointer = 0; hinderance_pointer < Object.keys(CombinedObject).length; hinderance_pointer ++){
            if(IScollidedObject(new_x,GameState.gamesettings.hinderances.size.x,new_y,GameState.gamesettings.hinderances.size.y, CombinedObject)[hinderance_pointer]){
                //set new coordinates as the previous ones were in the way
                new_x = RandomRangedIntiger(10,window.innerWidth - 50);
                new_y = RandomRangedIntiger(10,window.innerHeight - 10);
                Collisions ++; 
            };
        };
        const current_hinderance = {
            "position":{
                "x":new_x, 
                "y":new_y
            },
            "size":{
                "x":GameState.gamesettings.hinderances.size.x,
                "y":GameState.gamesettings.hinderances.size.y
            }
        };
        GameState.hinderances[HinderancePointer] = current_hinderance; 

        //spawn the hinderances
        const HinderanceObject = document.createElement("div");
        HinderanceObject.className = "Hinderance";
        HinderanceObject.id = "Hinderance" + HinderancePointer;
        HinderanceObject.style.position = "absolute";
        HinderanceObject.style.top = new_y;
        HinderanceObject.style.left = new_y;
        HinderanceObject.style.borderColor = GameState.gamesettings.hinderances.style.backgroundColor;
        HinderanceObject.style.borderStyle = "dashed";
        HinderanceObject.style.width = GameState.gamesettings.hinderances.size.x;
        HinderanceObject.style.height = GameState.gamesettings.hinderances.size.y;
        document.getElementById("content-fullscreen").appendChild(HinderanceObject);
    }
    console.info("spawn hinderances caused " + Collisions +" collisions"); 


}
function AI_update(type){
    if(type == 0){
        //this one is for the sheep
        const SheepAmount = Object.keys(GameState.collectibles).length; 
        for(let CurrentSheep = 0; CurrentSheep < SheepAmount; CurrentSheep ++){
            if(GameState.collectibles[CurrentSheep].has_ai == true){
                //checks if the sheep has an ai and is allowed to move
                const AI_RNG = RandomRangedIntiger(0,1);
                //checks if angle is nonexistent, sets new one
                if(GameState.collectibles[CurrentSheep].heading == null){
                    GameState.collectibles[CurrentSheep].heading = RandomRangedIntiger(0,360);
                }

                //set up some rng
                if(AI_RNG == 0){
                    //move in the same direction
                    const New_coordinates = calculateCoordinates(GameState.collectibles[CurrentSheep].position.x,GameState.collectibles[CurrentSheep].heading,GameState.collectibles[CurrentSheep].position.y,GameState.gamesettings.sheep.speed);
                    GameState.collectibles[CurrentSheep].position.x = New_coordinates[0];
                    GameState.collectibles[CurrentSheep].position.y = New_coordinates[1];
                }
                else if(AI_RNG == 0){
                    //pick new coordinate
                    GameState.collectibles[CurrentSheep].heading =  RandomRangedIntiger(0,360);
                    const New_coordinates = calculateCoordinates(GameState.collectibles[CurrentSheep].position.x,GameState.collectibles[CurrentSheep].heading,GameState.collectibles[CurrentSheep].position.y,GameState.gamesettings.sheep.speed);
                    GameState.collectibles[CurrentSheep].position.x = New_coordinates[0];
                    GameState.collectibles[CurrentSheep].position.y = New_coordinates[1];

                }            



            }
        }

    }
    else if(type == 1){
        //this one is for the enemies
        const Enemy_amount = Object.keys(GameState.enemies).length;
        for(let current_enemy = 0; current_enemy < Enemy_amount; current_enemy ++){
            //check if the enemy selected is aggressive to the player before changing its position
            if(GameState.enemies[current_enemy].agro == false){

                if(GameState.player.safe == false){
                    //check if player could be within agro range

                    const X1 = GameState.enemies[current_enemy].position.x - GameState.gamesettings.enemy_agro_radius;
                    const X1_W = GameState.enemies[current_enemy].size.x + GameState.gamesettings.enemy_agro_radius;
                    const Y1 = GameState.enemies[current_enemy].position.y - GameState.gamesettings.enemy_agro_radius;
                    const Y1_W = GameState.enemies[current_enemy].size.y + GameState.gamesettings.enemy_agro_radius;
                    const DummyObject = {
                        "0":{
                            "position":{
                                "x":X1,
                                "y":Y1
                            },
                            "size":{
                                "x":X1_W,
                                "y":Y1_W
                            }
                        }
                    };
                    //check if player is in enemy radius
                    if(IScollidedObject(GameState.player.position.x,GameState.player.size.x,GameState.player.position.y, GameState.player.size.y,DummyObject)[0]){
                        GameState.enemies[current_enemy ].agro = true; 
                    }
                }
                
                const AI_RNG = RandomRangedIntiger(0,1);
                if(AI_RNG == 0){
                    //continue in the same direction
                    if(GameState.enemies[current_enemy].heading == null){
                        //pick new heading
                        const New_heading = RandomRangedIntiger(0,360);
                        GameState.enemies[current_enemy].heading = New_heading;
                    }

                    if(GameState.enemies[current_enemy].position.x < 0 || GameState.enemies[current_enemy].position.x > window.innerWidth || GameState.enemies[current_enemy].position.y < 0 || GameState.enemies[current_enemy].position.y > window.innerHeight){
                        GameState.enemies[current_enemy].heading = calculateAngle(GameState.enemies[current_enemy].position.x, GameState.enemies[current_enemy].position.y,window.innerWidth /2, window.innerHeight)
                        const new_coords = calculateCoordinates(GameState.enemies[current_enemy].position.x,GameState.enemies[current_enemy].position.y,GameState.enemies[current_enemy].heading,GameState.gamesettings.enemy_walk_speed); 
                        GameState.enemies[current_enemy].position.x = new_coords[0];
                        GameState.enemies[current_enemy].position.y = new_coords[1];
                    }
                    else{
                        const new_coords = calculateCoordinates(GameState.enemies[current_enemy].position.x,GameState.enemies[current_enemy].position.y,GameState.enemies[current_enemy].heading,GameState.gamesettings.enemy_walk_speed); 
                        GameState.enemies[current_enemy].position.x = new_coords[0];
                        GameState.enemies[current_enemy].position.y = new_coords[1];
                    }
                    
                }
                else if(AI_RNG == 1){
                    //pick new direction
                    if(GameState.enemies[current_enemy].position.x < 0 || GameState.enemies[current_enemy].position.x > window.innerWidth || GameState.enemies[current_enemy].position.y < 0 || GameState.enemies[current_enemy].position.y > window.innerHeight){
                        GameState.enemies[current_enemy].heading = calculateAngle(GameState.enemies[current_enemy].position.x, GameState.enemies[current_enemy].position.y,window.innerWidth /2, window.innerHeight)
                        const new_coords = calculateCoordinates(GameState.enemies[current_enemy].position.x,GameState.enemies[current_enemy].position.y,GameState.enemies[current_enemy].heading,GameState.gamesettings.enemy_walk_speed); 
                        GameState.enemies[current_enemy].position.x = new_coords[0];
                        GameState.enemies[current_enemy].position.y = new_coords[1];
                    }
                    else{
                        const New_heading = RandomRangedIntiger(0,360);
                        GameState.enemies[current_enemy].heading = New_heading;
                        const new_coords = calculateCoordinates(GameState.enemies[current_enemy].position.x,GameState.enemies[current_enemy].position.y,GameState.enemies[current_enemy].heading,GameState.gamesettings.enemy_walk_speed); 
                        GameState.enemies[current_enemy].position.x = new_coords[0];
                        GameState.enemies[current_enemy].position.y = new_coords[1];
                    }
                }
            }
            else if(GameState.enemies[current_enemy].agro == true){
                //make the enemy follow the player

                //reset agro flag if player is safe
                if(GameState.player.safe == true){
                    GameState.enemies[current_enemy].agro = false;
                }                
                const PlayerToAiAngle = calculateAngle(GameState.player.position.x,GameState.player.position.y,GameState.enemies[current_enemy].position.x, GameState.enemies[current_enemy].position.y);
                const new_enemy_coords = calculateCoordinates(GameState.enemies[current_enemy].position.x, GameState.enemies[current_enemy].position.y,PlayerToAiAngle + 180,GameState.gamesettings.enemy_agro_speed);
                GameState.enemies[current_enemy].position.x = new_enemy_coords[0];
                GameState.enemies[current_enemy].position.y = new_enemy_coords[1];   
                
                if(IScollidedObject(GameState.player.position.x,GameState.player.size.x,GameState.player.position.y,GameState.player.size.y,GameState.enemies)[current_enemy]== true){
                    if(GameState.player.current_health > 0){
                        GameState.player.current_health = GameState.player.current_health - 1;
                    }
                    else if(GameState.player.current_health == 0){
                        GameState.player.dead = true; 
                    }
                }


            }
            
        }
    }
}

function UpdateAIPositions(){
    //updates all ai positions
    for(let ai_picker = 0; ai_picker <= 1; ai_picker ++){
        //picks between enemies and sheep
        if(ai_picker == 0){
            //update sheep
            const SheepAmount = Object.keys(GameState.collectibles).length; 
            for(let CurrentSheep = 0; CurrentSheep < SheepAmount; CurrentSheep ++){
                if(GameState.collectibles[CurrentSheep].has_ai == true){

                    const CurrentSheepDiv = document.getElementById(GameState.gamesettings.sheep.sheep_id+CurrentSheep);
                    CurrentSheepDiv.style.left = GameState.collectibles[CurrentSheep].position.x;
                    CurrentSheepDiv.style.top = GameState.collectibles[CurrentSheep].position.y;
                }
            }
        }   
        else if(ai_picker == 1){
            //update enemies
            const Enemy_amount = Object.keys(GameState.enemies).length;
            for(let current_enemy = 0; current_enemy < Enemy_amount; current_enemy ++){
                const enemy_object = document.getElementById(GameState.gamesettings.enemy_id + current_enemy + "");
                enemy_object.style.left = GameState.enemies[current_enemy].position.x;
                enemy_object.style.top = GameState.enemies[current_enemy].position.y; 
                if(GameState.enemies[current_enemy].agro == true){
                    enemy_object.style.transition = "0s";
                }
                else if(GameState.enemies[current_enemy].agro == false){
                    enemy_object.style.transition = ".2s";
                }
            }
        }
    }
}

function checkforwall(){
    //this function checks for the grey walls, and if the player is about to intercept with them, stop the player
    const collisions = IScollidedObject(GameState.player.position.x,GameState.player.size.x,GameState.player.position.y,GameState.player.size.y,GameState.hinderances);
    
    if(tester(collisions)){
        GameState.player.playerMaxSpeed = -10;
    }
    else{
        GameState.player.playerMaxSpeed = GameState.player.stock_player_speed;
    }

    //GameState.player.playerMaxSpeed = GameState.player.stock_player_speed;
    function tester(collisions){
        for(let current_collision = 0; current_collision < collisions.length; current_collision ++){
            if(collisions[current_collision]){
                return true
    
            }
        }
        return false; 
    }
}
function capture_sheep(){
    //this is the function for capturing the collectibles, and depositing them
    const collisions = IScollidedObject(GameState.player.position.x,GameState.player.size.x,GameState.player.position.y,GameState.player.size.y,GameState.collectibles);
    if(GameState.player.inventory.inventory_full == false){
        //check that player has no sheep already captured 
        if(captured_sheep_finder(collisions) != null){
            const captured_sheep_id = captured_sheep_finder(collisions); 

            //turn off ai for said sheep 
            GameState.collectibles[captured_sheep_id].has_ai = false;

            //set player inventory to true
            GameState.player.inventory.inventory_full = true;

            //set captured sheep id
            GameState.player.inventory.captured_collectible_id = captured_sheep_id; 
            console.log("sheep captured");
        }
    }


    function captured_sheep_finder(collisions){
        for(let collision_pointer = 0; collision_pointer < collisions.length; collision_pointer ++){
            if(collisions[collision_pointer]){
                return collision_pointer; 
            }
        }
        return null; 
    }
}

function BindCollectible(){
    if(GameState.player.safe == false){
        if(GameState.player.inventory.inventory_full == true && GameState.player.inventory.captured_collectible_id != null){
            //if player has sheep, set sheep position to player
            GameState.collectibles[GameState.player.inventory.captured_collectible_id].position = {
                "x":GameState.player.position.x + (GameState.player.size.x /3),
                "y":GameState.player.position.y + (GameState.player.size.y /3),
            };
            //set div position too
    
            const currentSheep = document.getElementById(GameState.gamesettings.sheep.sheep_id + GameState.player.inventory.captured_collectible_id); 
            currentSheep.style.top = GameState.player.position.y + (GameState.player.size.y /3);
            currentSheep.style.left = GameState.player.position.x + (GameState.player.size.x /3);
            currentSheep.style.transition = ".1s";
        }
    }
    else if(GameState.player.safe == true){
        //kill the sheep
        if(GameState.player.inventory.inventory_full == true && GameState.player.inventory.captured_collectible_id != null){
            const currentSheep = document.getElementById(GameState.gamesettings.sheep.sheep_id + GameState.player.inventory.captured_collectible_id); 
            currentSheep.remove();
            GameState.player.inventory.inventory_full = false;
            GameState.player.inventory.captured_collectible_id = null; 
            GameState.player.points = GameState.player.points + 1; 
        }
    }
}

