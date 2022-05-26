const express = require('express');
const axios = require('axios');
const router = express.Router();
const fs = require('fs');
const db = require("../models");
const Component = db.component;
const User = db.user;

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
        })

        if (dropbox) { console.log("Dropbox successfully authenticated."); }
    })
    .catch((err) => {
        console.log(err);
    });

    //Set timeout for next authentication in 3 hours
    setTimeout(generateDBXAuth, 10800000);
}

//Initial authentication for dropbox
generateDBXAuth();


////////////////////////
///// ROUTER PATHS /////
////////////////////////

//Getting the image file name for eeg labelling
router.get('/imagefile', async (req, res) => {

    if (!req.query.email || req.query.email === "guest") {
        console.log("Guest account detected, ", req.query.email);
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
        res.send(files[Math.floor(Math.random() * files.length)])
        return;
    }

    ///////////////////////////////////    
    //Get list of images from dropbox//
    ///////////////////////////////////

    let dropboxlist;
    if (dropbox) {
        dropbox({
            resource: 'files/list_folder',
            parameters: {
                path: folderpath
            }
        }, (err, result, response) => {
            //If error returned
            if (err) { return console.log('err: ', err); }

            //Filter out filenames (from folders)
            dropboxlist = result.entries.filter((entry) => {
                return entry['.tag'] === 'file';
            });

            //Extract out file name (from file object)
            dropboxlist = dropboxlist.map((file) => {
                return file['name'];
            });

            //Extract only images (jpg extensions)
            dropboxlist = dropboxlist.filter((file) => {
                const extIndex = file.lastIndexOf('.');
                return file.substring(extIndex) == '.jpg';
            });



            ///////////////////////////////////////////
            ///Get list of components within mongodb///
            ///////////////////////////////////////////

            let mongodblist;
            Component.find({}, (err, data) => {
                if (err) { 
                    console.log(err);
                    res.status(500).json({ error: "MongoDB not responding"});
                    return;
                }

                //No error and assign data
                mongodblist = data;



                //////////////////////////////////////////
                //Get list of completed labels from user//
                //////////////////////////////////////////

                let usercomplist;
                User.findOne({ email: req.query.email }, (err, data) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: "Unable to grab user completed components"});
                        return;
                    }

                    //No error and assign data
                    usercomplist = data.components;



                    //Algorithm to determine which image to send back

                    //////////////////////////////
                    /////FILTERING LISTS DOWN/////
                    //////////////////////////////

                    //Get rid of components already labelled by user from dropbox list
                    dropboxlist = dropboxlist.filter((file) => {
                        return !usercomplist.includes(file);
                    });

                    //Get rid of components already labelled by user from mongodb list
                    mongodblist = mongodblist.filter((component) => {
                        return !usercomplist.includes(component.name);
                    });

                    //Get rid of components already at cap
                    const cap = 10;
                    mongodblist = mongodblist.filter((component) => {
                        return component.labels.length < cap;
                    });

                    ////////////////////////
                    /////SELECTING FILE/////
                    ////////////////////////

                    //File to return
                    let file = "";

                    //If dropboxlist is empty, user has labelled all known components
                    if (dropboxlist.length === 0) {
                        //Select from previous labelled components
                        file = usercomplist[Math.floor(Math.random() * usercomplist.length)];
                        res.send(file);
                        return;
                    }

                    //If mongodblist is empty, user has labelled all labelled components
                    if (mongodblist.length === 0) {
                        //Select from dropboxlist, start a new component
                        file = dropboxlist[Math.floor(Math.random() * dropboxlist.length)];
                        res.send(file);
                        return;
                    }

                    //Weighted selection
                    //Components with more labels have better chance of being selected
                    let totalWeight = 0;
                    for (let i = 0; i < mongodblist.length; i++) {
                        totalWeight += mongodblist[i].labels.length;
                    }

                    //Keep adding until component exceeds selection
                    const selection = Math.floor(Math.random() * totalWeight);
                    let trackWeight = 0;
                    for (let i = 0; i < mongodblist.length; i++) {
                        trackWeight += mongodblist[i].labels.length;

                        if (trackWeight >= selection) {
                            file = mongodblist[i].name;
                            break;
                        }
                    }

                    //If somehow file is still not filled just select from components below
                    if (file.length === 0) {
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

                        file = files[Math.floor(Math.random() * files.length)];
                    }

                    res.send(file);
                });
            })
        });
    } else {
        res.status(500).json({ error: "Dropbox not authenticated." })
    }

})

//Getting the image for eeg labelling
router.get('/imagedata', (req, res) => {

    //TO DO
    //Determine which file to get
    const file = folderpath + "/" + req.query.imagefile;

    fs.readdirSync('./backend/temp').forEach(file => {
        console.log(file);
    });

    //Download file from Dropbox
    dropbox({
        resource: 'files/download',
        parameters: {
            path: file
        }
    }, (err, result, response) => {
        if (err) { return console.log('err: ', err); }

        fs.readFile('./backend/temp/labelling-image.jpg', (err, data) => {
            if (err) throw err;

            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(data);
        });
       
    }).pipe(fs.createWriteStream('./backend/temp/labelling-image.jpg'));

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