var express = require('express');
var router = express.Router();
var con=require("../lib/connection")
router.get("/list",function (req,res) {
	var username=sessionData.user.username
	con.query('select * from  stream ',function(err,results){
	if(err){
	}
	else{
		console.log(results)
		if(results.length==0){
			res.render("./stream/stream",{tbody:false,table:true,username:username})
		}

		else if(results.length>0){
				res.render("./stream/stream",{results:results,table:true,tbody:true,username:username})
				}
	}
});
});


/* get stream insert page*/


router.get("/insert",function(req,res){
	var username=sessionData.user.username
	res.render("./stream/insert",{username:username})

});


/*stream insert*/


router.post("/insert",function(req,res){
	var streamarray=[]
	var streamid=req.body.streamid
	var stream=req.body.stream
	streamarray.push(streamid)
	streamarray.push(stream)
	var sql="INSERT INTO stream(streamid,stream) VALUES(?)";
con.query(sql,[streamarray],function(err,results){
	if(err){
	}
	else{
		console.log(results)
	}

});
redirect_url="/stream/list"
res.redirect(redirect_url)
});

/* delete get request */

router.get("/delete/:id",function (req,res) {
	var username=sessionData.user.username
	var id=req.params.id
	var sql="select * from stream where streamid=?";
	con.query(sql,[id],function(err,results){
		if(err){
		}
		else{
			res.render("./stream/delete",{id:id,username:username,results:results})
		}
	});
	
	/*var sql2= 'delete from stream where streamid=?'
		con.query(sql2,[id],function(err,results){
			if(err){
				throw err
			}
			else{
				console.log(results)
	}
	});
		res.redirect("/stream/show")
	*/
	});


/* delete post */

router.post("/delete/:id",function(req,res){
	var id=req.params.id
	var Actiontype=req.body.Deleteaction
	console.log(Actiontype)
	console.log(id)
	if(Actiontype=='no'){
		res.redirect("/stream/list")
	}
	else if(Actiontype=='yes'){
		var sql2= 'delete from stream where streamid=?'
		con.query(sql2,[id],function(err,results){
			if(err){
				res.render("./stream/database-error")
			}
			else{
				console.log(results)

	}
	});
		res.redirect("/stream/list")
	
	}
});


/* update get request */

router.get("/update/:id",function(req,res){
	var username=sessionData.user.username
	var id=req.params.id

	var sql="select * from stream where streamid=? ";
	con.query(sql,[id],function(err,values){
		if(err){
		}
		else{
				console.log(values)
				res.render("./stream/update",{values:values,id:id,username:username})
		}
	});

});


/* update post */


router.post("/update/:id",function(req,res){
	var id=req.params.id
	console.log(id)
	var name=req.body.stream
	var streamid=req.body.streamid
	console.log(name)
	console.log(streamid)
	var sql="update stream set streamid=?,stream=? where streamid=?"
	con.query(sql,[streamid,name,id],function(err,results){
		if(err){
		}
		else{
			console.log(results)
			res.redirect("/stream/list")
		}
	});
});

module.exports = router;
