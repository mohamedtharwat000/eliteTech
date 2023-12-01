import express from "express";
import data from '../../dataManager.js';
const router = express.Router()
const types = ['cpu', 'cooler', 'gpu', 'ram',
	'storage', 'motherboard',
	'powerSupply', 'monitor',
	'mice', 'keyboard',
	'headphone'
];


router
	.route("/:type/:id")
	.get(logger, async (req, res) => {
		let type = req.params.type;
		let id = req.params.id ? { 'id': parseInt(req.params.id) } : {};
		let result = await data.read(type, id);

		res.json(result ? result : { 'error': 'not found' });
	})
	.put(logger, async (req, res) => {
		let result = await data.update(req.params.type, { 'id': parseInt(req.params.id), ...req.body });
		result = await data.read(req.params.type, { id: result });

		res.json(result ? result : { 'error': 'not found' });
	})
	.delete(logger, async (req, res) => {
		let type = req.params.type;
		let id = req.params.id ? { 'id': parseInt(req.params.id) } : {};
		let result = await data.delete(type, id);

		res.json(result ? result : { 'error': 'not found' });
	});


router.get("/:type/", logger, async (req, res) => {
	let type = req.params.type;
	let result = await data.read(type, {});
	res.json(result);
});


router.get("/:type/limit/:sequence", sequenceLogger, async (req, res) => {
	let type = req.params.type;
	let result = await data.read(type, getSequnece(req.params.sequence));
	res.json(result);
});


/**
 * A logger function for the /api/type/id and /api/type route
 *
 * @param req - the request
 * @param res - the resopond
 * @param next - the next function to be called
 */
function logger(req, res, next) {
	console.log(req.originalUrl);
	if (!types.includes(req.params.type)) {
		res.status(404).json({ 'error': 'type not found' });
	} else {
		next();
	}
}


/**
 * A logger function for the /api/type/limit/sequence route
 *
 * @param req - the request
 * @param res - the resopond
 * @param next - the next function to be called
 */
function sequenceLogger(req, res, next) {
	console.log(req.originalUrl);
	if (!types.includes(req.params.type)) {
		res.status(404).json({ 'error': 'type not found' });
	} else if (checkSequence(req.params.sequence)) {
		let message = { 'error': 'wrong limitation usage', 'usage': ['start:n:n', 'n:end:n', 'n:n:count', 'start:end:n', 'start:n:count'] }
		res.status(404).json(message);
	} else {
		next();
	}
}


/**
 * Check if the request parameter "sequence" is a valid sequence
 *
 * @param {string} sequence - the request parameter, sequence
 * @returns {int} 0 if valid, 1 otherwise
 */
function checkSequence(sequence) {
	sequence = sequence.split(':');
	if (sequence.length != 3) {
		return (1);
	} else if (!sequence.every(part => /^\d+$|^n$/i.test(part))) {
		return (1);
	}
	let regexSequence = /^\d+nn$|^n\d+n$|^nn\d+$|^\d+\d+n$|^\d+n\d+$/i;
	let validSequence = regexSequence.test(sequence.join(''));
	if (!validSequence)
		return (1);
	return (0);
}


/**
 * Get the right sequence to apply it when making limitation
 *
 * @param {string} sequence - the request parameter, sequence
 * @returns {dict} a dictitnory that contatons the right value for the start, end, count 
 */
function getSequnece(sequence) {

	let values = sequence.split(':');
	console.log(sequence);
	sequence = values.join('');
	values = values.map((e) => parseInt(e));
	switch (true) {
		case /^\d*nn$/i.test(sequence):
			return ({ start: values[0] });
		case /^n\d+n$/i.test(sequence):
			return ({ end: values[1] });
		case /^nn\d+$/i.test(sequence):
			return ({ count: values[2] });
		case /^\d+\d+n$/i.test(sequence):
			return ({ start: values[0], end: values[1] });
		case /^\d+n\d+$/i.test(sequence):
			return ({ start: values[0], count: values[2] });
		default:
			return ({});
	}
}

export default router;
