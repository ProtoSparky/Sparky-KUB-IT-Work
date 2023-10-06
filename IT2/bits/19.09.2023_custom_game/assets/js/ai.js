//ai_class = class name for ai object | ai_class_id = array key for ai class. Top most ai object will have arr key 0
function MoveAi(ai_class, ai_class_id){
    const ai_speed = 45;
    const ai_speed_adder = 10; //Encourages ai to use entire display
    //Get pos
    object = document.getElementsByClassName(ai_class);
    const current_object_X = parseInt(object[ai_class_id].offsetLeft);
    const current_object_Y = parseInt(object[ai_class_id].offsetTop);
    const current_object_X_W = parseInt(object[ai_class_id].offsetWidth);
    const current_object_Y_H = parseInt(object[ai_class_id].offsetHeight);
    const current_object_X_IW = current_object_X + current_object_X_W;
    const current_object_Y_FB = current_object_Y + current_object_Y_H;

    const pos_offsetX = RandomRangedIntiger(- ai_speed - ai_speed_adder, ai_speed + ai_speed_adder);
    const pos_offsetY = RandomRangedIntiger(- ai_speed, ai_speed); 
    const neg_pos_offset = RandomRangedIntiger(- ai_speed, 0); 
    //Generate new location offset;

    
    

   //If nothing is hitting
    if (!IScollided(current_object_X,current_object_X_W, current_object_Y - ai_speed, current_object_Y_H, "col_mesh")[0] && !IScollided(current_object_X,current_object_X_W, current_object_Y + ai_speed, current_object_Y_H, "col_mesh")[4] && !IScollided(current_object_X + (ai_speed + 10),current_object_X_W, current_object_Y, current_object_Y_H, "col_mesh")[2] && !IScollided(current_object_X - ai_speed,current_object_X_W, current_object_Y, current_object_Y_H, "col_mesh")[1]){
        object[ai_class_id].style.left = (current_object_X + pos_offsetX);
        object[ai_class_id].style.top = (current_object_Y + pos_offsetY);  
    }
    else if(IScollided(current_object_X,current_object_X_W, current_object_Y - ai_speed, current_object_Y_H, "col_mesh")[0]){
        object[ai_class_id].style.top = (current_object_Y - neg_pos_offset);         
    }
    else if(IScollided(current_object_X,current_object_X_W, current_object_Y + ai_speed, current_object_Y_H, "col_mesh")[4]){
        object[ai_class_id].style.top = (current_object_Y + neg_pos_offset); 
        
    }
    else if(IScollided(current_object_X + (ai_speed + 10),current_object_X_W, current_object_Y, current_object_Y_H, "col_mesh")[2]){
        object[ai_class_id].style.left = (current_object_X - ai_speed);
        
    }
    else if (IScollided(current_object_X - (ai_speed + 10),current_object_X_W, current_object_Y, current_object_Y_H, "col_mesh")[1]){
        object[ai_class_id].style.left = (current_object_X + ai_speed);
    } 


}
function AiAmount(ai_class){
    object = document.getElementsByClassName(ai_class);
    return object.length; 
}