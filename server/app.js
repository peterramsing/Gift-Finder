const express = require('express'); // 'cause all the cool kids are doing it
const bodyParser = require('body-parser'); // The Post must go somewhere 📬
const Conversation = require('watson-developer-cloud/conversation/v1'); // Dr. Watson I presume
const request = require('request-promise');

const app = express();

// Boot 'er up!
app.use(express.static('./../frontend/dist')); // links to Angular
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
    return res;
  }
}


app.post('/api/ebay', (req, res) => {

  let contextObject = req.body || {};
  let returnableItems;
  let foo = searchEBay(contextObject).then((eBayResponse) => {
    let items = eBayResponse.findItemsByKeywordsResponse[0].searchResult[0].item
    returnableItems = items;
  });

  Promise.all([foo]).then(() => res.json(returnableItems))
});

/**
* @param {Object} contextObject The context object from Watson
* @return {Object}              The objects returned by eBay
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
  return request({
    'method': 'GET',
    'uri': url,
    'json': true,
  });
}


module.exports = app;
