<?php

// Assuming PDO connection is established as $pdo

function customer() {
    echo "Show rooms available for customers,\nCancel customer purchase,\nReserve room for customer\n";
    echo "Available commands: show_rooms, cancel, reserve\n";
    $user_input = trim(fgets(STDIN)); // Read user input from command line

    switch ($user_input) {
        case 'show_rooms':
            $stmt = $pdo->query('SELECT * FROM rooms WHERE available IS true');
            $rooms_available = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo "Currently available rooms:\n";
            print_r($rooms_available);
            customer();
            break;
        case 'reserve':
            echo "Enter customer name:\n";
            $customer_name_input = trim(fgets(STDIN));
            echo "Enter room number:\n";
            $room_number_input = trim(fgets(STDIN));

            $stmt = $pdo->query('SELECT * FROM rooms WHERE available IS true');
            $rooms_available = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $roomExists = false;
            foreach ($rooms_available as $room) {
                if ($room['room_number'] == $room_number_input) {
                    $roomExists = true;
                    break;
                }
            }

            if (!$roomExists) {
                echo "ERROR: You cannot reserve an already reserved room\n";
            } else {
                $stmt = $pdo->prepare('UPDATE rooms SET available = false, room_owner = ? WHERE room_number = ?');
                $stmt->execute([$customer_name_input, $room_number_input]);
                echo "Room reserved successfully\n";
            }
            customer();
            break;
        case 'cancel':
            echo "Enter customer name:\n";
            $customer_name_input = trim(fgets(STDIN));
            echo "Enter room number:\n";
            $room_number_input = trim(fgets(STDIN));

            $stmt = $pdo->query('SELECT * FROM rooms WHERE available IS false');
            $rooms_reserved = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $roomExists = false;
            foreach ($rooms_reserved as $room) {
                if ($room['room_number'] == $room_number_input && $room['room_owner'] == $customer_name_input) {
                    $roomExists = true;
                    break;
                }
            }

            if (!$roomExists) {
                echo "ERROR: Room is already available or does not belong to the customer\n";
            } else {
                $stmt = $pdo->prepare('UPDATE rooms SET available = true, room_owner = NULL WHERE room_number = ?');
                $stmt->execute([$room_number_input]);
                echo "Room reservation cancelled successfully\n";
            }
            customer();
            break;
        default:
            echo "Command not supported\n";
            customer();
    }
}

// Similar functions for reception and cleaners would go here

function runner($username) {
    global $pdo;
    $stmt = $pdo->prepare('SELECT permission FROM user_permissions WHERE username = ?');
    $stmt->execute([$username]);
    $current_user_permission = $stmt->fetchColumn();

    switch ($current_user_permission) {
        case 'customer':
            customer();
            break;
        case 'reception':
            reception();
            break;
        case 'cleaners':
            cleaners();
            break;
        default:
            echo "Permission not found for user $username\n";
    }
}

runner("Ole_normann");