'use strict';

var express = require('express');
var app = express();
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 http://www.w3schools.com/js/js_strict.asp
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');


/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  hello: hello
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
/*function hello(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var name = req.swagger.params.name.value || 'stranger';
  var hello = util.format('Hello, %s!', name);

  // this sends back a JSON response which is a single string
  res.json(hello);
}*/

function hello(res) {
    var GitHubApi = require("github");

    var github = new GitHubApi({
        // required
        version: "3.0.0"
    });

    //github.authenticate({
    //    type: "basic",
    //    username: "shawnmccarthy",
    //    password: "password"
    //});

    var token = "6ef79b2a2cec73c1513db6cea7d4ed26af3bc3db";

    github.authenticate({
        type: "oauth",
        token: token
    });

    res.json(github.user.get({ user: 'aberhane13'} , function(err, res) {
        console.log("GOT ERR?", err);
        console.log("GOT RES?", res);

        github.repos.getAll({}, function(err, res) {
            console.log("GOT ERR?", err);
            console.log("GOT RES?", res);
        });
    }));


}


