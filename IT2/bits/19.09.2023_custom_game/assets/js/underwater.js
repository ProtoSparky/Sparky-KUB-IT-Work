function IsPlayerUnderWater(player_class, underwater_class){
    //Set underwater location
    water_line = document.getElementsByClassName("col_mesh")[ClassIndexLookup("sea","col_mesh")];
    const current_water_line_Y = parseInt(water_line.offsetTop);
    const current_water_line_Y_IB = current_water_line_Y + parseInt(water_line.offsetHeight); 
    const current_water_line_X = parseInt(water_line.offsetLeft);
    const current_water_line_XW = parseInt(water_line.offsetWidth);

    //Underwater
    underwater = document.getElementsByClassName("underwater")[ClassIndexLookup("underwater_col_mesh","underwater")];
    underwater.style.left = current_water_line_X;
    underwater.style.width = current_water_line_XW;
    underwater.style.top = current_water_line_Y_IB;
    underwater.style.height = window.innerHeight - current_water_line_Y_IB; 

    
    if(IScollided(current_player_X,player_sizeX, current_player_Y, player_sizeY, "underwater")[0]){
        return true;
        
    }
    else{
        return false;
    }   

}
