var PlayerPosX;
var PlayerPosY;
var ErrorPosX;
var ErrorPosY;
var Points = 0; 

//Export function hit()
window.hit = function hit(){
    //alert ("teest");
    PlayerPosX = element.style.left;
    PlayerPosY = element.style.top;

    ErrorPosX = error.style.left;
    ErrorPosY = error.style.top; 
    ErrorPosX = ErrorPosX.slice(0,2); //removes the px
    ErrorPosY = ErrorPosY.slice(0,2); //removes the px
    ErrorPosX = Number(ErrorPosX);
    ErrorPosY = Number(ErrorPosY); 

    PlayerPosX = PlayerPosX.slice(0,2); //removes the px
    PlayerPosY = PlayerPosY.slice(0,2); //removes the px
    PlayerPosX = Number(PlayerPosX);
    PlayerPosY = Number(PlayerPosY); 


    if((PlayerPosX >= ErrorPosX) && (PlayerPosX  <= ErrorPosX + ((50/2)+12)) && (PlayerPosY >= ErrorPosY) && (PlayerPosY <= ErrorPosY + ((50/2)-10))){
        //When player and enemy align
        Points = Number(Points) +1;
        document.getElementById("points").innerHTML = Points; 
        error_move(); //move enemy
        return;
    }
    else{
        return; 
    }

}
function reset_game(){
    Points=0; 
    document.getElementById("points").innerHTML = Points; 
}
