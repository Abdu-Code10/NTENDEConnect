<?php
$host = "localhost";
$user = "root";       // Change if not using root
$pass = "";           // Add your password
$db   = "ntendeconnect";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
