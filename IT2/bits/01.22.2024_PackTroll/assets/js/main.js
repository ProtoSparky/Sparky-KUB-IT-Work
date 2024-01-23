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
            "speed_increments":0.1,
        },
        "heading":null,
        "points":null, 
        "style":{
            "color":"black",
            "backgroundColor":"green", 
        },
        "id":"player",
        "points":0,
        "is_dead":false, 
    },
    "food":{
        //this is where the food resides
    },
    "last_food_id":null, 
    "settings":{
        "food":{
            "size":{
                "x":20,
                "y":20,
            },
            "style":{
                "backgroundColor_fresh":"yellow",
                "backgroundColor_spoiled":"red",
            },
            "starting_amount":5,
            "id":"food",

        },
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

    //spawn hud
    const HUD = document.createElement("div");
    HUD.style.position = "absolute";
    HUD.style.left = 0;
    HUD.style.top = 0;
    HUD.style.width = "200px";
    HUD.style.height = "120px"; 
    HUD.style.backgroundColor = "white";
    HUD.style.opacity = "0.9";
    
    const Points = document.createElement("div");
    Points.style.position = "absolute";
    Points.style.left = "30px";
    Points.style.top = "60px";
    Points.className = "text";
    Points.id = "Points";
    Points.innerHTML = GameState.player.points + " Points"
    HUD.appendChild(Points);
    document.getElementById("content-fullscreen").appendChild(HUD);

    //death message
    const DeathMessage = document.createElement("div");
    DeathMessage.style.position = "absolute";
    DeathMessage.style.top = "90px";
    DeathMessage.style.left = "30px";
    DeathMessage.className = "text";
    DeathMessage.id = "DeathMessage";
    HUD.appendChild(DeathMessage); 

    //controls
    const Controls = document.createElement("div");
    Controls.style.position = "absolute";
    Controls.style.top  = "10px";
    Controls.style.left = "30px";
    Controls.className  ="text";
    Controls.innerHTML  ="WASD for controls <br> E to re/start game";
    HUD.appendChild(Controls);


    //spawn food
    for(let food = 0; food < GameState.settings.food.starting_amount; food ++){
        SpawnFood();
    }

    //set up infinitly repeating updates

    setInterval(ConstantUpdate,10);
    setInterval(ConstantUpdate_LP,1000);
}
function ConstantUpdate(){
    //updates every 10ms
    check_player_input(); //check player for input
    if(GameState.player.is_dead == false){
        UpdatePlayerPos();
    }
    UpdateDIVS();
    UpdateFood(); 

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
            death()
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
    if( GameState.settings.game_started == false){
        GameState.player.speed.current_speed = GameState.player.speed.starting_speed; 
        console.log("game started");
    }
    GameState.settings.game_started = true;

    if(GameState.player.is_dead == true){
        location.reload();
    }
}

function SpawnFood(){
    const new_x = RandomRangedIntiger(10,window.innerWidth - 50);
    const new_y = RandomRangedIntiger(10,window.innerHeight - 10);
    const FoodAmount = Object.keys(GameState.food).length; 
    GameState.food[FoodAmount] = {
        "position":{
            "x":new_x,
            "y":new_y,
        },
        "size":{
            "x":GameState.settings.food.size.x,
            "y":GameState.settings.food.size.y
        },
        "style":{
            "backgroundColor":GameState.settings.food.style.backgroundColor_fresh, 
        },
        "food":true, 
    };
    const food_object = document.createElement("div"); 
    food_object.id = GameState.settings.food.id + FoodAmount;
    food_object.style.position = "absolute";
    food_object.style.top = new_y,
    food_object.style.left = new_x,
    food_object.style.width = GameState.settings.food.size.x;
    food_object.style.height = GameState.settings.food.size.y;
    food_object.style.backgroundColor = GameState.settings.food.style.backgroundColor_fresh; 
    document.getElementById("content-fullscreen").appendChild(food_object);


}
function UpdateFood(){
    //check if player is on object
    const collided_object = collided_id(IScollidedObject(GameState.player.position.x,GameState.player.size.x, GameState.player.position.y, GameState.player.size.y,GameState.food));
    if(collided_object != null){
        //shitty bugfix 

        const current_food_name = Object.keys(GameState.food)[collided_object];
        const food_object = GameState.food[current_food_name];
        if(food_object.food == true){
            //convert to non food
            const FoodDIV = document.getElementById("food"+collided_object);
            FoodDIV.style.backgroundColor = GameState.settings.food.style.backgroundColor_spoiled;

            //set food as not food
            GameState.food[collided_object].food = false; 

            //spawn new food
            SpawnFood();
            
            //speed up player
            GameState.player.speed.current_speed = GameState.player.speed.current_speed + GameState.player.speed.speed_increments;

            //set points 
            GameState.player.points = GameState.player.points + 1;
            document.getElementById("Points").innerHTML = GameState.player.points + " Points"; 
            
            //set a flag that player was on said food
            GameState.last_food_id = collided_object; 

        }
        else{
            
            if(collided_object == GameState.last_food_id){
                console.info("standing on old food");
            }
            else{
                //kills player
                death(); 
            }
        }
    }

    function collided_id(collisions){
        for(let collision_pointer = 0; collision_pointer < collisions.length; collision_pointer ++){
            if(collisions[collision_pointer]){
                return collision_pointer; 
            }
        }
        return null; 
    }
}
function death(){
    GameState.player.is_dead = true;
    const DeathMessage = document.getElementById("DeathMessage"); 
    DeathMessage.innerHTML = "Youre dead!";

}
