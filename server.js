import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();

app.use(cors);
const server = createServer(app);
const io = new Server(server, {cors: '*'});
const userRooms = {};

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('join', (object) => {
        // Join the requested room
        socket.join(object.topic);
        userRooms[socket.id] = object;
        socket.to(object.topic).emit("users", object.name);
    });

    socket.on('users', (msg) => {
        const object = userRooms[socket.id];
        io.to(object.topic).emit('users', msg);
    });

    socket.on('goodsChangeUpdate', (msg) => {
        const object = userRooms[socket.id];
        socket.to(object.topic).emit('goodsChangeUpdate', msg);
    });

    socket.on('disconnect', () => {
        const room = userRooms[socket.id];
        console.log(`User ${socket.id} disconnected from room ${room}`);
        delete userRooms[socket.id];
    });
});
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

server.listen(4000, () => {
    console.log('server running at http://localhost:4000');
});