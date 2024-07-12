var eksempel;
var ordfoerereSum = 0;
var antallTallgrunnlag = 0;
var tallgrunnlag = [];
var elementVerdi;
var sektorGrader;

function DrawSector(Data){
    const DataSize = Data.length;
    const DataHeader = Data[0];    
    let SectorData = [];
    let ColorData = [];

    const ListArea = document.getElementById("list"); 
    for(let DataPointer = 1; DataPointer < DataSize; DataPointer++){
        const CurrentData = Data[DataPointer];
        const CurrentPartyName = CurrentData[0];
        const CurrentRepresentAmount = parseInt(CurrentData[1]); 

        let RandColor; 
        if(CurrentData[3] != undefined){
            RandColor = CurrentData[3];
        }
        else{
            RandColor = RandCol(); 
        }

        let obj = {element:CurrentPartyName , ordfoerere: CurrentRepresentAmount, fyllfarge: RandColor};
        SectorData.push(obj); 

        const ListItem  = document.createElement("div");
        ListItem.id="list_" + DataPointer; 
        ListItem.style.width = "200px";
        ListItem.style.height = "40px";
        ListItem.style.position = "absolute";
        ListItem.style.top = 40 * DataPointer + "px";


        const ListName = document.createElement("div");
        ListName.innerHTML = CurrentPartyName;

        ListArea.appendChild(ListItem);
        ListItem.appendChild(ListName);
        const ListColor = document.createElement("div");
        ListColor.style.backgroundColor = RandColor;
        ListColor.style.top ="0px";
        ListColor.style.width = "20px";
        ListColor.style.height = "20px";
        ListColor.style.position = "absolute";
        ListColor.style.left= CurrentPartyName.length + 15 * 10 + "px";
        ListItem.appendChild(ListColor);

        ColorData[DataPointer] = RandColor;


    }
    //summon bar graph
    SpawnGraph(Data,ColorData); 

    eksempel = document.querySelector("canvas").getContext("2d");
    //Array med navngitte attributter.
    tallgrunnlag = SectorData;
    console.log(SectorData);
    /*
    tallgrunnlag = [
        {element: "Arbeiderpartiet", ordfoerere: 111, fyllfarge: "#FF0000"},
        {element: "H�yre", ordfoerere: 102, fyllfarge: "#00FF00"},
        {element: "Senterpartiet", ordfoerere:87, fyllfarge: "#FFFF00"},
        {element: "Frp", ordfoerere: 14, fyllfarge: "#0000FF"},
        {element: "Krf", ordfoerere: 12, fyllfarge: "#00FFFF"}
    ];
    */
    
    antallTallgrunnlag = tallgrunnlag.length;
    
    for (var x=0; x<antallTallgrunnlag; x++){
        ordfoerereSum += tallgrunnlag [x]['ordfoerere'];
    }
    console.log(ordfoerereSum);
    
    var sumGrader = 0;
    
    for (elementVerdi of tallgrunnlag) {
        //Beregner antall grader p�gjeldende sektor vil ha av hele sektordiagrammet.
        var sektorGrader = (elementVerdi.ordfoerere / ordfoerereSum) * 2 * Math.PI;
        //console.log("sektor "+elementVerdi['element']+" er "+sektorGrader);
        //tegne et sirkelstykke og en linje fra sirkelstykke til senter for � avdele sektor.
        eksempel.beginPath();
        //xxx.arc(x-koordinat for senter, y-koordiant for senter, radius, startgradtall, sluttgradtall)
        eksempel.arc(100, 100, 100, sumGrader, sumGrader + sektorGrader);
        sumGrader += sektorGrader;
        //trekker en rett linje til senter.
        eksempel.lineTo(100, 100);
        //fyll sektor med farge som er angitt.
        eksempel.fillStyle = elementVerdi.fyllfarge;
        eksempel.fill();
    }
}
