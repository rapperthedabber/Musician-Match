const router = require('express').Router();
const chatRoomRoutes = require('./chatRoomRoutes');
const chatMessageRoutes = require('./chatMessageRoutes');

router.use('/chatRooms', chatRoomRoutes);
router.use('/chatMessages', chatMessageRoutes);

module.exports = router;