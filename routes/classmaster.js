var express = require('express');
var router = express.Router();
var con=require("../lib/connection")
router.get("/list",function (req,res) {
	var username=sessionData.user.username
	con.query('select classmaster.class,classmaster.block,classmaster.classid,classmaster.roomno,classmaster.streamid,stream.stream,stream.streamid from classmaster,stream  where classmaster.streamid=stream.streamid',function(err,results){
	if(err){
	}
	else{
		console.log(results)
		if(results.length==0){
			res.render("./classmaster/list",{tbody:false,table:true,username:username})
		}

		else if(results.length>0){
								console.log(results)
								res.render("./classmaster/list",{results:results,table:true,tbody:true,username:username})

									}
								}
							});
});
						


/* get stream insert page*/

router.get("/insert",function(req,res){
	var id='class'+Math.floor(Math.random() * 100)
	var username=sessionData.user.username
	var sql="select * from stream";

	con.query(sql,function(err,results){
	if(err){
		console.log(err)
			}
	else{
		console.log(results)
	res.render("./classmaster/insert",{username:username,results:results})
}

});
});


/*stream insert*/
router.post("/insert",function(req,res){
	var classmasterarray=[]
	var clas=req.body.class
	var blockno=req.body.blockno
	var streamid=req.body.sid
	var roomno=req.body.roomno
	var classid='class'+roomno+blockno
	classmasterarray.push(classid)
	classmasterarray.push(clas)
	classmasterarray.push(streamid)
	classmasterarray.push(roomno)
	classmasterarray.push(blockno)
	console.log(classmasterarray)
	var sql="INSERT INTO classmaster(classid,class,streamid,roomno,block) VALUES(?)";
con.query(sql,[classmasterarray],function(err,results){
	if(err){
		console.log(err)
	}
	else{
		console.log(results)
	}

});
redirect_url="/classmaster/list"
res.redirect(redirect_url)
});

/* delete get request */

router.get("/delete/:id",function (req,res) {
	var username=sessionData.user.username
	var id=req.params.id
	var sql="select * from classmaster where classid=?";
	con.query(sql,[id],function(err,results){
		if(err){
			console.log(err)
		}
		else{
			res.render("./classmaster/delete",{id:id,username:username,results:results})
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
	var username=sessionData.user.username
	console.log(username)
	var id=req.params.id
	var Actiontype=req.body.Deleteaction
	console.log(Actiontype)
	console.log(id)
	if(Actiontype=='no'){
		res.redirect("/classmaster/list")
	}
	else if(Actiontype=='yes'){
		var sql2= 'delete from classmaster where classid=?'
		con.query(sql2,[id],function(err,results){
			if(err){
				res.render("./stream/database-error")
			}
			else{
				console.log(results)

	}
	});
		res.redirect("/classmaster/list")
	
	}
});


/* update get request */

router.get("/update/:id",function(req,res){
	var username=sessionData.user.username
	var id=req.params.id

	var sql="select * from classmaster where classid=? ";
	con.query(sql,[id],function(err,values){
		if(err){
			res.render("./stream/database-error")
		}
		else{
				var sql="select * from stream";
				con.query(sql,function(err,results){
					if(err){
						console.log(err)
					}
					else{
						console.log(values)
						console.log(results)
						res.render("./classmaster/update",{values:values,id:id,username:username,results:results})
					}
				});
		}
	});

});


/* update post */


router.post("/update/:id",function(req,res){
	var id=req.params.id
	console.log(id)
	var clas=req.body.class
	var block=req.body.block
	var streamid=req.body.streamid
	var roomno=req.body.roomno
	var streamid=req.body.streamid
	var classid='class'+block+roomno
	var sql="update classmaster set classid=?,class=?,streamid=?,roomno=?,block=? where classid=?"
	con.query(sql,[classid,clas,streamid,roomno,block,id],function(err,results){
		if(err){
			console.log(err)
		}
		else{
			console.log(results)
			res.redirect("/classmaster/list")
		}
	});
});

module.exports = router;
