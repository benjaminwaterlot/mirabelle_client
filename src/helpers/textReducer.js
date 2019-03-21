export default (text, length) => {
	if (text.length <= length) return text;

	while (text[length] && text[length] !== ' ') {
		length++;
	}
	const slicedText = text.slice(0, length) + '...';
	return slicedText;
};
