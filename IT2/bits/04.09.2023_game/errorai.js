var posX = 0;
var posY = 0;
var randomX = 0;
var randomY = 0; 
var point_amount = 0; 

function error_move(){
    //Get position
    posX = error.style.left; //input will be recived with "px" string
    posX = posX.slice(0,2);  //removes first 2 chars
    posX = Number(posX);     //converts string to num
    console.log("input posX " + posX);

    
    posY = error.style.top; 
    posY = posY.slice(0,2);
    posY = Number(posY);
    console.log("input posY " + posY);

    randomX = Math.floor(Math.random() *400)+50; 
    randomY = Math.floor(Math.random() *400)+50; 
    posX=posX+randomX;
    posY=posY+randomY;

    if(posX > innerWidth){
        error_move();
    }
    else if(posY > innerHeight){
        error_move();
    }
    else {
        error.style.left = posX + "px";
        error.style.top = posY + "px";
    } 



    

}

function add_point(){
    document.getElementById("points_text").value = "test";
    console.log("testaaaaa");
    
}