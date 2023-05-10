const router = require('express').Router();
const chatRoomRoutes = require('./chatRoomRoutes');

router.use('/chatRooms', chatRoomRoutes);

module.exports = router;