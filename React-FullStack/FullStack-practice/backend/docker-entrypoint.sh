dockerize -wait tcp://mysql:3306 -timeout 20s

echo "Start server"
nodemon app.js