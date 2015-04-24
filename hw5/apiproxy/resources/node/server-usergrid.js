var usergrid = require('usergrid');
var express = require('express');
var app = express();

var myClient = new usergrid.client({
    orgName:'aberhane13',
    appName:'sandbox'
});


//Retrieve specific entity
app.all('/gets', function(req, res) {
  
  
	var connecting_entity_options = {
	    client: myClient,
	    data: {
    	    type:'reviews',
	        //username:'aberhane13',
    	  	title: req.query.title
   		 }
	};
	var connecting_entity = new usergrid.entity(connecting_entity_options);

	// create an entity object that models the entity being connected to
	var connected_entity_options = {
	    client: myClient,
	    data: {
	        type:'movies',
	        //username:'aberhane13',
	      	title: req.query.title
 	   }
	};
	var connected_entity = new usergrid.entity(connected_entity_options); 

	// the connection type
	var relationship = 'likes';

	//If reviews query equals true, connect reviews entity with movie entitity
	if(req.query.reviews == "true")
	{
		// send the POST request
		connecting_entity.connect(relationship, connected_entity, function (error, result) {

		if (error) { 
        // Error
		} 
          else { 
		// Success
		}

		});
  
	}
	var relationship2 = 'connections';
	connected_entity.getConnections(relationship2, function (error, result) {
      
		if (error) { 
        	// Error
     		res.send("error");
    	} 
      else { 
      	// Success
      	res.send(result);
      }

	});
  
 
});


app.listen(3000);






