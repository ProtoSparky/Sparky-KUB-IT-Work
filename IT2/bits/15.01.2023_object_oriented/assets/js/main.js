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
        "PlayerID":"player",
        "safe":true
        
    },
    "collectibles":{
        
    },
    "hinderances":{

    },
    "enemies":{

    },
    "gamesettings":{        
        "sheep":{
            "sheep_amount":10,
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
        "enemy_size":{
            "x":30,
            "y":30
        },
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
    safezone1.style.backgroundColor = "#9dff73";
    safezone1.style.left = GameState.gamesettings.safezones.left_zone.position.x + "px";
    safezone1.style.top = GameState.gamesettings.safezones.left_zone.position["y"] + "px";
    safezone1.style.width = GameState.gamesettings.safezones.left_zone.size.x + "px";
    safezone1.style.height = GameState.gamesettings.safezones.left_zone.size.y + "px";
    safezone1.style.zIndex = GameState.gamesettings.safezones.left_zone.position.z;
    document.getElementById("content").appendChild(safezone1); 

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
    document.getElementById("content").appendChild(safezone2);

    //set initial safezone positions at the bottom
    GameState.gamesettings.safezones.left_zone.position.x = 0;
    GameState.gamesettings.safezones.left_zone.position.y = (document.getElementById("content").offsetHeight - GameState.gamesettings.safezones.left_zone.size.y);
    document.getElementById("safezone1").style.top = GameState.gamesettings.safezones.left_zone.position.y;
    GameState.gamesettings.safezones.right_zone.position.x = (document.getElementById("content").offsetWidth - GameState.gamesettings.safezones.right_zone.size.x);
    GameState.gamesettings.safezones.right_zone.position.y = (document.getElementById("content").offsetHeight - GameState.gamesettings.safezones.right_zone.size.y);
    document.getElementById("safezone2").style.left = GameState.gamesettings.safezones.right_zone.position.x;
    document.getElementById("safezone2").style.top = GameState.gamesettings.safezones.right_zone.position.y;

    //set initial player position
    GameState.player.position.y = GameState.gamesettings.safezones.left_zone.position.y + 10;


    //set up enemies
    spawn_enemies();
    
    //set up sheep
    spawn_sheep();

    //spawn hinderances
    spawn_hinderances();

    setInterval(ConstantUpdater,10);
    setInterval(ConstantUpdate_LP,1000);
}
function ConstantUpdater(){
    //update things once every 10 ms 
    check_player_input();
    ApplyPlayerState();
}; 
function ConstantUpdate_LP(){
    //update stuff once a second
    GameState.gamesettings.safezones.left_zone.position.x = 0;
    GameState.gamesettings.safezones.left_zone.position.y = (document.getElementById("content").offsetHeight - GameState.gamesettings.safezones.left_zone.size.y);
    document.getElementById("safezone1").style.top = GameState.gamesettings.safezones.left_zone.position.y;
    GameState.gamesettings.safezones.right_zone.position.x = (document.getElementById("content").offsetWidth - GameState.gamesettings.safezones.right_zone.size.x);
    GameState.gamesettings.safezones.right_zone.position.y = (document.getElementById("content").offsetHeight - GameState.gamesettings.safezones.right_zone.size.y);
    document.getElementById("safezone2").style.left = GameState.gamesettings.safezones.right_zone.position.x;
    document.getElementById("safezone2").style.top = GameState.gamesettings.safezones.right_zone.position.y;
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
function spawn_sheep(){
    let ObjectsSpawned = GameState.enemies;
    //add safezones
    const safezone_amount = Object.keys(GameState.gamesettings.safezones).length; 
    const enemies_amount = Object.keys(ObjectsSpawned).length; 
    for(let Safezonepointer = enemies_amount; Safezonepointer < enemies_amount + safezone_amount; Safezonepointer ++){
        //add all all safeazones and enemies to no spawn list
        ObjectsSpawned[Safezonepointer] = GameState.gamesettings.safezones[Object.keys(GameState.gamesettings.safezones)[Safezonepointer-enemies_amount]];      
    }
    for(let SheepPointer = 0; SheepPointer < GameState.gamesettings.sheep.sheep_amount; SheepPointer ++){
        let new_x = RandomRangedIntiger(10,window.innerWidth - 50);
        let new_y = RandomRangedIntiger(10,window.innerHeight - 10);
        
        const NewObjectSpawned = Object.keys(ObjectsSpawned).length;
        for(let check_pointer = 0;check_pointer < NewObjectSpawned; check_pointer ++ ){
            if(IScollidedObject(new_x, GameState.gamesettings.sheep.size.x, new_y, GameState.gamesettings.sheep.size.y, ObjectsSpawned)[NewObjectSpawned]){
                //this turns true if a sheep tried to spawn in an area where something is already occupied
                new_x = RandomRangedIntiger(10,window.innerWidth - 50);
                new_y = RandomRangedIntiger(10,window.innerHeight - 10);
            }
        }
        let SheepObject = {
            "position":{
                "x":new_x,
                "y":new_y
            },
            "size":{
                "x":GameState.gamesettings.sheep.size.x,
                "y":GameState.gamesettings.sheep.size.y
            }
        }
        //write new sheep to collectibles
        GameState.collectibles[SheepPointer] = SheepObject;

    }

    //spawn sheep
    const SheepAmount = Object.keys(GameState.collectibles).length;
    for(let SheepPointer = 0; SheepPointer < SheepAmount; SheepPointer ++){
        const Sheep = document.createElement("div");
        Sheep.id = "sheep" + SheepPointer;
        Sheep.className = "Sheep";
        Sheep.style.position =  "absolute";
        Sheep.style.borderColor = "yellow";
        Sheep.style.borderStyle = "dashed";
        Sheep.style.left = GameState.collectibles[SheepPointer].position.x;
        Sheep.style.top = GameState.collectibles[SheepPointer].position.y;
        Sheep.style.width = GameState.gamesettings.sheep.size.x;
        Sheep.style.height = GameState.gamesettings.sheep.size.y;
        document.getElementById("content").appendChild(Sheep);
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
    const TEMP_hinderances = {}

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
        document.getElementById("content").appendChild(HinderanceObject);
    }
    console.info("spawn hinderances caused " + Collisions +" collisions"); 


}
