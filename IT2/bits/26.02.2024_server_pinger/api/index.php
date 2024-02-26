<?php 
require "../assets/phpcomponents/validateANDclean.php"; //this fucking script made me waste a fucking long of fucking time
//REMEMBER to add it for fucks sake

//API php
ini_set ('display_errors', 1); 
ini_set ('display_startup_errors', 1); 
error_reporting (E_ALL); 


header('Content-Type: application/json');

//init

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $bodyContent = file_get_contents('php://input');   
    //get json from post

    if(validateJson($bodyContent)){
        $UserRequest = json_decode($bodyContent, true);
        //validate json

        if(array_key_exists("get",$UserRequest)){
            //process get commands

        }
        else if(array_key_exists("post",$UserRequest)){
            //process post commands
        }

        echo json_encode($UserRequest);
    }
}
else{
    ShowError(3); 
}

function ShowError($input){
    // Ensure the response is always JSON
    header('Content-Type: application/json');

    $JSON_error_invalid = array(
        "ERROR"=>0,
        "ERROR0"=>"The JSON command/s is invalid or not supported by my code"
    );
    $JSON_error_keyMissing = array(
        "ERROR"=>1,
        "ERROR0"=>"An API key is required for this operation"
    );
    $JSON_error_NotImplemented = array(
        "ERROR"=>-1,
        "ERROR0"=>"This feature is not implemented"
    );
    $JSON_Info = array(
        "INFO"=>"This is a server API. Use POST!"
    );

    $response = array();
    if($input ==  0){
        $response = $JSON_error_invalid;
    }
    else if($input ==  1){
        $response = $JSON_error_keyMissing;
    }
    else if($input ==  2){
        $response = $JSON_error_NotImplemented;
    }
    else if($input ==  3){
        $response = $JSON_Info;
    }

    // Always return a JSON response
    echo json_encode($response);
    http_response_code(400); // Set the appropriate HTTP response code
}

?>