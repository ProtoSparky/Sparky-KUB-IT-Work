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


    if((PlayerPosX >= ErrorPosX) && (PlayerPosX + 55 <= ErrorPosX + 55) && (PlayerPosY >= ErrorPosY) && (PlayerPosY + 55 <= ErrorPosY + 55)){
        Points = Number(Points) +1;
        document.getElementById("points").innerHTML = Points; 
        console.log("HIT!");
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
