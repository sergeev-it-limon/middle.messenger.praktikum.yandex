const path = require('path');

class SelectedChatController {
    getPage(_req, res, _next) {
        console.log('requested selectedChat.html');
        res.sendFile(path.join(__dirname, '../../dist/selectedChat/selectedChat.html'));
    }
}

module.exports = {
    SelectedChatController,
};
