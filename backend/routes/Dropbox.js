const express = require('express');
const axios = require('axios');
const router = express.Router();
const fs = require('fs');

///////////////////
///// DROPBOX /////
///////////////////

//Instantiate Dropbox instance
const dropboxV2Api = require('dropbox-v2-api');
let dropbox = null;
const folderpath = '/test_ICs'

//Get new short live token every 3 hours
generateDBXAuth = () => {
    axios.post(
        'https://api.dropbox.com/oauth2/token',
        new URLSearchParams({
            'grant_type': 'refresh_token',
            'refresh_token': process.env.DROPBOX_RTOKEN
        }),
        {
            auth: {
                username: process.env.DROPBOX_APPKEY,
                password: process.env.DROPBOX_APPSECRET
            }
        }
    )
    .then((res) => {
        dropbox = dropboxV2Api.authenticate({
            token: res.data.access_token
        });
    })
    .catch((err) => {
        console.log(err);
    });

    //Set timeout for next authentication
    setTimeout(generateDBXAuth, 10800000);
}

//Initial authentication for dropbox
generateDBXAuth();


////////////////////////
///// ROUTER PATHS /////
////////////////////////

//Getting the image for eeg labelling
router.get('/image', (req, res) => {
    //Algorithm to determine which image to send back

    //TO DO
    //Get list of images (store in mongodb?)
    const files = [
        "test0101_IC46.jpg",
        "test0101_IC43.jpg",
        "test0101_IC45.jpg",
        "test0101_IC51.jpg",
        "test0101_IC66.jpg",
        "test0101_IC71.jpg",
        "test0101_IC73.jpg",
        "test0101_IC8.jpg",
        "test0101_IC12.jpg",
        "test0101_IC14.jpg",
        "test0101_IC26.jpg",
        "test0101_IC9.jpg",
        "test0101_IC17.jpg",
        "test0101_IC28.jpg",
        "test0101_IC34.jpg",
        "test0101_IC29.jpg",
        "test0101_IC30.jpg",
        "test0101_IC38.jpg",
        "test0101_IC39.jpg"
    ];

    //TO DO
    //Get list of completed labels
    //Need to pass user id in order to get labels

    //TO DO
    //Determine which file to get
    const file = folderpath + "/" + files[Math.floor(Math.random() * files.length)];

    //Download file from Dropbox
    dropbox({
        resource: 'files/download',
        parameters: {
            path: file
        }
    }, (err, result, response) => {
        if (err) { return console.log('err: ', err); }

        fs.readFile('./temp/labelling-image.jpg', (err, data) => {
            if (err) throw err;

            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(data);
        });
       
    }).pipe(fs.createWriteStream('./temp/labelling-image.jpg'));

})

//Getting the matlab file for eeg labelling
router.get('/mat', (req, res) => {
    res.send('Sending .mat file');
})

router.get('/filenames', async (req, res) => {
    if (dropbox) {
        dropbox({
            resource: 'files/list_folder',
            parameters: {
                path: folderpath
            }
        }, (err, result, response) => {
            //If error returned
            if (err) { return console.log('err: ', err); }

            //Filter out filenames
            let filelist = result.entries.filter((entry) => {
                return entry['.tag'] === 'file';
            });

            //Extract out file name
            filelist = filelist.map((file) => {
                return file['name'];
            });

            res.send(filelist);
        });
    } else {
        res.status(500).json({ error: "Dropbox not authenticated." })
    }
})

module.exports = router;