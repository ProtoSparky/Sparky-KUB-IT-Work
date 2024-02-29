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
                return array("is_data_present"=>0);
            }
            
            $json_data = json_decode($json, true);
            return $json_data;
        } else {
            // File does not exist, return the specified array
            return array("is_data_present"=>0);
        }
    }
    else if($operation == "write"){
        //write brand new data to json file
        //$json_data_encoded = json_encode($json_data); this function does not make json pretty. Replaced one with prettyness
        //$json_data_encoded = json_encode($json_data, JSON_PRETTY_PRINT); fix excaped character issue on links
        $json_data_encoded = json_encode($json_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);  
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
                $file_exists = $json_data['is_data_present'];
                $returned_json = array("is_data_present" => $file_exists);
                echo json_encode($returned_json);
            }
            elseif(in_array("get_timing", $UserRequest["get"])){
                //get backend and frontend timing
                $json_data = DataOperation("read",null);
                $timing = $json_data["settings"]["update_timing"];
                echo json_encode($timing);
            }
            elseif(in_array("get_ping_history", $UserRequest["get"])){
                //get backend and frontend timing
                $json_data = DataOperation("read",null);
                $timing = $json_data["settings"]["backend"]["ping_history"];
                echo json_encode($timing);
            }
            elseif(isset($UserRequest["get"]['get_server_data'])){
                //get data for specific server
                $api_data = $UserRequest["get"]['get_server_data'];
                $json_data_read = DataOperation("read",null); 
                $server_data = $json_data_read["servers"][$api_data];
                if(array_key_exists($api_data,$json_data_read["servers"])){ //fix a bug here. API bugs out if key deos not exist
                    echo json_encode($server_data);
                }
                else{
                    ShowResponse(400);
                }
            }
            elseif(in_array("get_all_server_data", $UserRequest["get"])){
                //get all data for servers
                $json_data_read = DataOperation("read",null); 
                echo json_encode($json_data_read["servers"]);
            }
            elseif(in_array("get_server_names", $UserRequest["get"])){
                //this gets all names for all servers
                $json_data_read = DataOperation("read",null); 
                $server_data = $json_data_read["servers"];
                $server_names = array_keys($server_data);
                echo json_encode($server_names);
            }
            else{
                //echo ($bodyContent);
                ShowResponse(0);
            }
            

        }
        else if(array_key_exists("post",$UserRequest)){
            //process post commands
            if(in_array("create_data_storage", $UserRequest["post"])){
                //create file storage (json)
                $json_data = array(
                    "is_data_present" =>  1,
                    "settings" => array(
                        "update_timing" =>10,
                        "client_settings" =>new stdClass(),
                        "backend" => array(
                            "backend_lastrun" =>null,
                            "ping_history"=>10,
                        )
                    ),
                    "servers" => new stdClass()
                );
                DataOperation("write",$json_data);   

                //verify file creation
                
                $json_data_read = DataOperation("read",null);                
                $file_exists = $json_data_read['is_data_present'];
                $returned_json = array("is_data_present" => $file_exists);
                //echo json_encode($returned_json);
                ShowResponse(200);
                
            }
            elseif(isset($UserRequest["post"]['add_server'])){ //clean this up for other functions
                //add a server to the json file

                $api_data = $UserRequest["post"]['add_server'];
                $json_data_read = DataOperation("read",null); 
                $server_id = "srv".generateRandomNumber(9);
                
                $modified_json = array(
                    $server_id => array( //this can lead to bugs as the random number may not be so random
                        "nickname" => $api_data["servername"],
                        "domain" => $api_data["domain"],
                        "enabled" => $api_data["enabled"],
                        "alive" => $api_data["alive"],
                        "ping_status" =>null,
                        "ping" => array(
                            "history" =>array(),
                        ),
                    )
                );
                $json_data_read["servers"] = array_merge($json_data_read["servers"], $modified_json); //merge two arrays
                DataOperation("write",$json_data_read); 
                //echo json_encode($json_data_read); //return something more properly
                ShowResponse(200);
            }
            elseif(isset($UserRequest["post"]['remove_server'])){
                //remove a specific server from the list
                $api_data = $UserRequest["post"]['remove_server'];
                $json_data_read = DataOperation("read",null); 
                unset($json_data_read['servers'][$api_data["servername"]]); 
                DataOperation("write",$json_data_read); 
                ShowResponse(200);
                //echo json_encode($json_data_read);
            }
            elseif(isset($UserRequest["post"]['timing_control'])){
                //change timing of pings
                $api_data = $UserRequest["post"]['timing_control'];
                $json_data_read = DataOperation("read",null); 
                if($api_data > 0.9 && $api_data < 101){
                    //prevent users from blocking backend with wait commands
                    $json_data_read["settings"]["update_timing"] = $api_data;
                    DataOperation("write",$json_data_read); 
                    //echo json_encode($json_data_read);
                    ShowResponse(200);
                }
                else{
                    ShowResponse(400);
                }
            }
            elseif(isset($UserRequest["post"]['ping_history'])){
                //change history of pings
                $api_data = $UserRequest["post"]['ping_history'];
                $json_data_read = DataOperation("read",null); 
                if($api_data > 2 && $api_data < 401){
                    //prevent users from blocking backend with wait commands
                    $json_data_read["settings"]["backend"]["ping_history"] = $api_data;
                    DataOperation("write",$json_data_read); 
                    //echo json_encode($json_data_read);
                    ShowResponse(200);
                }
                else{
                    ShowResponse(400);
                }
            }
        }
    }
    else{
        ShowResponse(0); 
    }
}
else{
    ShowResponse(3); 
}

function ShowResponse($input){
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
    $JSON_ok = array(
        "RETURN"=>"OK"
    );
    $JSON_not_ok = array(
        "RETURN"=>"ERROR"
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
    else if($input ==  200){
        $response = $JSON_ok;
    }
    else if($input ==  400){
        $response = $JSON_not_ok;
    }
    // Always return a JSON response
    echo json_encode($response);
}

function generateRandomNumber($length) {
    $min = pow(10, $length -  1);
    $max = pow(10, $length) -  1;
    return mt_rand($min, $max);
}

?>