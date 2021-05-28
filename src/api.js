/* eslint-disable no-unused-expressions */
/* eslint-disable indent */
/* eslint-disable camelcase */
/* eslint-disable max-len */
// eslint-disable-next-line strict
const express = require('express');
const encoding = require('encoding');
const serverless = require('serverless-http');
const cors = require('cors');
const path = require('path');
const app = express();
const router = express.Router();
const https = require('https');
var fs = require('fs');
var request = require('request');
var axios = require('axios');
// CRYPT
const crypto = require('crypto');
let hash = crypto.createHash('md5').update('g3el93D5T3OOMvqPMdglFQUDs').digest('hex');
console.log(hash);
const secret = hash.toUpperCase();
console.log(secret);
// END CRYPT
// var mysql = require('mysql');

const firebase = require('firebase-admin');
const Credentials = require('../Perfect/key.json');
// var appfirebase = firebase.initializeApp();
const firebaseconfig = {

    apiKey: 'AIzaSyCMQyDcapa0t6rAzqYfoKFXqAaA84NBk6o',
    authDomain: 'investy-b139a.firebaseapp.com',
    projectId: 'investy-b139a',
    storageBucket: 'investy-b139a.appspot.com',
    messagingSenderId: '727451194943',
    appId: '1:727451194943:web:ff884b3d80928a9c3b8a8a',
    measurementId: 'G-ZB3V5QNL7X',
};

firebase.initializeApp(
  {credential: firebase.credential.cert(Credentials),
    storageBucket: firebaseconfig.storageBucket,
  }
);
const firestore = firebase.firestore();

const config = require('../Perfect/config');

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

router.get('/', cors(), (req, res) => {
 // res.sendFile(path.join(__dirname + '/index.html'));
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
  const PAYMENT_AMOUNT = req.body.PAYMENT_AMOUNT;
  console.log('GET_PAYMENT_AMOOOOOOOOOOOUNT=', config.PerfectConfig.PAYMENT_AMOUNT);
  // GET PAYMENT_AMOOOOOOOUNT
  /*
  const snapshot =  firestore.collection('Payment').doc('perfectUSD').get();
  snapshot.then((value) => {
    console.log('firebase value', value);
    config.PerfectConfig = value.data();
    if (value && value.data()) {
    res.json(config.PerfectConfig);
    } else {
      res.json({error: true});
    }
  }).catch((e) => {
    console.log('Err', e);
    res.send('ERR');
  });
  */
  var Data = {
    PAYEE_ACCOUNT: 'U29376327',
    PAYEE_NAME: 'Green Wallet',
    STATUS_URL: 'https://gw-pm.herokuapp.com/status.js',
    PAYMENT_URL: 'https://gw-pm.herokuapp.com/success.js',
    NOPAYMENT_URL: 'https://gw-pm.herokuapp.com/error.js',
    PAYMENT_AMOUNT: config.PerfectConfig.PAYMENT_AMOUNT,
    PAYMENT_UNITS: 'USD',
    // PAYER_ACCOUNT: PAYER_ACCOUNT,
  };

  var params = {};
  params['PAYEE_ACCOUNT'] = Data.PAYEE_ACCOUNT;
  params['PAYEE_NAME'] = Data.PAYEE_NAME;
  params['STATUS_URL'] = Data.STATUS_URL;
  params['PAYMENT_URL'] = Data.PAYMENT_URL;
  params['NOPAYMENT_URL'] = Data.NOPAYMENT_URL;
  params['PAYMENT_AMOUNT'] = Data.PAYMENT_AMOUNT;
  params['PAYMENT_UNITS'] = Data.PAYMENT_UNITS;

  var txn_url = 'https://perfectmoney.is/api/step1.asp'; // for staging
  // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production

  var form_fields = '';
  for (var x in params) {
    form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
  }

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
  res.end();
});
router.post('/', cors(), function(req, res) {
  // do something w/ req.body or req
  // res.sendFile(path.join(__dirname + '/index.html'));
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
  config.PerfectConfig.PAYMENT_AMOUNT = req.body.PAYMENT_AMOUNT;
  console.log('POOOST_PAYMENT_AMOOOOOOOOOOOUNT=', config.PerfectConfig.PAYMENT_AMOUNT);
  // ADd PAYMENT_AMOOOOOOOOUNT t fireobase

  var Data = {
    PAYEE_ACCOUNT: 'U29376327',
    PAYEE_NAME: 'Green Wallet',
    STATUS_URL: 'https://gw-pm.herokuapp.com/status.js',
    PAYMENT_URL: 'https://gw-pm.herokuapp.com/success.js',
    NOPAYMENT_URL: 'https://gw-pm.herokuapp.com/error.js',
    PAYMENT_AMOUNT: config.PerfectConfig.PAYMENT_AMOUNT,
    PAYMENT_UNITS: 'USD',
    // PAYER_ACCOUNT: PAYER_ACCOUNT,
  };

  res.send({PAYMENT: Data.PAYMENT_AMOUNT});
});

router.get('/Pay.txt', cors(), (req, res) => {
   res.sendFile(path.join(__dirname + '/Pay.txt'));
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Credentials', 'true');
   res.setHeader('Access-Control-Max-Age', '1800');
   res.setHeader('Access-Control-Allow-Headers', 'content-type');
   res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
 });

router.post('/error.js', cors(), (req, res) => {
  // Route for verifiying payment
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');

res.send('PAYMENT ERROR');

 // return res.json(Data);
});

router.get('/error.js', cors(), (req, res) => {
  // Route for verifiying payment
  res.send('PAYMENT ERROR');
});
router.post('/success.js', cors(), (req, res) => {
  // Route for verifiying payment
  const PAYEE_ACCOUNT = req.body.PAYEE_ACCOUNT;
  const PAYMENT_ID = req.body.PAYMENT_ID;
  const PAYMENT_AMOUNT = req.body.PAYMENT_AMOUNT;
  const PAYMENT_UNITS = req.body.PAYMENT_UNITS;
  const PAYMENT_BATCH_NUM = req.body.PAYMENT_BATCH_NUM;
  const PAYER_ACCOUNT = req.body.PAYER_ACCOUNT;
  const TIMESTAMPGMT = req.body.TIMESTAMPGMT;
  var Data = {
    PAYEE_ACCOUNT: PAYEE_ACCOUNT,
    PAYMENT_AMOUNT: PAYMENT_AMOUNT,
    PAYMENT_UNITS: PAYMENT_UNITS,
    PAYER_ACCOUNT: PAYER_ACCOUNT,
  };

  config.PerfectConfig.PAYEE_ACCOUNT = Data.PAYEE_ACCOUNT;
  config.PerfectConfig.PAYMENT_AMOUNT = Data.PAYMENT_AMOUNT;
  config.PerfectConfig.PAYMENT_UNITS = Data.PAYMENT_UNITS;
  config.PerfectConfig.PAYER_ACCOUNT = Data.PAYER_ACCOUNT;
  // appendFile function with filename, content and callback function
  const docRef = firestore.collection('Payment').doc('perfectUSD');

  docRef.set({
  PAYEE_ACCOUNT: config.PerfectConfig.PAYEE_ACCOUNT,
  PAYMENT_AMOUNT: config.PerfectConfig.PAYMENT_AMOUNT,
  PAYMENT_UNITS: config.PerfectConfig.PAYMENT_UNITS,
  PAYER_ACCOUNT: config.PerfectConfig.PAYER_ACCOUNT,
});
  fs.writeFile('Pay.txt', `PAYEE_ACCOUNT = ${PAYEE_ACCOUNT} --> PAYER_ACCOUNT = ${PAYER_ACCOUNT} --> PAYMENT_AMOUNT = ${PAYMENT_AMOUNT} --> PAYMENT_UNITS = ${PAYMENT_UNITS}\n`, function(err) {
    if (err) throw err;
    console.log('File is created successfully.');
  });
  res.send('SUCCESS');
});

router.get('/success.js', cors(), (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');

  const snapshot =  firestore.collection('Payment').doc('perfectUSD').get();
  snapshot.then((value) => {
    console.log('firebase value', value);
    config.PerfectConfig = value.data();
    if (value && value.data()) {
    res.json(config.PerfectConfig);
    } else {
      res.json({error: true});
    }
  }).catch((e) => {
    console.log('Err', e);
    res.send('ERR');
  });
});

// Status
router.post('/status.js', cors(), (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  let hashID = req.body.PAYMENT_ID;
  const PAYEE_ACCOUNT = req.body.PAYEE_ACCOUNT;
  const PAYMENT_ID = req.body.PAYMENT_ID;
  const PAYMENT_AMOUNT = req.body.PAYMENT_AMOUNT;
  const PAYMENT_UNITS = req.body.PAYMENT_UNITS;
  const PAYMENT_BATCH_NUM = req.body.PAYMENT_BATCH_NUM;
  const PAYER_ACCOUNT = req.body.PAYER_ACCOUNT;
  const TIMESTAMPGMT = req.body.TIMESTAMPGMT;

  hashID = crypto.createHash('md5').update(hashID).digest('hex');

  console.log('V2_HASH =', req.body.V2_HASH),
  console.log('HashID =', hashID);
  if (req.body.V2_HASH != hashID.toUpperCase()) {
    res.status(400).send('Payment Error');
    res.end('ERROR');
    console.log('ERR');
    res.json({error: true});
  } else {
    var Data = {
      PAYEE_ACCOUNT: PAYEE_ACCOUNT,
      PAYMENT_AMOUNT: PAYMENT_AMOUNT,
      PAYMENT_UNITS: PAYMENT_UNITS,
      PAYER_ACCOUNT: PAYER_ACCOUNT,
    };

    config.PerfectConfig.PAYEE_ACCOUNT = Data.PAYEE_ACCOUNT;
    config.PerfectConfig.PAYMENT_AMOUNT = Data.PAYMENT_AMOUNT;
    config.PerfectConfig.PAYMENT_UNITS = Data.PAYMENT_UNITS;
    config.PerfectConfig.PAYER_ACCOUNT = Data.PAYER_ACCOUNT;
    // appendFile function with filename, content and callback function
    const docRef = firestore.collection('Payment').doc('perfectUSD');

    docRef.set({
    PAYEE_ACCOUNT: config.PerfectConfig.PAYEE_ACCOUNT,
    PAYMENT_AMOUNT: config.PerfectConfig.PAYMENT_AMOUNT,
    PAYMENT_UNITS: config.PerfectConfig.PAYMENT_UNITS,
    PAYER_ACCOUNT: config.PerfectConfig.PAYER_ACCOUNT,
  });
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<html><head><title>Merchant Checkout Page</title></head><body><div>SUCCESS PAYMENT!!!</div></body></html>');

    fs.appendFile('Pay.txt', `PAYEE_ACCOUNT = ${PAYEE_ACCOUNT} --> PAYER_ACCOUNT = ${PAYER_ACCOUNT} --> PAYMENT_AMOUNT = ${PAYMENT_AMOUNT} --> PAYMENT_UNITS = ${PAYMENT_UNITS}\n`, function(err) {
      if (err) throw err;
      console.log('File is created successfully.');
    });
  }
});

router.get('/status.js', cors(), (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');

  const snapshot =  firestore.collection('Payment').doc('perfectUSD').get();
  snapshot.then((value) => {
    console.log('firebase value', value);
    config.PerfectConfig = value.data();
    if (value && value.data()) {
    res.json(config.PerfectConfig);
    } else {
      res.json({error: true});
    }
  }).catch((e) => {
    console.log('Err', e);
    res.send('ERR');
  });
});

router.post('/transfert.js', cors(), (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');

  config.PerfectConfig.tr_acc = req.body.AccountID;
  config.PerfectConfig.tr_pass = req.body.PassPhrase;
  config.PerfectConfig.tr_from = req.body.Payer_Account;
  config.PerfectConfig.tr_to = req.body.Payee_Account;
  config.PerfectConfig.tr_amount = req.body.Amount;
});

app.get('/transfert.js', cors(), (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');

  const AccountID = config.PerfectConfig.tr_acc;
  const PassPhrase = config.PerfectConfig.tr_pass;
  const Payer_Account = config.PerfectConfig.tr_from;
  const Payee_Account = config.PerfectConfig.tr_to;
  const Amount = config.PerfectConfig.tr_amount;

  request(`https://perfectmoney.is/acct/confirm.asp?AccountID=${AccountID}&PassPhrase=${PassPhrase}&Payer_Account=${Payer_Account}&Payee_Account=${Payee_Account}&Amount=${Amount}&PAY_IN=1`,
   function(error, response, body) {
    console.log('error:', error); // Print the error if one occurred and handle it
    console.log('statusCode:', response.body); // Print the response status code if a response was received
    res.send('success');
   });
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
