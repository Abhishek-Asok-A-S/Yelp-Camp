const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");
const {isLoggedIn,isAuthor,validateCampground} = require('../middleware');
const path = require('path');
const multer = require('multer');
const {storage}= require('../cloudinary');
const upload =multer({storage});

router.route('/')
    .get(catchAsync(campgrounds.index))
     .post(isLoggedIn,upload.array('image'),validateCampground,catchAsync(campgrounds.createCampground)) 
    // .post(upload.array('image'),(req,res)=>{
    //     console.log(req.body,req.files  )
    //     res.send("its workred!!!")
    // });

router.get('/new', isLoggedIn, campgrounds.renderNewForm)    


router.route('/:id')
    .get(catchAsync(campgrounds.showCampgounds))
    .put(isLoggedIn,isAuthor,upload.array('image'),validateCampground,catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn,isAuthor, catchAsync(campgrounds.deleteCampground))

  
router.get('/:id/edit.ejs', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))
  

module.exports= router;




 