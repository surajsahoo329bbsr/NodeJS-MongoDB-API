const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const courseModel = mongoose.model("Course");

router.get("/add", (req, res) => {
    res.render("add-course");
});

router.post("/add", (req, res) => {
    //res.render("add-course");
    console.log(req.body);

    var course = new courseModel();
    course.courseName = req.body.courseName;
    course.courseDuration = req.body.courseDuration;
    course.courseId = Math.ceil(Math.random() * 156);

    course.save((err, doc) => {
        if(!err){
            res.redirect("/course/list");
        }
        else{
            res.send("Error");
        }           
    })
});

router.get("/list", (req, res) => {
    
    //var course = new courseModel();
    //course.courseName = "JS";
    //course.courseId = "CSE1045";
    //course.save();
    
    courseModel.find((err, docs) => {
        if(!err){
            //console.log(docs);
            res.render("list", {data:docs});
        }
    })
});

module.exports = router;