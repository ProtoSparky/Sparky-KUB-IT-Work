<?php 
require "../assets/phpcomponents/validateANDclean.php"; //this fucking script made me waste a fucking long of fucking time
//REMEMBER to add it for fucks sake

$data_storage_loc = "../ServerData/1.json";

//API php
ini_set('display_errors',   1);
ini_set('display_startup_errors',   1);
error_reporting(E_ALL);

header('Content-Type: application/json');

// Define a custom error handler
function customErrorHandler($errno, $errstr, $errfile, $errline) {
    // Prepare the error message
    $errorMessage = "Error: [$errno] $errstr\n";
    $errorMessage .= "File: $errfile\n";
    $errorMessage .= "Line: $errline\n";
    $errorMessage .= "Date: " . date("Y-m-d H:i:s") . "\n";

    // Define the error file path
    $errorFilePath = __DIR__ . '/error_log.txt';

    // Write the error message to the error file
    //file_put_contents($errorFilePath, $errorMessage, FILE_APPEND); remove error writing to file

    // Prepare the error response
    $errorResponse = array(
        "error" => array(
            "type" => $errno,
            "message" => $errstr,
            "file" => $errfile,
            "line" => $errline
        )
    );

    // Output the error response as JSON
    echo json_encode($errorResponse);

    // Terminate the script
    exit;
}

// Set the custom error handler
set_error_handler("customErrorHandler");


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//init


function DataOperation($operation, $json_data){
    $data_storage_loc = "../ServerData/1.json";
    if($operation == "read"){
        if (file_exists($data_storage_loc)) {
            // File exists, proceed to read its contents
            $json = @file_get_contents($data_storage_loc);
        
            if ($json === false) {
                // File does not exist or could not be read, return null
                return array("file_exists"=>0);
            }
            
            $json_data = json_decode($json, true);
            return $json_data;
        } else {
            // File does not exist, return the specified array
            return array("file_exists"=>0);
        }
    }
    else if($operation == "write"){
        //write brand new data to json file
        $json_data_encoded = json_encode($json_data); 
        file_put_contents($data_storage_loc, $json_data_encoded);
        
    }
}


//$post_commands = ["create_data_storage", "add_server","remove_server", "timing_control"];
//$get_commands = ["is_data_present", "get_timing", "get_server_data", "get_all_server_data"];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $bodyContent = file_get_contents('php://input');   
    //get json from post

    if(validateJson($bodyContent)){
        $UserRequest = json_decode($bodyContent, true);
        //validate json
        if(array_key_exists("get",$UserRequest)){
            //process get commands

            
            if(in_array("is_data_present", $UserRequest["get"])){
                //is_data_present // check if data storage is there
                $json_data = DataOperation("read",null);                
                $file_exists = $json_data['file_exists'];
                $returned_json = array("is_data_present" => $file_exists);
                echo json_encode($returned_json);
            }
            else{
                //echo ($bodyContent);
                ShowError(0);
            }
            

        }
        else if(array_key_exists("post",$UserRequest)){
            //process post commands
            if(in_array("create_data_storage", $UserRequest["post"])){
                $json_data = array("is_data_present" => 1, array())
                DataOperation("write",$json_data);   
            }
        }
    }
    else{
        ShowError(0); 
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
}


?>