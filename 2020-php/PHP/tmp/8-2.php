<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
</head>

<body>
    <?php
    $id = $_GET["id"];
    $password = $_GET["psd"];
    if ($id == "gjgjajaj" && $password == "1111") {
        echo "Login Success";
    } else
        echo "Login fail";
    ?>
</body>

</html>