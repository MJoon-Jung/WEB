<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
    body.white {
        background-color: white;
        color: black;
    }

    body.black {
        background-color: black;
        color: white;
    }

    header {
        border-bottom: 1px solid gray;
        padding: 20px;
    }

    nav {
        border-right: 1px solid gray;
        width: 200px;
        height: 600px;
        float: left;
    }

    nav ol {
        list-style: none;
    }

    article {
        float: left;
        padding: 20px;
    }
    </style>
</head>

<body id="target">
    <header>
        <h1><a href="http://localhost/">JavaScript</a></h1>
    </header>
    <nav>
        <ul>
            <?php
            echo file_get_contents("list.txt");
            ?>
        </ul>
    </nav>
    <div id="btn_d">
        <input type="button" value="white" id="white_btn" />
        <input type="button" value="black" id="black_btn" />
    </div>
    <article>
        <?php
        echo file_get_contents("1.txt");
        ?>
    </article>
    <script src="practice.js"></script>
</body>

</html>