const https = require('https');

const options = {
  hostname: 'iplocation.com',
  port: 443,
  path: '/',
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
};

const getLocationInfos = (clientIP, cb) => {
  const req = https.request(options, (res) => {
    res.on('data', (locationDataRaw) => {
      console.log('--->', locationDataRaw.toString());
      const locationData = JSON.parse(locationDataRaw.toString());

      console.log('Location data:');
      console.log(locationData);

      cb(locationData);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });

  req.write(`ip=${clientIP}`);

  req.end();
};

module.exports = {
  getLocationInfos,
};
