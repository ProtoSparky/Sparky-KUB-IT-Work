function KillEnemy(){
   let enemy_max_index =  ClassIndexLength("enemy");
   for(let current_enemy_index = 0; current_enemy_index <= enemy_max_index; current_enemy_index ++){
    if(IScollided(current_player_X - player_speed, player_sizeX,  current_player_Y,player_sizeY, "enemy")[current_enemy_index]){
        let enemy_id = ClassIndexToId("enemy",current_enemy_index);
        //kill enemy;
        let current_enemy = document.getElementById(enemy_id);
        current_enemy.remove();

        point_element = document.getElementById("points_counter");
        current_points = parseInt(point_element.innerHTML);
        point_element.innerHTML = current_points + 1;




    }

 }
}
function summon_enemy(amount) {
    const parentElement = document.getElementById("gameframe");
  
    for (let current_enemy_create = 0; current_enemy_create <= amount; current_enemy_create++) {
      const enemy = document.createElement("div");
      enemy.id = "enemy" + current_enemy_create;
      enemy.className = "enemy";      
      parentElement.appendChild(enemy);
    }
}

var door_sate = 0 
var door_id = 0;
function open_door(){
    const max_time = 5; //seconds
    door_element = document.getElementById("door_counter");
    current_points = parseInt(door_element.innerHTML);
    future_points = current_points - 1;
    door_element.innerHTML = future_points + "s";
    if(future_points == -1){
        
        door_element.innerHTML = max_time + "s"; 
        if(door_sate == 0){
            door_sate = 1;
            //Open door
            hud_element = document.getElementById("door_text");
            hud_element.innerHTML = "Door closes in:"; 

            const water_sufrace_width = window.innerWidth - 50;
            let door = document.getElementById("sea_surface");

            let doorNewLeft = RandomRangedIntiger(0, water_sufrace_width);
            door.style.left= doorNewLeft;





        }
        else if(door_sate == 1){
            door_sate = 0;
            hud_element = document.getElementById("door_text");
            hud_element.innerHTML = "Door opens in:";

            let door = document.getElementById("sea_surface");            
            let doorNewLeft = -1000; 
            door.style.left= doorNewLeft;
        }
        

    }
}


function update_time_left(){
    countdown_element = document.getElementById("time_left_counter");
    hud_countdown = parseInt(countdown_element.innerHTML)
    hud_countdown --; 
    countdown_element.innerHTML = hud_countdown + "s"; 
    if(hud_countdown <= 0){
        countdown_element.innerHTML = 0 +"s"; 
        gamestate = document.getElementById("gamestate");
        gamestate.innerHTML = "Time Over";
        gamestate_int = 0;
    }

}

function ResetCounter(){
    location.reload();
}