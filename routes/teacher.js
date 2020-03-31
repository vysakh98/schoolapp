var express = require('express');
var router = express.Router();
var formidable=require('formidable')
var fs=require('fs')
var con=require("../lib/connection")
router.get("/list",function (req,res) {
	var username=sessionData.user.username
	con.query('select * from teach',function(err,results){
	if(err){
	}
	else{
		if(results.length==0){
			res.render("./teacher/list",{tbody:false,table:true,username:username})
		}

		else if(results.length>0){
								var propicurl=
								console.log(results)
								res.render("./teacher/list",{results:results,table:false,tbody:true,username:username})

									}
								}
							});
});
						


/* get stream insert page*/

router.get("/insert",function(req,res){
	var username=sessionData.user.username
	var sql="select * from dept"
	con.query(sql,function(err,results){
	if(err){
		console.log(err)
			}
	else{
		console.log(results)
	res.render("./teacher/insert",{username:username,results:results})
}

});
});

var count=0
/*stream insert*/
router.post("/insert",function(req,res){
	count=count+1
	console.log(count)
	const form = formidable({ multiples: false, uploadDir: './public/images' });
	form.parse(req, (err, fields, files) => {
		if(err){
			console.log(err)
		}
	var Oldfilename=files.Profilepic.path
	console.log(Oldfilename)
	/*var Newfilename=''
	var splitarray=files.Profilepic.path.split('/')
	for(var i=1;i<(splitarray.length)-1;i++){
	 Newfilename +='/'+splitarray[i]
	}
	console.log(Newfilename)*/
	var teacherarray=[]
	var doj=fields.doj
	var deptid=fields.deptname
	var name=fields.name
	var qualification=fields.qualification
	var phone=fields.phone
	var address=fields.address
	var email=fields.email
	var subject=fields.subject
	var password=fields.password;
	var tid=name+subject+count
	var Changedfilename='public'+'/'+'images'+'/'+tid+'.jpg'
	console.log(Changedfilename)
	fs.rename(Oldfilename,Changedfilename,function(err){
		if(err){
			console.log(err)
		}
		else{
			console.log('succcess')
		}
	});
	var Filenameforloading='../images/'+tid+'.jpg'
	teacherarray.push(tid)
	teacherarray.push(name)
	teacherarray.push(qualification)
	teacherarray.push(deptid)
	teacherarray.push(phone)
	teacherarray.push(address)
	teacherarray.push(doj)
	teacherarray.push(email)
	teacherarray.push(subject)
	teacherarray.push(password)
	teacherarray.push(Filenameforloading)
	var sql="INSERT INTO teach(tid,tname,qualification,deptid,phone,address,dob,email,subject,pasword,propicurl) VALUES(?)";
con.query(sql,[teacherarray],function(err,results){
	if(err){
		console.log(err)
		count=count-1
	}
	else{
	}

});
redirect_url="/teacher/list"
res.redirect(redirect_url)
});
});

/* delete get request */

router.get("/delete/:id",function (req,res) {
	var username=sessionData.user.username
	var id=req.params.id
	var sql="select * from teach where tid=?";
	con.query(sql,[id],function(err,results){
		if(err){
			console.log(err)
		}
		else{
			res.render("./teacher/delete",{id:id,username:username,results:results})
		}
	});
});
router.post("/delete/:id",function(req,res){
	var username=sessionData.user.username
	console.log(username)
	var id=req.params.id
	var Actiontype=req.body.Deleteaction
	console.log(Actiontype)
	console.log(id)
	var delefile='./public/images/'+id+'.jpg'
	if(Actiontype=='no'){
		res.redirect("/teacher/list")
	}
	else if(Actiontype=='yes'){
		var sql2= 'delete from teach where tid=?'
		con.query(sql2,[id],function(err,results){
			if(err){
				res.render("./stream/database-error")
			}
			else{
				fs.unlink(delefile, function (err) {
					if(err){
						console.log(err)
					}
				console.log('delete successfull')
				console.log(results)
		});


	}
	});
		res.redirect("/teacher/list")
	
	}
});

module.exports=router
