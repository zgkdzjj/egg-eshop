'use strict';

// had enabled by egg
// exports.static = true;

exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportGithub = {
  enable: true,
  package: 'egg-passport-github',
};

exports.passportLocal = {
  enable: true,
  package: 'egg-passport-local',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

exports.jwt = {
  enable: true,
  package: 'egg-jwt'
}

exports.bcrypt = {
  enable: true,
  package: 'egg-bcrypt'
}

exports.cors = {
  enable: true,
  package: 'egg-cors',
}

// config/plugin.js
exports.oss = {
  enable: true,
  package: 'egg-oss',
};
