const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ProductData = require('../models/Productdata');


router.post('/register',(req,res)=>{
    let userData = req.body
    let user = new User(userData)
    user.save((error,registeredUser)=>{
        if(error){
            console.log(error)
        }
        else{
            let payload ={ subject: registeredUser._id}
            let token = jwt.sign(payload,'secretKey')
            res.status(200).send({token})
        }
    })
})
router.post('/login',(req,res)=>{
    let userData = req.body

    User.findOne({email:userData.email},(error,user)=>{
        if(error){
            console.log(error)
        }
        else{
            if(!user){
                res.status(401).send('Invalid Email')
            }
            else if(user.password !== userData.password){
                res.status(401).send('Invalid Password');
            }
            else{
                let payload = { subject: user._id }
                let token = jwt.sign(payload,'secretKey')
                res.status(200).send({token})
            }
        }
    })


//new
//update

// router.post('/create',(req,res , next)=>{
//     var product = new ProductData({
//         productId: req.body.productId,
//         productName: req.body.productName,
//         productCode: req.body.productCode,
//         releaseDate: req.body.releaseDate,
//         description: req.body.description,
//         price: req.body.price,
//         starRating: req.body.starRating,
//         imageUrl: req.body.imageUrl
        
//     });
//     product.save((err,product)=>{ //loading to the database if true.
//         if(err)
//             res.status(500).json({errmsg:err});
//         res.status(200).json({msg:product});
//     });
    
// });

// router.get('/read',(req,res , next)=>{
//     Product.find({},(err,productes)=>{
//         if(err)
//         res.status(500).json({errmsg:err});
//     res.status(200).json({msg:productes});  
//     });
    
// });


// router.put('/update',(req,res , next)=>{
//     Product.findById(req.body._id,(err,product)=>{
//         if(err)
//         res.status(500).json({errmsg:err})
//         product.productId= req.body.productId;
//         product.productName= req.body.productName;
//         product.productCode= req.body.productCode;
//         product.releaseDate= req.body.releaseDate;
//         product.description= req.body.description;
//         product.price= req.body.price;
//         product.starRating= req.body.starRating;
//         product.imageUrl= req.body.imageUrl;
//         product.save((err,product)=>{
//             if(err)
//              res.status(500).json({errmsg: err});

//          res.status(200).json({msg: product}); 
//         });
//    // res.status(200).json({msg:product});  
//     });
//    // res.status(200).json({msg:'Update request working'});
// });


// router.delete('/delete/:id',(req,res , next)=>{
//     Product.findOneAndRemove({_id:req.params.id},(err,product)=>{
//         if(err)
//             res.status(500).json({errmsg: err});

//     res.status(200).json({msg: product});   
//     });
//    // res.status(200).json({msg:'delete request working'});
// });
// var {Productdata}=require('../models/Productdata');

// router.get('/products',(req,res)=>{
//     products.find((err,doc)=>{
//         if(!err){res.send(doc);}
//         else{console.log('Error :'+JSON.stringify(err,undefined,2))}
//     });
// })

// router.post('/products',(req,res)=>{
//     var products = new products({
//         productId : req.body.productId,
//         productName : req.body.productName,
//         productCode : req.body.productCode,
//         releaseDate : req.body.releaseDate,
//         description : req.body.description,
//         price : req.body.price,
//         starRating : req.body.starRating,
//         imageUrl : req.body.imageUrl
//     })
//     products.save((err,doc)=>{
//         if(!err){res.send(doc);}
//         else{console.log('Error :'+JSON.stringify(err,undefined,2))}
//     });
// })

//  // Delete employee
// router.delete('products/:id',(req, res) => {
//     products.findByIdAndRemove(req.params.id, (error, data) => {
//         console.log('fp');
//       if (!error) {
//         res.send(doc)}
//     else{console.log('Error :'+JSON.stringify(err,undefined,2))}
      
//     })
//   })

 
})

module.exports = router;