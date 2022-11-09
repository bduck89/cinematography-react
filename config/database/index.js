const {MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_DATABASE, MONGODB_SERVER} = require('../keys');

// This needs to change to suit the project needs

module.exports = {
    MONGO_URL: `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_SERVER}/${MONGODB_DATABASE}?retryWrites=true&w=majority`
}