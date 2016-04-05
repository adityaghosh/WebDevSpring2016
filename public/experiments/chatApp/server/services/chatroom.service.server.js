"use strict";

module.exports = function (app, model) {
    app.get("/api/experiments/chatapp/rooms", findAllRooms);
    app.post("/api/experiments/chatapp/rooms/:roomid", joinRoomById);
    app.post("/api/experiments/chatapp/rooms", createRoom);

    function findAllRooms(req, res) {
        var rooms = model.findAllRooms();
        res.json(rooms);
    }

    function createRoom(req, res) {
        var room = req.body;
        var newRoom = model.createRoom(room);
        res.json(newRoom);
    }

    function joinRoomById(req, res) {
        var roomid = req.params.roomid;
        var user = req.body;
        var room = model.joinRoomByRoomId(roomid, user);
        if (room != null) {
            res.json(room);
        }
        else {
            res.status(400).send();
        }
    }
};