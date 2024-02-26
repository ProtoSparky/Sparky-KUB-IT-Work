<?php
// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the raw POST data
    $postData = file_get_contents('php://input');

    // Check if the POST data is not empty
    if (!empty($postData)) {
        // Assuming the API should echo back the received JSON data
        // You can replace this with your actual API logic
        echo $postData;
    } else {
        // If no data is received, respond with an error message
        header('Content-Type: application/json');
        echo json_encode(array("error" => "No data received"));
    }
} else {
    // If the request method is not POST, respond with an error message
    header('Content-Type: application/json');
    echo json_encode(array("error" => "Invalid request method"));
}
?>