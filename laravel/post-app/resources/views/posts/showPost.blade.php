<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0 auto;
            padding: 0;
            background-color: black;
            color: white;
        }
        .menu {
            display: flex;
            justify-content: space-between;
            list-style: none;
            height:80px;
            line-height: 80px;
            border-bottom: 1px solid white;
        }
        a {
            text-decoration: none;
        }
        .main {
            text-align: center;
        }
        .post {
            width: 200px;
            height: 100%;
            padding: 10px 0px;
            border: 1px solid white;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <ul class="menu">
                <li><a href="/">home</a></li>
                <li><a href="createpost">create post</a></li>
                <li><a href="post">show post</a></li>
            </ul>
        </div>
        <div class="main">
            @foreach ($posts as $key => $value)
                <div class="post">
                    <div class="post-head">     
                        <div class="post-title">제목 : {{ $value->title }}</div>
                        <div class="post-name">작성자 : {{ $value->name }}</div>
                    </div>
                    <div class="post-content">내용 : {{ $value->content }}</div>
                </div>
            @endforeach
        </div>
    </div>
</body>
</html>