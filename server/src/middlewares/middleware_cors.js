const cors = require('cors');

const corsOptions = {
	origin: 'http://localhost:8080',
};

export default cors(corsOptions);
