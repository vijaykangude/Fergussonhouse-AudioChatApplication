const roomService = require('../services/roomService');
const RoomDto = require('../dto/roomDto');


class RoomsController{

    async create(req, res){
        const { topic, roomType } = req.body;

        if(!topic || !roomType){
            res.status(400).json({message: 'All fields are mandatory'});
        }

        const room = await roomService.create({
            topic,
            roomType,
            ownerId: req.user._id,
        });

        res.status(200).json(new RoomDto(room));
    }

    async getRooms(req, res){
        const rooms = await roomService.getAllRooms(['open']);
        const allRooms = rooms.map((room) => new RoomDto(room));
        res.status(200).json(allRooms);
    }
}

module.exports = new RoomsController();