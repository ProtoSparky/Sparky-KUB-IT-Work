<?php
$possible_get = ["get_server"];
$possible_post = ["add_server", "remove_server"]; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $bodyContent = file_get_contents('php://input'); 

    
    if(validateJson($bodyContent)){
        $UserRequest = json_decode($bodyContent, true);
        //validate json

        if(array_key_exists("get",$UserRequest)){
            //get data from api
        }
        else if(array_key_exists("post",$UserRequest)){
            //send data to api
        }
        else{
            ShowError(0);
        }

    }
    
}
else{
    print("this is a server api. Use POST");
}

//Erros 
$JSON_error_invalid = array(
    "ERROR"=>0,
    "ERROR0"=>"The JSON comand/s is invalid or not supported by my code"
);
$JSON_error_keyMissing = array(
    "ERROR"=>1,
    "ERROR0"=>"an api key is required for this operation"
);

function ShowError($input){
    if($input == 0){
        echo json_encode($JSON_error_invalid); 
        ShowError(400); // Bad Request
    }
    else if($input == 1){
        echo json_encode($JSON_error_keyMissing);
        http_response_code(401); // Unauthorized
    }
}

?>