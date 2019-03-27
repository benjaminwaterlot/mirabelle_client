export default (text, length) => {
	if (typeof text !== 'string') return '';
	if (text.length <= length) return text;

	while (text[length] && text[length] !== ' ') {
		length++;
	}
	const slicedText = text.slice(0, length) + '...';
	return slicedText;
};
