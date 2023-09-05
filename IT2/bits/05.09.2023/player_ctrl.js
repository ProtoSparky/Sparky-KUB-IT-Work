var element= null; 
function start(){
    element = document.getElementById("error"); 
    element.style.position ="relative"; 
    element.style.left= (innerWidth/2)+"px";
    element.style.top = (innerHeight/2)+"px";  

}
function check_move(event){
    var key_press = event.which || event.keyCode;
    switch (key_press){
        case 65: 
            moveleft();
            
            break;
        
        case 87:
            moveup();
            break;
        
        case 68:
            moveright();
            break;

        case 83:
            movedown();
            break; 
        

    }


}

function moveleft(){
    var image=document.getElementById("error"); 
    image.src = "./assets/errors/error_left.png"; 
    element.style.left = parseInt(element.style.left)-5+"px"; 
}
function moveup(){
    var image=document.getElementById("error"); 
    image.src = "./assets/errors/error_up.png"; 
    element.style.top = parseInt(element.style.top)-5+"px"; 
}
function moveright(){
    var image=document.getElementById("error");
    image.src = "./assets/errors/error_right.png";
    element.style.left = parseInt(element.style.left)+5+"px";
}
function movedown(){
    var image = document.getElementById("error");
    image.src = "./assets/errors/error_down.png";
    element.style.top = parseInt(element.style.top)+5+"px"; 

}

function center_player(){
    var w = window.innerWidth;
    var h = window.innerHeight; 

    error_player = document.getElementById("error");


   
    console.log(parseInt(error_player.style.top));
}


window.onload = start;


center_player();
