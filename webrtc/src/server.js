import http from 'http';
import socketIo from 'socket.io';
import express from 'express';

const app = express();
const port = process.env.PORT | 3060;

app.set('view engine', "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + '/public'));
app.get("/", (req,res) => res.render('home')); 
app.get("/*", (req, res) => res.redirect('/'));

const server = http.createServer(app)
const io = socketIo(server);

const wss = new WebSocket.Server({ server });
const sockets = [];
wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = 'user';
    console.log("Connected to browser");
    socket.on('message', (msg) => {
        const message = JSON.parse(msg);
        switch(message.type) {
            case 'nickname':
                console.log(message.payload);
                socket["nickname"] = message.payload;
                break;
            case 'new_message':
                sockets.forEach((tmpSocket) => tmpSocket.send(`${socket.nickname} : ${message.payload}`));
                break;
        }
    })
    socket.on("close", () => console.log("Disconnected from the browser"));
})

server.listen(port, () => {
    console.log(`${port} is running`)
}); 