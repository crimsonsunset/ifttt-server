const router = require("express").Router();
const axios = require('axios');
const {delay, lowerCase, map} = require('lodash');
const {catchErrors} = require('../util/helpers');
const baseURL = process.env.NGROK_URL;

router.get('/test/', function (req, res) {
    const {itemName, action} = req.body;
    const requester = req.headers.origin;
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log('asd', fullUrl, requester);
    res.json({status: 'worked'})
});


router.post('/:name', (req, res)=>{
    const axiosConfig = {
        headers: {
            'Content-Type': 'text/plain'
        }
    };

    const {name} = req.params;
    const {commands} = req.body;

    // const requester = req.headers.origin;
    // const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    function sendAndAwaitCall(e, i) {
        const urlz = 'https://postman-echo.com/delay/3';
        const {
            itemName,
            deferNext,
            action,
            request: {
                verb,
                body
            }
        } = e;

        // const d = _callAxios(baseURL + itemName + action, verb, body);

        return new Promise((resolve, reject) => {

            const time = 1500;
            delay(() => {
                const suffix = (action) ? `${itemName}_${action}` : itemName;
                const reqURL = `${baseURL}${name}/${suffix}`;
                const promise = axios[verb](reqURL, body, axiosConfig);
                return resolve(promise)
            }, deferNext);
        });
    }

    let wrapped = catchErrors(sendAndAwaitCall);

    (async () => {
        for (let i = 0; i < commands.length; i++) {
            await wrapped(commands[i]);
        }
        console.log('all done making requests');
        return res.json({status: 'worked'})
    })();

});


module.exports = router;