var usergrid = require('usergrid');
var express = require('express');
var app = express();

var client = new usergrid.client({
    orgName:'aberhane13',
    appName:'sandbox'
});

app.all('/gets', function(req, res){
  
  var properties = {  
	type:'movies',
    name: req.query.title,

}; 
  
  var properties2 = {
    type: 'reviews',
    name: req.query.title
  };
  
  client.getEntity(properties, function(err, existingUser){
  	if (err){
      
      res.send("Cannot get first entity");
      
        
    } 
    else {
      
      client.getEntity(properties2, function(err2, existingUser2){
        if(err2){
          res.send("Cannot get second entity");
        }
      	else{
          
          //Make connection if query string reviews = true
          if(req.query.reviews == "true")
          {
      		existingUser.connect('connections', existingUser2, function (err3, data) {
    			if (err3) {
    			 // Error - connection not created
    		 	 res.send("Cannot connect");
   		 		} 
            	else {
				
                 res.send(data);

   			 	}
      		});
          }
          
          //Display the entity without the connection
          else{
            res.send(existingUser);
          }
         
    }

  
	});
    }
  });
});

app.listen(3000);






