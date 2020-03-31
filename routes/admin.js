var express = require('express');
var router = express.Router();
var con=require("../lib/connection")
router.get("/home",function(req,res){
var username=sessionData.user.username
res.redirect("/stream/list")
/*else{
	con.query('select count(*) as rowcount from'+'\v'+usertype+';',function(err,results){
	if(err){
		console.log(err)
	}
	else{
		console.log(results)
		if(results[0].rowcount==0){
			con.query('desc'+'\v'+usertype+';',function(err,results){
		if(err){
			console.log(err)
		}
		else{
			res.render('./admin',{results:results,tbody:false,table:true,usertype:usertype})
		}
	});

		}
		else if(results[0].rowcount>0){
			inserted=true
			con.query('desc'+'\v'+usertype+';',function(err,results){
				if(err){
					console.log(err)
				}
				else{
					con.query('select*from'+'\v'+usertype+';',function(err,values){
						console.log(values)
				res.render('./admin',{results:results,values:values,table:true,tbody:true,usertype:usertype})
				});
				}
			});
		}
	}
});
}
*/
});
module.exports = router;