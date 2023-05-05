const { Schema, model } = require('mongoose');

const aboutSchema = new Schema({
    instrument: {
        instrumentName: {
            type: String,
            required: true,
        },
        skillLevel: {
            type: String,
            required: true
        }
    },
    age: {
        type: String,
        required: true,
    },

    picture: {
        type: String,
    }
})

const About = new model('About', aboutSchema)

module.export = About