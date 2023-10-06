//ai_class = class name for ai object | ai_class_id = array key for ai class. Top most ai object will have arr key 0
function MoveAi(ai_class, ai_class_id){
    const ai_speed = 45;
    const ai_speed_adder = 20; //Encourages ai to use entire display
    //Get pos
    object = document.getElementsByClassName(ai_class);
    const current_object_X = parseInt(object[ai_class_id].offsetLeft);
    const current_object_Y = parseInt(object[ai_class_id].offsetTop);
    const current_object_X_W = parseInt(object[ai_class_id].offsetWidth);
    const current_object_Y_H = parseInt(object[ai_class_id].offsetHeight);
    const current_object_X_IW = current_object_X + current_object_X_W;
    const current_object_Y_FB = current_object_Y + current_object_Y_H;

    const pos_offsetX = RandomRangedIntiger(- ai_speed, ai_speed + ai_speed_adder);
    const pos_offsetY = RandomRangedIntiger(- ai_speed, ai_speed); 
    //Generate new location offset;

    
    


    if (!IScollided(current_object_X + (ai_speed + ai_speed_adder), current_object_X_W,  current_object_Y + (ai_speed) ,current_object_Y_H, "col_mesh")[0]){
        object[ai_class_id].style.left = (current_object_X + pos_offsetX);
        object[ai_class_id].style.top = (current_object_Y + pos_offsetY);  
    }


   


}