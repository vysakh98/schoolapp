var express = require('express');
var router = express.Router();
var con=require("../lib/connection")

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index',{err:false});
});


/*user verification*/

router.post("/",function(req,res){
table=false;
var username =req.body.username;
var password=req.body.password;
		var sql="select*from users where username=? and password=?";
		con.query(sql,[username,password],function(err,results){
			if(err){
				console.log('error')
			}
			else{
				console.log(results.length)
				console.log(results)
				if(results.length==1){
					sessionData = req.session;
  					sessionData.user = {};
					sessionData.user.username=username
					console.log(sessionData)
					console.log('login successfull')
					console.log(results)
					results.forEach(function(result){
								var userType=result.usertype
								if(userType=="Admin"){
								var redirect_url='/stream/list'
								res.redirect(redirect_url)
							}
							});

						}
				else if(results.length==0){
					res.render("index",{err:true})
				}
			}
			});
		});


/*log out route*/


router.get("/logout",function(req,res){
	sessionData.user=null
	console.log(sessionData.user)
	res.redirect("/")
})

module.exports = router;


