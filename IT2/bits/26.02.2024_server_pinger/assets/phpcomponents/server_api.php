<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $bodyContent = file_get_contents('php://input'); 

}

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