<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
</head>

<body>
    <h1>Java Script</h1>
    <script>
    list = new Array("1", "2", "3");
    i = 0;
    while (i < list.length) {
        document.write("<li>" + list[i]) + "</li>";
        i += 1;
    }
    </script>
    <h1>PHP</h1>
    <?php
    $list = array("1", "2", "3");
    $i = 0;
    while ($i < count($list)) {
        echo "<li>" . $list[$i] . "</li>";
        $i += 1;
    }
    ?>
</body>

</html>