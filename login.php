<?php
    // Connect to the MySQL database
    $db = mysqli_connect('localhost', 'root', '', 'users');

    // Check if the form is submitted
    if (isset($_POST['login'])) {
        // Get the username and password from the form
        $username = mysqli_real_escape_string($db, $_POST['username']);
        $password = mysqli_real_escape_string($db, $_POST['password']);

        // Query the database to check if the user exists
        $query = "SELECT * FROM users WHERE username='$username'";
        $results = mysqli_query($db, $query);

        // Check if the user exists and if the password matches
        if (mysqli_num_rows($results) == 1) {
            $user = mysqli_fetch_assoc($results);
            if (password_verify($password, $user['password'])) {
                // Start a session and redirect to a protected page
                session_start();
                $_SESSION['username'] = $username;
                header('Location: protected.php');
            } else {
                echo 'Invalid password.';
            }
        } else {
            echo 'Invalid username.';
        }
    }
?>
