<?php 
require "../assets/phpcomponents/validateANDclean.php"; //this fucking script made me waste a fucking long of fucking time
//REMEMBER to add it for fucks sake

$data_storage_loc = "../ServerData/1.json";

//API php
ini_set ('display_errors', 1); 
ini_set ('display_startup_errors', 1); 
error_reporting (E_ALL); 


header('Content-Type: application/json');

//init
$post_commands = ["create_data_storage", "add_server","remove_server", "timing_control"];
$get_commands = ["is_data_present", "get_timing", "get_server_data", "get_all_server_data"];

function DataOperation($operation, $json_data){
    if($operation == "read"){
        //read from data

        $json = file_get_contents($data_storage_loc); 
        $json_data = json_decode($json,true); 
        return $json_data;
    }
    else if($operation == "write"){
        //write brand new data to json file
        $json_data_encoded = json_encode($json_data); 
        file_put_contents($data_storage_loc, $json_data_encoded);
        
    }
    else if($operation == "create"){
        //create a completely new json file
        
    }
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $bodyContent = file_get_contents('php://input');   
    //get json from post

    if(validateJson($bodyContent)){
        $UserRequest = json_decode($bodyContent, true);
        //validate json

        if(array_key_exists("get",$UserRequest)){

            //process get commands
            if(array_key_exists($get_commands[0], $UserRequest)){
                //is_data_present // check if data storage is there
                $json_data = DataOperation("read");
                if()


            }

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