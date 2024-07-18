<!-- login.php -->
<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    // Connect to database
    $conn = new mysqli("localhost", "root", "", "pathtopast");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Query database
    $sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Login successful
        $_SESSION['username'] = $username;
        header("Location: quiz.html"); // Redirect to welcome page
    } else {
        $message = "Invalid username or password";
        echo "<script type='text/javascript'>alert('$message');</script>";
    }
    $conn->close();
}
?>