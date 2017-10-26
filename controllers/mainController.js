const router = require("express").Router();
const axios = require('axios');
const {defer, lowerCase, map} = require('lodash');
const {catchErrors} = require('../util/helpers');

const baseURL = process.NGROK_URL;


function _handleItem(req, res) {
	const {commands} = req.body;
	const requester = req.headers.origin;
	const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

	// async function _callAxios(url, verb, body) {
	// 	return await axios[verb](url, body);
	// 	// return await axios[verb](url, body);
	// }

	const makeCalls = async (e, i) => {
		const urlz = 'https://jsonplaceholder.typicode.com/posts/1';
		const {
			itemName,
			deferNext,
			action = '',
			request: {
				verb,
				body
			}
		} = e;

		// const d = _callAxios(baseURL + itemName + action, verb, body);
		return await axios['get'](urlz, body);
		// return await axios[lowerCase(verb)](urlz, body);
	};

	let wrapped = catchErrors(makeCalls);

	let promiseArr = map(commands, wrapped);

	console.log('z')
	console.log(promiseArr)

	Promise.all(promiseArr).then((e, i) => {
		console.log('alzzz')
		console.log(e[0].data.title);
	})

	return res.json({status: 'worked'})

}

router.post('/item/', _handleItem);


// function breathe(amount) {
// 	return new Promise((resolve, reject) => {
// 		if (amount < 500) {
// 			reject('That is too small of a value');
// 		}
// 		setTimeout(() => resolve(`Done for ${amount} ms`), amount);
// 	});
// }
//
// function catchErrors(fn) {
// 	return function (...args) {
// 		return fn(...args).catch((err) => {
// 			console.error('Ohhhh nooo!!!!!');
// 			console.error(err);
// 		});
// 	}
// }
//
// async function go(name, last) {
// 	console.log(`Starting for ${name} ${last}!`);
// 	const res = await breathe(1000);
// 	console.log(res);
// 	const res2 = await breathe(300);
// 	console.log(res2);
// 	const res3 = await breathe(750);
// 	console.log(res3);
// 	const res4 = await breathe(900);
// 	console.log(res4);
// 	console.log('end');
// }
//
// const wrappedFunction = catchErrors(go);
// wrappedFunction('Wes', 'Bos');
// go('Wes', 'Bos');


router.get('/test/', function (req, res) {
	const {itemName, action} = req.body;
	const requester = req.headers.origin;
	const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	console.log('asd', fullUrl, requester);
	res.json({status: 'worked'})
});

module.exports = router;