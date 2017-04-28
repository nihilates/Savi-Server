const helpers = require('../helpers');

module.exports = function(app, db) {

  app.get('/api/images/:imageName', (req, res) => {
    let imageName = req.params.imageName;
    let exists = fs.existsSync(path.join(__dirname, '/img/' + imageName));
    if (imageName && exists) {
      res.sendFile(path.join(__dirname, '/img/' + imageName));
    } else if (!exists) {
      res.status(404).send(JSON.stringify('Image does not exist'));
    } else {
      res.status(400).send(JSON.stringify('Invalid param string'));
    }
  });
}