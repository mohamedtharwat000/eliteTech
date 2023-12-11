import express from "express";
import data from '../../models/dataManager.js';
const router = express.Router()
const types = ['cpu', 'cooler', 'gpu', 'ram',
	'storage', 'motherboard',
	'powerSupply', 'monitor',
	'mice', 'keyboard',
	'headphone', 'case'
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
	let query = req.query;

	if (query.hasOwnProperty("limit")) {
		let limit = query["limit"];

		if (/^\d+$/.test(limit)) {
			query["limit"] = limit;
		}
		else {
			delete query["limit"];
			delete query["start"];
			delete query["end"];
			query = { ...getSequnece(limit), ...query };
		}
	}
	let result = await data.read(type, query);
	res.json(result);
});


router.post("/:type/", logger, async (req, res) => {
	let type = req.params.type;
	let body = req.body;
	let result = await data.create(type, body);
	res.json(result ? { 'id': result } : { 'error': 'unknown error' });
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
 * Get the right sequence to apply it when making limitation
 *
 * @param {string} sequence - the request parameter, sequence
 * @returns {dict} a dictionary that contains the right value for the start, end, and limit.
 */
function getSequnece(sequence) {

	let values = sequence.split(':');

	sequence = values.join('');
	values = values.map((e) => parseInt(e));
	switch (true) {
		case /^\d+nn$/i.test(sequence):
			return ({ start: values[0] });
		case /^n\d+n$/i.test(sequence):
			return ({ end: values[1] });
		case /^nn\d+$/i.test(sequence):
			return ({ limit: values[2] });
		case /^\d+\d+n$/i.test(sequence):
			return ({ start: values[0], end: values[1] });
		case /^\d+n\d+$/i.test(sequence):
			return ({ start: values[0], limit: values[2] });
		default:
			return ({});
	}
}

export default router;
