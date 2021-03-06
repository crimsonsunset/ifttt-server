const {delay, lowerCase, map, times, constant, compact} = require('lodash');

// function isValidRequest(requester){
// 	return true
// }
function isValidRequest(req, res, next) {
    return next();
}

function validateRequest(req, res, next) {
    const {domains} = process.env;
    const origin = req.headers.origin;
    if (domains.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
}

function catchErrors(fn) {
    return function (...args) {
        return fn(...args).catch((err) => {
            console.error('cant do it bro');
            console.error(err);
        });
    }
}


function createRequestArray(inArr) {
    let newArr=[];
    inArr.forEach((e, i) => {
        const {repeat} = e;
        if (repeat) {
            newArr.push(...times(repeat, constant(e)))
        } else {
            newArr.push(e)
        }
    });
    return newArr;
}

module.exports = {
    isValidRequest,
    validateRequest,
    catchErrors,
    createRequestArray: createRequestArray
};