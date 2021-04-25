const path = require('path');

class SelectedChatController {
    getPage(_req, res, _next) {
        res.sendFile(path.join(__dirname, '../../dist/selectedChat/selectedChat.html'));
    }
}

module.exports = {
    SelectedChatController,
};
