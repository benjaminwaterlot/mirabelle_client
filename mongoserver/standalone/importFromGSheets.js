const GoogleSpreadsheet = require('google-spreadsheet');
const _ = require('lodash');

const doc = new GoogleSpreadsheet(
	'1cOJOCXelWvyKD3q8RMxIayzI8oLx1Bo_jp7E1l6yQ1E',
);

(async () => {
	doc.getInfo((err, info) => {
		if (err) throw Error(err);
		for (const sheet of info.worksheets) {
			console.log(sheet.title);
		}

		let sheetsNumber = info.worksheets.length;
		let db = {};

		for (const sheet of info.worksheets) {
			sheet.getRows({}, (err, rawData) => {
				if (err) throw Error(err);

				const rows = rawData.map(original =>
					_.omit(original, ['id', '_xml', '_links', 'save', 'del']),
				);

				db[sheet.title] = rows;
				sheetsNumber--;
				if (sheetsNumber === 0) console.log(db.test);
			});
		}
	});
})();
