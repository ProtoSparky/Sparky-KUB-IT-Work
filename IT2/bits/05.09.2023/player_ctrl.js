var element= null; 
var startleft;
var starttop;
var posX = 0;
var posY = 0;
var randomx = 0;
var randomY = 0;
var randomthing; 

function start(){
    element = document.getElementById("player_error"); 
    element.style.position ="relative"; 
    element.style.left= (innerWidth/2)+"px";
    element.style.top = (innerHeight/2)+"px";  

}
function check_move(event){
    var key_press = event.which || event.keyCode;
    switch (key_press){
        case 65: //a
            moveleft();           
            break;
        
        case 87: //w
            moveup();
            break;
        
        case 68: //d
            moveright();
            break;

        case 83: //s
            movedown();
            break; 
        
        case 69: //space
            hit();
            break;

        case 27:
            reset_game();
            break; 
        

    }


}

function moveleft(){
    var image=document.getElementById("player_error"); 
    image.src = "./assets/errors/error_left.png"; 
    element.style.left = parseInt(element.style.left)-15+"px"; 
}
function moveup(){
    var image=document.getElementById("player_error"); 
    image.src = "./assets/errors/error_up.png"; 
    element.style.top = parseInt(element.style.top)-15+"px"; 
}
function moveright(){
    var image=document.getElementById("player_error");
    image.src = "./assets/errors/error_right.png";
    element.style.left = parseInt(element.style.left)+15+"px";
}
function movedown(){
    var image = document.getElementById("player_error");
    image.src = "./assets/errors/error_down.png";
    element.style.top = parseInt(element.style.top)+15+"px"; 

}



window.onload = start;


