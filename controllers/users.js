const User = require('../models/user');

module.exports.renderRegister = (req,res,next)=>{
    res.render('users/register');
 }

 module.exports.register = async (req,res)=>{
    try{
    const {email,password,username} = req.body;
   const user = new User({email,username})
   const registerUser = await User.register(user,password);
   req.login(registerUser, err =>{
     if(err) return next(err);
     req.flash('success','Welcome To Yelp-Camp!!');
     res.redirect('/campgrounds');
   })
 
    } catch(e){
 
       req.flash('error', e.message);
       res.redirect('register');
    }
  
  }


  module.exports.renderLogin = (req,res)=>{
    res.render('users/login')
  }


  module.exports.login = (req,res)=>{
    req.flash('success','Welcome back!!')
   const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
 
  }

 module.exports.logout =  (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
  }