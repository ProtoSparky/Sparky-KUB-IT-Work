<?php
ini_set ('display_errors', 1); 
ini_set ('display_startup_errors', 1); 
error_reporting (E_ALL); 
//clean data from input
function CleanData($text) {
    // Remove leading and trailing whitespaces
    $text = trim($text);
    // Convert special characters to HTML entities
    $sanitizedText = htmlspecialchars($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    // Sanitize for JavaScript execution
    $sanitizedText = str_replace(array("\r", "\n", '</script>', '<script>'), '', $sanitizedText);
    return $sanitizedText;
}

function validateJson($str) {
    json_decode($str);
    if(json_last_error() == JSON_ERROR_NONE){
        return true;
    }
    else{
        return false;
    }
}

?>