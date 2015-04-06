       'use strict';

        module.exports = {
          passwordCheck: passwordCheck
        };

        function passwordCheck(username, password, cb) {
          var passwordOk = (username === 'default' && password === '123');
          cb(null, passwordOk);
        }