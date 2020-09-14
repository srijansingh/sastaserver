const Product = require("../models/products");
const Customer = require("../models/customer");



exports.insertCategory = (req, res, next) => {
  const title = req.body.title;
 
  const cat = new Product({
    title:title
  })
  
  cat.save()
  .then(result => {
    res.status(200).json({
      post : result
    })
    .catch(err => {
      res.json({
        type:err,
        error:'INTERNAL_ERROR'
      })
    })
  });
  
}


exports.getActiveCategory = (req, res, next) => {
    Product.find({status:"active"})
    .sort({ _id: -1 })
    .then(result => {
      res.status(200).json({
          data : result
        });
    })
    .catch(err => {
      res.json({
        type:err,
        error:'INTERNAL_ERROR'
      })
    })
};

exports.getInactiveCategory = (req, res, next) => {
  Product.find({status:"inactive"})
  .sort({ _id: -1 })
  .then(result => {
    res.status(200).json({
        data : result
      });
  })
  .catch(err => {
    res.json({
      type:err,
      error:'INTERNAL_ERROR'
    })
  })
};


exports.getAllCustomer = (req, res, next) => {
  Customer.find()
  .sort({ _id: -1 })
  .then(result => {
    console.log(result)
    res.status(200).json(
        {
      data : result
    });
  })
  .catch(err => {
    res.json({
      type:err,
      error:'INTERNAL_ERROR'
    })
  })
};

exports.removeCategory = (req, res, next) => {
  const id = req.params.id;

  Product.findByIdAndDelete(id)
  .then(response => {
    res.status(200).json({
      message:'DELETED_SUCCESSFULLY'
    })
  })
  .catch(err => {
    res.json({
      type:err,
      error:'INTERNAL_ERROR'
    })
  })
}
  
exports.activeUpdate = (req,res,next) => {
  
  const id = req.body.checkedBoxes;
  const status = 'active'
  Product.updateMany(
    { _id: { $in:id } },
    { $set: { status : `${status}` } },
    {multi: true}
 )
  .then(result => {
    res.status(200).json({
      message : 'SUCCESS',
      post : result
    })
  })
  .catch(err => {
    res.json({
      type:err,
      error:'INTERNAL_ERROR'
    })
  })
}

exports.inactiveUpdate = (req,res,next) => {
  
  const id = req.body.checkedBoxes;
  const status = 'inactive'
  Product.updateMany(
    { _id: { $in:id } },
    { $set: { status : `${status}` } },
    {multi: true}
 )
  .then(result => {
    res.status(200).json({
      message : 'SUCCESS',
      post : result
    })
  })
  .catch(err => {
    res.json({
      type:err,
      error:'INTERNAL_ERROR'
    })
  })
}
