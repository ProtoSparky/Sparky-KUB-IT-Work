<?php
ini_set ('display_errors', 1); 
ini_set ('display_startup_errors', 1); 
error_reporting (E_ALL); 

function DataOperation($operation, $json_data){
    $data_storage_loc = "./ServerData/1.json";
    if($operation == "read"){
        //read from data
        $json = @file_get_contents($data_storage_loc);

        if ($json === false) {
            // File does not exist or could not be read, return null
            return array("file_exists"=>0);
        }
        
        $json_data = json_decode($json, true);
        return $json_data;
    }
    else if($operation == "write"){
        //write brand new data to json file
        $json_data_encoded = json_encode($json_data); 
        file_put_contents($data_storage_loc, $json_data_encoded);
        
    }
}
print_r(DataOperation("read", "0")); 

?>