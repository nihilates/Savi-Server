const request = require('request');
const fs = require('fs');
const path = require('path');

const respondDBQuery = (dbResponse, req, res) => {
  if (!dbResponse) {
    res.status(500).send('No DB Entries matched the request');
  } else {
    res.json(dbResponse).end();
  }
}

const respondDBError = (DBError, req, res) => {
  res.json({error: DBError}).status(500).send;
}

const saveImage = (imageURL, imageName) => {
  let validHeaders = {
    jpg: 'ffd8ffe0',
    png: '89504e47',
    gif: '47494638'
  };

  let options = {
    method: 'GET',
    url: imageURL,
    encoding: null
  }

  request(options, (err, res, body) => {
    if (err) {
      console.log('false because error on get')
      return false;
    } else {
      let bodyHeader = body.toString('hex', 0, 4);
      if (bodyHeader === validHeaders.jpg) {
        imageName += '.jpg';
      } else if (bodyHeader === validHeaders.png) {
        imageName += '.png';
      } else if (bodyHeader === validHeaders.gif) {
        imageName += '.gif'
      } else {
        console.log('false because bad format');
        return false;
      }
    }
  });
  var fullPath = path.join(__dirname, '/img/' + imageName);
  return new Promise((resolve, reject) => {
    console.log('WHAT');
    fs.writeFile(fullPath, body, (err) => {
      if (err) {
        console.log('ERROR');
        reject(err);
      } else {
        console.log('GOOD TO GO');
        resolve(imageName);
      }
    });
  }).catch((err) => {
    console.log(err);
  });
}

module.exports = {
  respondDBQuery: respondDBQuery,
  respondDBError: respondDBError,
  saveImage: saveImage
}