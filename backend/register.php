<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $username = $_POST['username'];
  $password = $_POST['password'];
  $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

  $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
  $stmt->bind_param("ss", $username, $hashedPassword);
  if ($stmt->execute()) {
    echo "Registration successful!";
  } else {
    echo "Error: " . $conn->error;
  }
  $stmt->close();
  $conn->close();
}
?>
