const API_LINK = window.location + "api/index.php";
function init(){
    Send2API();

}


function Send2API(){
    const query = {
        "get":[
            "is_data_present"
        ]
    };

    fetch(API_LINK, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    })
    //.then(response=> console.log(response)); 
    .then(response => response.json())
    .then(data => ParseAPI(data));
}
function ParseAPI(data){
    console.log(data); 
}