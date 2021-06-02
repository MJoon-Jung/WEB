<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <link href="style.css" rel="stylesheet" type="text/css" />
    <script src="https://kit.fontawesome.com/5c91ff18d2.js" crossorigin="anonymous"></script>
</head>

<body>
    <header>
        <div class="logo">
            <i class="fas fa-hospital-symbol"></i>
        </div>
        <div class="menu">
            <ul>
                <li>Home</li>
                <li>Service</li>
                <li>Info</li>
                <li>history</li>
            </ul>
        </div>
        <div class="menu_btn">
            <i class="fas fa-bars"></i>
        </div>
    </header>
    <article>
        <div class="aside">
            <ul>
                <li>공지사항</li>
                <li>현재 진행중인 공모전</li>
                <li>공모전 발표</li>
                <li>문의사항</li>
            </ul>
        </div>
        <div class="message">
            <h2>공모전 결과</h2>
            <?php
            $id = $_POST["id"];
            $password = $_POST["psd"];
            if ($id == "Start" && $password == "1111") {
                echo "<h1>축하드립니다 2등입니다</h1>";
            } else {
                echo "<h1>Login fail</h1>";
            }
            ?>
        </div>
</body>

</html>