<?php
session_start();

// Connect to the database
$mysqli = new mysqli("hostname", "username", "password", "mydatabase");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $password_confirm = $_POST["password_confirm"];
    
    // Check if the passwords match
    if ($password != $password_confirm) {
        $_SESSION["error_message"] = "Passwords do not match";
        header("Location: signup.php");
        exit;
    }
    
    // Check if the email already exists
    $stmt = $mysqli->prepare("SELECT email FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $_SESSION["error_message"] = "Email already exists";
        header("Location: signup.php");
        exit;
    }
    $stmt->close();

    // Hash the password
    $password = password_hash($password, PASSWORD_DEFAULT);

    // Prepare the statement to insert the new user into the database
    $stmt = $mysqli->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $password);

    // Execute the statement
    if ($stmt->execute()) {
        $_SESSION["success_message"] = "Signup successful, please login.";
        header("Location: login.php");
        exit;
    } else {
        $_SESSION["error_message"] = "An error occurred, please try again.";
        header("Location: signup.php");
        exit;
    }
}
?>
<html>
<head>
    <title>Signup</title>
</head>
<body>
    <h1>Signup</h1>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br>
        <label for="password_confirm">Confirm Password:</label>
        <input type="password" id="password_confirm" name="password_confirm" required>
        <br>
        <input type="submit" value="Signup">
    </form>
    <?php
    if (!empty($_SESSION["error_message"])) {
        echo "<p style='color: red;'>" . $_SESSION["error_message"] . "</p>";
        unset($_SESSION["error_message"]);
    }
    ?>
</body>
</html>
