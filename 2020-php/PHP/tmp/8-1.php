<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        input[type="submit"]{
            border-radius: 20px;
            padding:5px 60px;
            cursor:pointer;
        }
        input[type="submit"]:hover{
            background-color:yellow;
        }
    </style>
</head>
<body>
    <form action="8-2.php">
        <table>
            <tr>
                <td>User ID</td>
                <td><input type="text" name="id"></td>
            </tr>
            <tr>
                <td>User Password</td>
                <td><input type="password" name="psd"></td>
            </tr>
            <tr>
                <td></td>
                <td><input type="submit" value="Login"></td>
            </tr>
        </table>
    </form>
</body>
</html>
