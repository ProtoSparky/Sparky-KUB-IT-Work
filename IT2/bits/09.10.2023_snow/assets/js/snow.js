
function SummonSnow(snow_amount){
    const SnowAreaElement = document.getElementById("gameframe");
    for(let snow_pointer = 0; snow_pointer < snow_amount; snow_pointer ++ ){
        let flakeAmount = parseInt(document.getElementsByClassName("snowflake").length);
        let snow_area = window.innerWidth - 2;
        let snow_x = RandomRangedIntiger(0, snow_area);
        //summon snow
        const snow = document.createElement("div");
        const CurrentSnowNumber = snow_pointer;
        const CurrentSnowID = "snow" + CurrentSnowNumber;
        snow.id = CurrentSnowID;
        snow.className = "snowflake";
        SnowAreaElement.append(snow);
        //set snow flake loc
        const currentSnow = document.getElementById(CurrentSnowID);
        currentSnow.style.left = snow_x;          
        let snow_fall_time = RandomRangedIntiger(5,50);        
        currentSnow.style.transition = snow_fall_time + "s";        
    }
}

function SnowFall(){
    const CurrentSnow = document.getElementsByClassName("snowflake");
    const CurrentSnowLength = CurrentSnow.length; 
    for(let snow_pointer = 0; snow_pointer < CurrentSnowLength; snow_pointer ++){
        CurrentSnow[snow_pointer].style.top = window.innerHeight- 2;
    }

}

function CheckForVoid(){
    const CurrentSnow = document.getElementsByClassName("snowflake");
    const CurrentSnowLength = CurrentSnow.length; 
    
    for(let snow_pointer = 0; snow_pointer < CurrentSnowLength; snow_pointer ++){
        //console.log(SnowTillBottom[snow_pointer]);
        let CurrentSnowFlake = CurrentSnow[snow_pointer];   
        let snow_id = ClassIndexToId("snowflake",snow_pointer) 
        let snowflakeID = document.getElementById(snow_id);    
        if(IScollided(CurrentSnowFlake.offsetLeft,2, CurrentSnowFlake.offsetTop, 2, "col_mesh")[ClassIndexLookup("despawn_mesh", "col_mesh")]){
            snowflakeID.style.transition = 0;
            snowflakeID.style.top = 100;     
                    
            
    
            
        }
    
    }
}