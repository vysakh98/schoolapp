var express = require('express');
var router = express.Router();
var con=require("../lib/connection")
router.get("/list",function (req,res) {
	var username=sessionData.user.username
	con.query('select * from dept ',function(err,results){
	if(err){
	}
	else{
		console.log(results)
		if(results.length==0){
			res.render("./department/list",{tbody:false,table:true,username:username})
		}

		else if(results.length>0){
				var sql="select tname from dept,teach where dept.hod=teach.tid"
				res.render("./department/list",{results:results,table:true,tbody:true,username:username})
				}
	}
});
});


/* get dept insert page*/


router.get("/insert",function(req,res){
	var username=sessionData.user.username
	res.render("./department/insert",{username:username})

});


/*dept insert*/


router.post("/insert",function(req,res){
	var deptarray=[]
	var deptname=req.body.deptname
	if(req.body.hod==null){
		var hod='not assigned'
	}
	else{
	var hod=req.body.hod
	}
	if(deptname=='BIO1'){
		var deptid='BIO1'
	}
	if(deptname=='CSE1'){
		var deptid='CSE1'
	}
	if(deptname=='ECNOMICS1'){
		var deptid='ECNOMICS1'
	}
	deptarray.push(deptid)
	deptarray.push(deptname)
	deptarray.push(hod)
	var sql="INSERT INTO dept(deptid,deptname,hod) VALUES(?)";
con.query(sql,[deptarray],function(err,results){
	if(err){
	}
	else{
		console.log(results)
	}

});
redirect_url="/department/list"
res.redirect(redirect_url)
});

/* delete get request */

router.get("/delete/:id",function (req,res) {
	var username=sessionData.user.username
	var id=req.params.id
	var sql="select * from dept where deptid=?";
	con.query(sql,[id],function(err,results){
		if(err){
		}
		else{
			res.render("./department/delete",{id:id,username:username,results:results})
		}
	});
	
	/*var sql2= 'delete from dept where deptid=?'
		con.query(sql2,[id],function(err,results){
			if(err){
				throw err
			}
			else{
				console.log(results)
	}
	});
		res.redirect("/dept/show")
	*/
	});


/* delete post */

router.post("/delete/:id",function(req,res){
	var id=req.params.id
	var Actiontype=req.body.Deleteaction
	console.log(Actiontype)
	console.log(id)
	if(Actiontype=='no'){
		res.redirect("/department/list")
	}
	else if(Actiontype=='yes'){
		var sql2= 'delete from dept where deptid=?'
		con.query(sql2,[id],function(err,results){
			if(err){
				res.render("./department/database-error")
			}
			else{
				console.log(results)

	}
	});
		res.redirect("/department/list")
	
	}
});


/* update get request */

router.get("/update/:id",function(req,res){
	var username=sessionData.user.username
	var id=req.params.id

	var sql="select * from dept where deptid=? ";
	con.query(sql,[id],function(err,values){
		if(err){
		}
		else{
				console.log(values)
				res.render("./department/update",{values:values,id:id,username:username})
		}
	});

});


/* update post */


router.post("/update/:id",function(req,res){
	var id=req.params.id
	console.log(id)
	var hod=req.body.hod
	var deptid=req.body.deptid
	var deptname=req.body.deptname
	console.log(deptid)
	var sql="update dept set deptid=?,deptname=?,hod=? where deptid=?"
	con.query(sql,[deptid,deptname,hod,id],function(err,results){
		if(err){
			console.log(err)
		}
		else{
			console.log(results)
			res.redirect("/department/list")
		}
	});
});


router.get("/hod",function(req,res){
	val=req.query.search;
	console.log(val)
	var sql="select tname,tid from teach where deptid=?;"
	con.query(sql,[val],function(err,results){
		if(err){
			console.log(err)
		}
		else{
			res.send(results)
		}
	});
});

module.exports = router;
