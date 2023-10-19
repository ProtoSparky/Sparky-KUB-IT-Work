var Table = [
    [ 
        [
            "0",    //Table id
            "",     //Custom css for entire table
            "1A",   //Table caption



        ], 
        //Table 1
        [
            //Row0
            ["   "/*Data*/, false /*Treat innerHTML*/,"background-style:red;" /*Custom css*/],
            ["Monday"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],   
            ["Tuesday"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/], 
            ["Wednsday"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/], 
            ["Fhursday"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/], 
            ["Friday"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],      
        
        ], 
        [
            //Row1
            ["08:00 - 10:00"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],
            ["Mon R1"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],  
            ["Tue R1"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/], 
            ["Wed R1"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],      
            ["Thur R1"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],      
            ["Fri R1"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],  
        ],
        [
            //Row2
            ["10:00 - 12:00"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],
            ["Mon R2"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],  
            ["Tue R2"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/], 
            ["Wed R2"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],      
            ["Thur R2"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],      
            ["Fri R2"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],  
        ],
        [
            //Row3
            ["Lunch "/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],
            [" "/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],  
            [" "/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/], 
            [" "/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],      
            [" "/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],      
            [" "/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],  
        ],
        [
            //Row4
            ["13:30 - 14-30"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],
            ["Mon R3"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],  
            ["Tue R3"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/], 
            ["Wed R3"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],      
            ["Thur R3"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],      
            ["Fri R3"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],  
        ],
        [
            //Row5
            ["14:30 - 16:00"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],
            ["Mon R4"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],  
            ["Tue R4"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/], 
            ["Wed R4"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],      
            ["Thur R4"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],      
            ["Fri R4"/*Data*/, false /*Treat innerHTML*/,"" /*Custom css*/],  
        ],


        


    ],



];


var tableMetadata = [
    "TableArea", /* Summon table within this div id*/
    "Table01", /*Summoned table ID*/
    "Table",/*Summoned table Class*/
];

function SpawnTable(TableData, TableMetaData ){
    /*
    !Table specific Metadata!
    TableData[0][0] | Table id. Can be used to locate table if pointers in for loop are offset
    TableData[0][1] | Load custom css on entire table
    !Table specific Metadata!

    !Data!
    TableData[1][0][0] | first key used to identify row. Row 0 used for table metadata
    TableData[0][1][0] | second key used to load specific column (["14:30 - 16:00" Datafalse, false Treat innerHTML,"" Custom css])
    TableData[0][0][1] | 3rd key used to select data within specifi column
    !Data!

    !Table spawn data!
    TableMetaData[0] | Div id for where table should be summoned
    TableMetaData[1] | Table div id
    TableMetaData[2] | Table div class
    !Table spawn data!
    */



    //Summon <table> element
    const RootTableElement = document.getElementById(TableMetaData[0]); 
    const TableElement = document.createElement("table");
    TableElement.id = TableMetaData[1];
    TableElement.className = TableMetaData[2];    
    RootTableElement.appendChild(TableElement);
    CssArr2style(TableMetaData[0], ["background-color:red;","color:blue;"]);
    //Summon <table> element




}

function runINIT(){
    SpawnTable(Table[0],tableMetadata);
}

function CssArr2style(DocumetObject, StyleArr) {
    // Import array of CSS styles to a document object
    const currentObject = document.getElementById(DocumetObject);
    for (let StylePointer = 0; StylePointer < StyleArr.length; StylePointer++) {
        const { property, value } = StyleArr[StylePointer];        
        currentObject.style[property] = value;
    }
}
