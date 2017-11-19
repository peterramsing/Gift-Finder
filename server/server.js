require('dotenv').config()

const server = require('./app');
const port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

server.listen(port, () => {
  console.log('Server is living and running on %d cause it\'s a great port to hail from', port);
})
