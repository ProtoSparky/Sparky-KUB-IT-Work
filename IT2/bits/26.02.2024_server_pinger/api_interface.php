<?php
// Specify the API link
$apiLink = './api';

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the JSON from the form
    $jsonInput = $_POST['jsonInput'];

    // Prepare the POST request
    $ch = curl_init($apiLink);
    curl_setopt($ch, CURLOPT_POST,  1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonInput);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

    // Execute the POST request
    $response = curl_exec($ch);

    // Close the cURL session
    curl_close($ch);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JSON Input and API Request</title>
</head>
<body>
    <form method="post" action="">
        <label for="jsonInput">Enter JSON:</label><br>
        <textarea id="jsonInput" name="jsonInput" rows="10" cols="50"></textarea><br>
        <input type="submit" value="Submit">
    </form>

    <?php if (isset($response)): ?>
        <div>
            <h3>API Response:</h3>
            <pre><?php echo htmlspecialchars($response); ?></pre>
        </div>
    <?php endif; ?>
</body>
</html>
<?php

?>
