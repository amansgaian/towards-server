const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

function connection(){
    mongoose.connect(`${mongoURI}/towardsdb`)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}

module.exports = connection;