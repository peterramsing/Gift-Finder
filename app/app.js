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

app.post('/api/gifts', (req, res) => {

  let workspace = process.env.WORKSPACE_ID || 'no-id';

  // Require a workspace ID
  if (!workspace || workspace === 'no-id') {
    return res.json({
      'output': {
        'text': 'No Workspace ID found.',
      },
    });
  }

  let payload = {
    workspace_id: workspace,
    context: req.body.context || {},
    input: req.body.input || {},
  };

  conversation.message(payload, function(err, data) {
      if (err) {
        return res.status(err.code || 500).json(err);
      }
      return res.json(updateMessage(payload, data));
    });
});


/**
* @param {Object} input     The request to the Conversation
* @param {Object} response  The response from the bot
* @return {Object}          The response with the updated message
*/
function updateMessage(input, res) {
  let resText = null;

  if (!res.output) {
    res.output = {};
  } else {
    console.log(res);
    if (res.context.interests) {
      searchEBay(res.context)
    }
    return res;
  }
}


/**
* @param {Object} contextObject
* @return {?} // TODO: what should this return?
*/
function searchEBay(contextObject) {
  let sandboxEndpoint = 'http://svcs.sandbox.ebay.com/services/search/FindingService/v1';
  const co = contextObject;

  // FIXME: Why does this not return values?
  // let keywords = `${co.occasion} ${co.interests} ${co.person}`;
  let keywords = `${co.interests}`;
  let url = sandboxEndpoint + '?';
  url += 'OPERATION-NAME=findItemsByKeywords';
  url += `&SECURITY-APPNAME=${process.env.EBAY_APP_ID}`;
  url += '&RESPONSE-DATA-FORMAT=JSON';
  url += `&keywords=${keywords}`;
  url += '&paginationInput.entriesPerPage=3';

  // Make the request
  request(url, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }

    let items = body.findItemsByKeywordsResponse[0].searchResult[0].item
    if (items) {
      items = items[0];
    }
    console.log(items);
  });
}


module.exports = app;
