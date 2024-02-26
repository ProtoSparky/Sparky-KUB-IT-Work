<?php

// Your data to be sent as JSON
$data = array(
    "userID" => "a7664093-502e-4d2b-bf30-25a2b26d6021",
    "itemKind" =>  0,
    "value" =>  1,
    "description" => "Saude",
    "itemID" => "03e76d0a-8bab-11e0-8250-000c29b481aa"
);

// The URL to which you want to send the POST request
$url = "http://localhost/Sparky-KUB-IT-Work/IT2/bits/26.02.2024_server_pinger/api/";

// Encode the data as JSON
$content = json_encode($data);

// Initialize cURL
$curl = curl_init($url);

// Set cURL options
curl_setopt($curl, CURLOPT_HEADER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-type: application/json"));
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

// Execute the cURL request and get the response
$json_response = curl_exec($curl);

// Check the HTTP status code
$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

// Close the cURL session
curl_close($curl);

// Decode the JSON response
$response = json_decode($json_response, true);

// Output the response
echo $json_response;

?>