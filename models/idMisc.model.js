const mongoose = require('mongoose')

const miscIDSchema = new mongoose.Schema({
  /*
    Youtube ID => ARRAY OF MISC 
    Github ID => ARRAY OF MISC 
    DEVTO ID => ARRAY OF MISC
    MEDIUM ID => ARRAY OF MISC
    BLOG URL => ARRAY OF MISC
  */
    youtubeID: [{
        type: String,
        required: false,
        default: []
    }], 
    githubID: [{
        type: String,
        required: false,
        default: []
    }],
    devtoID: [{
        type: String,
        required: false,
        default: []
    }],
    mediumID: [{
        type: String,
        required: false,
        default: []
    }]
})

module.exports = mongoose.model('miscID', miscIDSchema)
