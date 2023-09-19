var player;
var current_player_X;
var current_player_Y

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
   console.log(current_player_X +"X" + current_player_Y);
   
   
    
}


document.addEventListener('keydown', function(event) {
    current_player_X = parseInt(player.style.left);
    current_player_Y = parseInt(player.style.top);

    if (event.keyCode == 87) {
        console.log("w was pressed"); 
        
        player.style.top = current_player_Y - 10; 

    }
    else if (event.keyCode == 83) {
        console.log("s was pressed"); 
        player.style.top = current_player_Y + 10; 
    }
    else if(event.keyCode == 65){
        console.log("a was pressed"); 
        player.style.left = current_player_X - 10; 
    }
    else if(event.keyCode == 68){
        console.log("d was pressed"); 
        player.style.left = current_player_X + 10; 
    }
}, true);

