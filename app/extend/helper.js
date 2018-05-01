'use strict';
const moment = require('moment');

// Format time
exports.formatTime = time => moment(time).format('YYYY-MM-DD hh:mm:ss');

// Handle successfull response
exports.success = ({ ctx, res = null, msg = 'Your request was successful' }) => {
  ctx.body = {
    code: 0,
    data: res,
    msg,
  };
  // ctx.status = 200;
};
