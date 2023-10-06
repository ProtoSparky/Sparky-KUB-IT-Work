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