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
    console.log("last position X " + posX);

    
    posY = error.style.top; 
    posY = posY.slice(0,2);
    posY = Number(posY);
    console.log("last position X " + posY);

    /*
    randomX = Math.floor(Math.random() *500)+50; 
    randomY = Math.floor(Math.random() *600)+50; 
    posX=posX+randomX;
    posY=posY+randomY;
*/
    randomX = Math.floor(Math.random() *innerWidth)+10;
    randomY = Math.floor(Math.random() *innerHeight)+10; 
    posX=posX+randomX;
    posY=posY+randomY;
    
    randomnum = Math.floor(Math.random() *2);
    
    if (randomnum == 0){
        posX = posX + randomX;
        posY = posY + randomY; 
    }
    else if(randomnum == 1){
        posX = posX - randomX;
        posY = posY - randomY;
    }

    if(posX > innerWidth - 50 ||(posX<50)){
        error_move();
    }
    else if(posY > innerHeight - 50 || (posY<50)){
        error_move();
    }
    else {
        error.style.left = posX + "px";
        error.style.top = posY + "px";
    } 



    

}

