const { validationResult } = require("express-validator");

const Song = require('../models/song');

exports.addSong = (req, res) => {
    // check if any error in request body or any data missing and resposer according to that 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(405).json({
            status: -1,
            message: "Incomplete request data",
            errors: errors.array()
        })
    }

    try {
        const { title, picture, origin_year, creator, genre } = req.body;

        const song = new Song({
            title,
            picture,
            origin_year,
            creator,
            genre
        });

        song.save();

        return res.status(200).json({
            status: 0,
            message: "Song Added",
            data: song
        })
    } catch (e) {
        return res.status(500).json({
            status: -1,
            message: "Internal Server Error",
            errors: e
        })
    }
}

exports.getSongOnly = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(405).json({
            status: -1,
            message: "Incomplete request data",
            errors: errors.array()
        })
    }
    try {
        if (req.body.cat == "byId") {

            Song.findById(req.body.param, (error, result) => {
                if (error) {

                    return res.status(500).json({
                        status: 1,
                        message: "oops something is broken"
                    })
                }

                if (result) {
                    return res.status(200).json({
                        status: 0,
                        message: "Fetched song",
                        body: result
                    })
                }
            })

        } else if (req.body.cat == "byName") {

            Song.find({ 'title': req.body.param }, (error, result) => {
                if (error) {
                    return res.status(500).json({
                        status: 1,
                        message: "oops something is broken"
                    })
                }
                if (result.length > 0) {
                    return res.status(200).json({
                        status: 0,
                        message: "Fecthing by name",
                        data: result
                    })
                }
                return res.status(200).json({
                    status: 0,
                    message: "Query done,No songs found",
                })
            });

        } else {

            return res.status(405).json({
                status: 2,
                message: "Method is not permitted"
            })
        }

    } catch (e) {
        return res.status(500).json({
            status: -1,
            message: "Internal Server Error",
            errors: e
        })
    }
}