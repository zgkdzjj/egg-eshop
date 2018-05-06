'use strict';

module.exports = appInfo => {
  const config = exports = {};
  config.passportGithub = {
    key: 'your-clientID',
    secret: 'your_clientSercet',
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1520117340921_4179';

  // add your config here
  config.middleware = ['errorHandler'];

  // Disable csrf
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['http://localhost:7001', 'http://localhost:4200','http://localhost:8100'],
  };

  // Content to mongoose
  config.mongoose = {
    client: {
      url: 'mongodb://localhost/eggshop',
      // url: 'mongodb://secret@ds161459.mlab.com:61459/zgkdzjjeshop',
      options: {},
    },
  };

  // jwt
  config.jwt = {
    secret: 'secret',
    enable: true,
    match: '/jwt'
  }

  // bcrypt salt
  config.bcrypt = {
    saltRounds: 10
  }

  // normal oss bucket
  config.oss = {
    client: {
      accessKeyId: 'secret',
      accessKeySecret: 'sercet',
      bucket: 'zgkdzjjeshoppub',
      endpoint: 'oss-ap-southeast-2.aliyuncs.com',
      timeout: '60s',
    },
  };

  config.multipart = {
    fileSize: '50mb',
  }


  return config;
};

