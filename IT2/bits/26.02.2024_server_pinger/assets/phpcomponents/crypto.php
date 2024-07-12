<?php
/*this file contains:

* functions for encrypting and decrypting text
* functions for encrypting and decrypting api keys
* functions for generating api keys

*/

$DBKEY = "z:gbsp>[&xkUeC1}<XVu{8R%m2?40Sic@iH2|g2Lwp6U[@ud}Z";
$DBIV = "kYe}U0K>q_nOcero";
function encryptData($data, $key, $iv) {
    $ciphering = "AES-256-CTR";
    $encryption = openssl_encrypt($data, $ciphering, $key, 0, $iv);
    return $encryption;
}
function decryptData($data, $key, $iv) {
    $ciphering = "AES-256-CTR";
    $decryption = openssl_decrypt($data, $ciphering, $key, 0, $iv);
    return $decryption;
}

function APIencrypt($data){
    $DBKEY = "{@YhxqU7tPye3&a8hqWe7QJAooGS>7iujX1Fj6NBt#F]YUn&9h";
    $DBIV = "YL0@u:Y1O!fH{2o9";
    $ciphering = "AES-128-CTR";
    $encryption = openssl_encrypt($data, $ciphering, $DBKEY, 0, $DBIV);
    return $encryption;
}
function APIdecrypt($data) {
    $DBKEY = "{@YhxqU7tPye3&a8hqWe7QJAooGS>7iujX1Fj6NBt#F]YUn&9h";
    $DBIV = "YL0@u:Y1O!fH{2o9";
    $ciphering = "AES-128-CTR";
    $decryption = openssl_decrypt($data, $ciphering, $DBKEY, 0, $DBIV);
    return $decryption;
}

function GenerateAPIkey($EncryptedUsername){
    $key = array(
        "username" => $EncryptedUsername,
        "key"=> md5(rand())
    ); 
    return APIencrypt(json_encode($key));
}

?>