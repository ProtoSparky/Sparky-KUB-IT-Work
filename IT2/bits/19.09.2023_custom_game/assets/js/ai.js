//ai_class = class name for ai object | ai_class_id = array key for ai class. Top most ai object will have arr key 0
function MoveAi(ai_class, ai_class_id){
    const ai_speed = 50;
    //Get pos
    object = document.getElementsByClassName(ai_class);
    const current_object_X = parseInt(object[ai_class_id].offsetLeft);
    const current_object_Y = parseInt(object[ai_class_id].offsetTop);
    const current_object_X_W = parseInt(object[ai_class_id].offsetWidth);
    const current_object_Y_H = parseInt(object[ai_class_id].offsetHeight);
    const current_object_X_IW = current_object_X + current_object_X_W;
    const current_object_Y_FB = current_object_Y + current_object_Y_H;
    const coin_flipX = RandomRangedIntiger(1,2);
    const coin_flipY = RandomRangedIntiger(1,2);


    let pos_offsetX = 0;
    let pos_offsetY = 0;

    if(coin_flipX == 1){
        pos_offsetX = RandomRangedIntiger(0, ai_speed);
    }
    else{
        pos_offsetX = RandomRangedIntiger(-ai_speed, 0);
    }

    if(coin_flipY == 1){
        pos_offsetY = RandomRangedIntiger(0, ai_speed);
    }
    else{
        pos_offsetY = RandomRangedIntiger(-ai_speed, 0);
    }

    //pos_offsetX = RandomRangedIntiger(- ai_speed - ai_speed_adder, ai_speed + ai_speed_adder);
    //pos_offsetY = RandomRangedIntiger(- ai_speed, ai_speed); 
    const neg_pos_offset = RandomRangedIntiger(- ai_speed, 0); 
    //Generate new location offset;

    
    

   //If nothing is hitting
    if (!IScollided(current_object_X,current_object_X_W, current_object_Y - ai_speed, current_object_Y_H, "col_mesh")[ClassIndexLookup("sea","col_mesh")] && !IScollided(current_object_X,current_object_X_W, current_object_Y + ai_speed, current_object_Y_H, "col_mesh")[ClassIndexLookup("GameWallBottom","col_mesh")] && !IScollided(current_object_X + (ai_speed + 10),current_object_X_W, current_object_Y, current_object_Y_H, "col_mesh")[ClassIndexLookup("GameWallRight","col_mesh")] && !IScollided(current_object_X - ai_speed,current_object_X_W, current_object_Y, current_object_Y_H, "col_mesh")[ClassIndexLookup("GameWallLeft","col_mesh")]){
        object[ai_class_id].style.left = (current_object_X + pos_offsetX);
        object[ai_class_id].style.top = (current_object_Y + pos_offsetY);  
    }
    else if(IScollided(current_object_X,current_object_X_W, current_object_Y - ai_speed, current_object_Y_H, "col_mesh")[ClassIndexLookup("sea","col_mesh")]){
        object[ai_class_id].style.top = (current_object_Y - neg_pos_offset);         
    }
    else if(IScollided(current_object_X,current_object_X_W, current_object_Y + ai_speed, current_object_Y_H, "col_mesh")[ClassIndexLookup("GameWallBottom","col_mesh")]){
        object[ai_class_id].style.top = (current_object_Y + neg_pos_offset); 
        
    }
    else if(IScollided(current_object_X + (ai_speed + 10),current_object_X_W, current_object_Y, current_object_Y_H, "col_mesh")[ClassIndexLookup("GameWallRight","col_mesh")]){
        object[ai_class_id].style.left = (current_object_X - ai_speed);
        
    }
    else if (IScollided(current_object_X - (ai_speed + 10),current_object_X_W, current_object_Y, current_object_Y_H, "col_mesh")[ClassIndexLookup("GameWallLeft","col_mesh")]){
        object[ai_class_id].style.left = (current_object_X + ai_speed);
    } 


}
function ClassIndexLength(class_id){
    object = document.getElementsByClassName(class_id);
    return object.length; 
}

// counts how many times funtion has been run, returns true after given amount
function Counter(ReturnAfterRuns) {
    let count = 0;  
    return function () {
        count++;

        if (count >= ReturnAfterRuns) {
        count = 0; 
        return true;
        }

        return false;
    };
}