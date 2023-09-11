var PlayerPosX;
var PlayerPosY;
var ErrorPosX;
var ErrorPosY;
var Points = 0; 

//Export function hit()
window.hit = function hit(){
    console.log("Attempted Hit!");
    //alert ("teest");
    PlayerPosX = element.style.left;
    PlayerPosY = element.style.top;

    ErrorPosX = error.style.left;
    ErrorPosY = error.style.top; 
    ErrorPosX = ErrorPosX.slice(0,2);
    ErrorPosY = ErrorPosY.slice(0,2);
    ErrorPosX = Number(ErrorPosX);
    ErrorPosY = Number(ErrorPosY); 

    PlayerPosX = PlayerPosX.slice(0,2); //removes the px
    PlayerPosY = PlayerPosY.slice(0,2); //removes the px
    PlayerPosX = Number(PlayerPosX);
    PlayerPosY = Number(PlayerPosY); 




}