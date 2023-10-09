function SummonSnow(snow_amount){
    const SnowAreaElement = document.getElementById("gameframe");
    for(let snow_pointer = 0; snow_pointer < snow_amount; snow_pointer ++ ){
        let snow_area = window.innerWidth;
        let snow_x = RandomRangedIntiger(0, snow_area);
        //summon snow
        const snow = document.createElement("div");
        const CurrentSnowID = "snow" + snow_pointer; 
        snow.id = CurrentSnowID;
        snow.className = "snowflake";
        SnowAreaElement.append(snow);
        //set snow flake loc
        const currentSnow = document.getElementById(CurrentSnowID);
        currentSnow.style.left = snow_x;        
    }
    SnowFall();
}

function SnowFall(){
    const CurrentSnow = document.getElementsByClassName("snowflake");
    const CurrentSnowLength = CurrentSnow.length; 
    console.log(CurrentSnowLength);
    

}