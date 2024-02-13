<?php

// Database credentials
$dbhost = 'localhost';
$dbname = 'hotel_db';
$dbuser = 'root';
$dbpass = '';

try {
    $pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create the 'rooms' table if it doesn't exist
    $sql = "CREATE TABLE IF NOT EXISTS rooms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        room_number INT NOT NULL,
        available BOOLEAN DEFAULT FALSE,
        room_owner VARCHAR(255),
        dirty BOOLEAN DEFAULT FALSE
    )";
    $pdo->exec($sql);

    // Populate the 'rooms' table with sample data
    $insertSql = "INSERT INTO rooms (room_number, available) VALUES (:room_number, :available)";
    $insertStmt = $pdo->prepare($insertSql);

    // Sample data
    $sampleRooms = [
        ['room_number' =>  101, 'available' => true],
        ['room_number' =>  102, 'available' => false, 'room_owner' => 'John Doe'],
        ['room_number' =>  103, 'available' => true]
    ];

    foreach ($sampleRooms as $room) {
        $insertStmt->execute($room);
    }

    // Rest of the code follows...

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>