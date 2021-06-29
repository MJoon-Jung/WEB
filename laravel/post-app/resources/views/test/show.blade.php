<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <ul>
        <li>{{ $name }}</li>
        <li>{{ $age }}</li>
        @foreach ([1,2,3] as $key => $value)
            <li>key : {{ $key }}</li>
            <li>value : {{ $value }}</li>
        @endforeach
    </ul>
</body>
</html>