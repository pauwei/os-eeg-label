const express = require('express');
const axios = require('axios');
const router = express.Router();
const fs = require('fs');
const db = require("../models");
const path = require('path')
require("dotenv").config({ path: path.join(__dirname, '../.env') })
const Component = db.component;
const User = db.user;

///////////////////
///// DROPBOX /////
///////////////////

//Instantiate Dropbox instance
const dropboxV2Api = require('dropbox-v2-api');
let dropbox = null;
const folderpath = '/ICMOBI_website/IC_images'

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

        if (dropbox) { console.log("Dropbox successfully authenticated!"); }
    })
    .catch((err) => {
        console.log(err);
    });

    //Set timeout for next authentication in 3 hours
    setTimeout(generateDBXAuth, 10800000);
}

//Initial authentication for dropbox
generateDBXAuth();

//////////////////////////
///// HELPER METHODS /////
//////////////////////////

// Continues to get the list of files as limit for one read is 500
getFilenamesContinue = (cursor) => {
    return new Promise((resolve, reject) => {
        dropbox({
            resource:'files/list_folder/continue',
            parameters: {
                cursor: cursor
            }
        }, (err, result, response) => {
            //If error in getting continued folder
            if (err) { reject(error); }

            let listContinue = {
                entries: result.entries,
                has_more: result.has_more,
                cursor: result.cursor,
            }

            resolve(listContinue);
        });
    });
}

// Select appropriate experiment based on weights and return filtered list of components
filterByExperiment = (complist, lastExp=false) => {

    // Grab weights from file if possible, otherwise return list unchanged
    let data = {}
    try {
        data = fs.readFileSync('./temp/experiment-weights.json', 'utf8');
    } catch (err) {
        console.log(err);
        return complist;
    }

    const weighter = JSON.parse(data);
    let exp = "";

    // If drawing from previous experiment, just set using stored value
    // Else calculate the value from weights given
    if (lastExp) {
        exp = weighter.lastExp;
    } else {
        const drawnWeight = Math.random();
        const weights = weighter.weights;
        let currWeight = 0.0;

        // Get the experiment based from weights
        for (const expNo in weights) {
            if (weights.hasOwnProperty(expNo)) {
                currWeight = currWeight + parseFloat(weights[expNo]);

                // Break if currWeight has exceeded drawnWeight
                if (currWeight > drawnWeight) {
                    exp = String(expNo);
                    break;
                }
            }
        }

        // If somehow experiment not set, just use previous
        if (exp.length === 0) {
            exp = weighter.lastExp;
        }
    }

    // Save current experiment number for reference later
    weighter.lastExp = exp;
    const jsonWeighter = JSON.stringify(weighter);
    
    try {
        fs.writeFileSync('./temp/experiment-weights.json', jsonWeighter, 'utf8');
    } catch (err) {
        if (err) { console.log(err) }
    }

    // Filter out all entries that are not part of the experiment
    return complist.filter((entry) => {
        if (typeof entry === 'string') {
            return entry.slice(0, 1) === exp;
        } else if (typeof entry === 'object' && "name" in entry) {
            return entry.name.slice(0, 1) === exp;
        } else {
            return true;
        }
    })
}


////////////////////////
///// ROUTER PATHS /////
////////////////////////

//Getting the image file name for eeg labelling
router.get('/imagefile', async (req, res) => {

    if (!req.query.email || req.query.email === "guest") {
        let files = [];

        //Grab list of completed components
        Component.find({}, (err, data) => {
            if (err) { 
                console.log(err);
                res.status(500).json({ error: "MongoDB not responding"});
                return;
            }

            //No error and assign data
            if (data) {
                files = data;
            } else {
                files = [
                    "1001001.jpg",
                    "1001002.jpg",
                    "1001003.jpg",
                    "1001004.jpg",
                    "1001005.jpg",
                    "1001006.jpg",
                    "1001007.jpg",
                    "1001008.jpg",
                    "1001009.jpg",
                    "1001010.jpg",
                    "1001011.jpg",
                    "1001012.jpg",
                    "1001013.jpg",
                    "1001019.jpg",
                    "1001034.jpg",
                    "1001038.jpg",
                    "1001042.jpg",
                    "1001061.jpg",
                    "1001065.jpg",
                    "1001077.jpg",
                    "1001088.jpg",
                ];
            }

            //Get a completed component
            const filename = files[Math.floor(Math.random() * files.length)].name;
            res.send(filename);
            return;
        });

        //If somehow mongodb not accessed
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
        }, async (err, result, response) => {
            //If error returned
            if (err) { return console.log('get imagefile err: ', err); }

            //Initialize list with first 500 filenames
            dropboxlist = result.entries;
            let has_more = result.has_more;
            let cursor = result.cursor;

            //Continue getting filenames until all filenames have been retrieved
            while (has_more) {
                const listContinueObject = await getFilenamesContinue(cursor);
                dropboxlist = dropboxlist.concat(listContinueObject.entries);
                has_more = listContinueObject.has_more;
                cursor = listContinueObject.cursor;
            }

            //Filter out filenames (from folders)
            dropboxlist = dropboxlist.filter((entry) => {
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

            let mongodblist = [];
            Component.find({}, (err, data) => {
                if (err) { 
                    console.log(err);
                    res.status(500).json({ error: "MongoDB not responding"});
                    return;
                }

                //No error and assign data
                if (data) {
                    mongodblist = data;
                }
                
                

                //////////////////////////////////////////
                //Get list of completed labels from user//
                //////////////////////////////////////////

                let usercomplist = [];
                User.findOne({ email: req.query.email }, (err, data) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: "Unable to grab user completed components"});
                        return;
                    }

                    //No error and assign data
                    if (data) {
                        usercomplist = data.components;
                    }
                    

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
                    const cap = 5;
                    mongodblist = mongodblist.filter((component) => {
                        return component.labels.length < cap;
                    });

                    ///////////////////////////
                    /////SELECT EXPERIMENT/////
                    ///////////////////////////
                    dropboxlist = filterByExperiment(dropboxlist);
                    mongodblist = filterByExperiment(mongodblist, lastExp=true);

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
                            "1001001.jpg",
                            "1001002.jpg",
                            "1001003.jpg",
                            "1001004.jpg",
                            "1001005.jpg",
                            "1001006.jpg",
                            "1001007.jpg",
                            "1001008.jpg",
                            "1001009.jpg",
                            "1001010.jpg",
                            "1001011.jpg",
                            "1001012.jpg",
                            "1001013.jpg",
                            "1001019.jpg",
                            "1001034.jpg",
                            "1001038.jpg",
                            "1001042.jpg",
                            "1001061.jpg",
                            "1001065.jpg",
                            "1001077.jpg",
                            "1001088.jpg",
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

    //Download file from Dropbox
    dropbox({
        resource: 'files/download',
        parameters: {
            path: file
        }
    }, (err, result, response) => {
        if (err) { return console.log('get image data err: ', err); }

        fs.readFile(path.join(__dirname, "..", "temp", "labelling-image.jpg"), (err, data) => {
            if (err) throw err;

            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(data);
        });
       
    }).pipe(fs.createWriteStream(path.join(__dirname, "..", "temp", "labelling-image.jpg")));

})

// Getting the matlab file for eeg labelling
router.get('/mat', (req, res) => {
    res.send('Sending .mat file');
})

// Submitting weights to be calculated
router.post('/weights', (req, res) => {
    const weights = req.body;
    let currWeight = 0.0;

    //Add all weights together
    for (const expNo in weights) {
        if (weights.hasOwnProperty(expNo)) {
            currWeight = currWeight + weights[expNo];
        }
    }

    //Check if weight is valid with margin of error
    if (currWeight > 1.0001 || currWeight < 0.9999) {
        res.send("Invalid weights were submitted");
        return;
    }

    //Read from file and override with new weights
    fs.readFile('./temp/experiment-weights.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.send("Unable to read previous weights")
            return;
        }

        const weighter = JSON.parse(data);
        weighter.weights = weights
        const jsonWeighter = JSON.stringify(weighter);
        fs.writeFile('./temp/experiment-weights.json', jsonWeighter, 'utf8', (err, data) => {
            if (err) { console.log(err) }
            res.send("Successfully submitted weights");
        });
    });
})

// Getting the statistics to display for the data page
router.get('/statistics', async (req, res) => {

    let weighter;
    try {
        weighter = fs.readFileSync('./temp/experiment-weights.json', 'utf8');
    } catch (err) {
        console.log(err);
    }

    if (dropbox) {
        dropbox({
            resource: 'files/list_folder',
            parameters: {
                path: folderpath
            }
        }, async (err, result, response) => {
            //If error returned
            if (err) { return console.log('err: ', err); }

            //Initialize list with first 500 filenames
            let filelist = result.entries;
            let has_more = result.has_more;
            let cursor = result.cursor;

            while (has_more) {
                const listContinueObject = await getFilenamesContinue(cursor);
                filelist = filelist.concat(listContinueObject.entries);
                has_more = listContinueObject.has_more;
                cursor = listContinueObject.cursor;
            }

            //Filter out filenames
            filelist = filelist.filter((entry) => {
                return entry['.tag'] === 'file';
            });

            //Extract out file name
            filelist = filelist.map((file) => {
                return file['name'];
            });

            let mongodblist = [];
            Component.find({}, (err, data) => {
                if (err) { 
                    console.log(err);
                    res.status(500).json({ error: "MongoDB not responding"});
                    return;
                }

                //No error and assign data
                if (data) {
                    mongodblist = data;
                }

                //Assemble statistics
                let stats = {}

                //Count the total number of label images
                filelist.forEach( (element) => {
                    const exp = element.slice(0, 1);
                    if (exp in stats) {
                        stats[exp].total = stats[exp].total + 1;
                    } else {
                        stats[exp] = {
                            total: 0,
                            completed: 0,
                            weight: 0,
                        };
                    }
                });

                //Count the total number of completed labels
                mongodblist.forEach( (element) => {
                    const exp = element.name.slice(0, 1);
                    if (exp in stats) {
                        stats[exp].completed = stats[exp].completed + 1;
                    } else {
                        stats[exp] = {
                            total: 0,
                            completed: 0,
                            weight: 0,
                        };
                    }
                });

                //Get the associated weights
                weighter = JSON.parse(weighter);
                let weights = weighter.weights;
                stats["lastExp"] = weighter.lastExp;
                for (exp in weights) {
                    if (exp in stats) {
                        stats[exp].weight = weights[exp];
                    } else {
                        stats[exp] = {
                            total: 0,
                            completed: 0,
                            weight: weights[exp],
                        };
                    }
                }

                res.send(stats);
            });
        });
    } else {
        res.status(500).json({ error: "Dropbox not authenticated." })
    }
})

// Getting the filenames from dropbox
router.get('/filenames', async (req, res) => {
    if (dropbox) {
        dropbox({
            resource: 'files/list_folder',
            parameters: {
                path: folderpath
            }
        }, async (err, result, response) => {
            //If error returned
            if (err) { return console.log('err: ', err); }

            //Initialize list with first 500 filenames
            let filelist = result.entries;
            let has_more = result.has_more;
            let cursor = result.cursor;

            while (has_more) {
                const listContinueObject = await getFilenamesContinue(cursor);
                filelist = filelist.concat(listContinueObject.entries);
                has_more = listContinueObject.has_more;
                cursor = listContinueObject.cursor;
            }

            //Filter out filenames
            filelist = filelist.filter((entry) => {
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