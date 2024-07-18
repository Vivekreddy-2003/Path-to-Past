<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $email = $_POST['email'];

    // Connect to database
    $conn = new mysqli("localhost", "root", "", "pathtopast");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if username already exists
    $check_query = "SELECT * FROM users WHERE username='$username'";
    $result = $conn->query($check_query);
    if ($result->num_rows > 0) {
        $message = "Username already exists";
        echo "<script type='text/javascript'>alert('$message');</script>";
        $referer = $_SERVER['HTTP_REFERER'];
        header("Location: $referer");
        exit();
    }
    $check_query = "SELECT * FROM users WHERE password='$password'";
    $result = $conn->query($check_query);
    if ($result->num_rows > 0) {
        $message = "password already exists";
        echo "<script type='text/javascript'>alert('$message');</script>";
        $referer = $_SERVER['HTTP_REFERER'];
        header("Location: $referer");
        
        exit();
    }
    $check_query = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($check_query);
    if ($result->num_rows > 0) {
        $message = "email already exists";
        echo "<script type='text/javascript'>alert('$message');</script>";
        $referer = $_SERVER['HTTP_REFERER'];
        header("Location: $referer");
        exit();
    }

    // Insert new user into database
    if(strlen($username)<6)
    {
        $message = "username must have atleast 6 letters";
        echo "<script type='text/javascript'>alert('$message');</script>";
        $referer = $_SERVER['HTTP_REFERER'];
        header("Location: $referer");
        
        exit();
    }
    if (!preg_match("/^[a-zA-Z-' ]*$/",$username)) {
        $message = "username must be letters or whitespaces";
        echo "<script type='text/javascript'>alert('$message');</script>";
        $referer = $_SERVER['HTTP_REFERER'];
        header("Location: $referer");
        exit();
    }
    if($confirm_password!=$password)
    {
        $message = "password not matched";
        echo "<script type='text/javascript'>alert('$message');</script>"; 
        $referer = $_SERVER['HTTP_REFERER'];
        header("Location: $referer");  
        exit();
    }
    if(strlen($password)<6)
    {
        $message = "password must be atleaast 6 letters";
        echo "<script type='text/javascript'>alert('$message');</script>";
        $referer = $_SERVER['HTTP_REFERER'];
        header("Location: $referer");
        exit();
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $message = "email error";
        echo "<script type='text/javascript'>alert('$message');</script>";
        $referer = $_SERVER['HTTP_REFERER'];
        header("Location: $referer");
        exit();
    }
    $insert_query = "INSERT INTO users (username, password, confirm_password, email) VALUES ('$username', '$password', '$confirm_password', '$email')";
    if ($conn->query($insert_query) === TRUE) {
        $message = "Signup successful";
        echo "<script type='text/javascript'>alert('$message');</script>";
        $referer = $_SERVER['HTTP_REFERER'];
        header("Location: $referer");
    } else {
        echo "Error: " . $insert_query . "<br>" . $conn->error;
    }
    $conn->close();
}
?>