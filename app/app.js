const express = require('express'); // 'cause all the cool kids are doing it
const bodyParser = require('body-parser'); // The Post must go somewhere 📬
const Conversation = require('watson-developer-cloud/conversation/v1'); // Dr. Watson I presume
const request = require('request');

const app = express();

// Boot 'er up!
app.use(express.static('./public'));
app.use(bodyParser.json());

let conversation = new Conversation({
  'version_date': '2017-11-17', // TODO: Figure out why they have me do this
});

app.post('/api/gifts', (request, response) => {

  let workspace = process.env.WORKSPACE_ID || 'no-id';

  // Require a workspace ID
  if (!workspace || workspace === 'no-id') {
    return response.json({
      'output': {
        'text': 'No Workspace ID found.',
      },
    });
  }

  let payload = {
    workspace_id: workspace,
    context: request.body.context || {},
    input: request.body.input || {},
  };

  conversation.message(payload, function(err, data) {
      if (err) {
        return response.status(err.code || 500).json(err);
      }
      return response.json(updateMessage(payload, data));
    });
});

/**
* @param {Object} input     The request to the Conversation
* @param {Object} response  The response from the bot
* @return {Object}          The response with the updated message
*/
function updateMessage(input, response) {
  let responseText = null;
  if (!response.output) {
    response.output = {};
  } else {

    if (response.intents && response.intents[0]) {
      let intent = response.intents[0];

      if (intent.intent === 'find_gift') { // FIXME: When in a deper node this isn't set
        console.log('do a thing!')
        searchEBay([]) // TODO: Dynamically get this from the conversation data
      }
    }


    return response;
  }
}


/**
* @param {Array} keywordArray // An array of possible keywords
* @return {?} // TODO: what shold this return?
*/

function searchEBay(keywordArray) {

  let sandboxEndpoint = 'http://svcs.sandbox.ebay.com/services/search/FindingService/v1';

  // TODO for loop of keyword array here!
  // ${process.env.EBAY_APP_ID}

  let url = sandboxEndpoint + '?';
  url += 'OPERATION-NAME=findItemsByKeywords';
  url += `&SECURITY-APPNAME=${process.env.EBAY_APP_ID}`;
  url += '&RESPONSE-DATA-FORMAT=JSON';
  url += '&keywords=harry%20potter'; // TODO Dynamic!
  url += '&paginationInput.entriesPerPage=3';

  // Make the request
  request(url, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(res.body);
    console.log(body);
  });
}


module.exports = app;