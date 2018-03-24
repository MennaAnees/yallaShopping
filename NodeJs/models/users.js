var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var product = require('./products.js')
var encryptPassword = require('../controllers/encryptPassword');

// users schema
var cartItems = new Schema({
  prodId: {
    type: Number,
    ref: "products"
  },
  quantity: {
    type: Number
  }
});

var users = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  picture: String, //base64
  address: String,
  cart: [cartItems],
  origin: {
    type: String,
    enum: ["FB", "G", "N"]
  }
});

users.plugin(autoIncrement.plugin, {
    model: 'users',
    startAt: 1,
});

cartItems.plugin(autoIncrement.plugin, {
    model: 'cartItems',
    startAt: 1,
});

// users plugins
users.plugin(autoIncrement.plugin, 'users');
// register login models
mongoose.model("users", users);

var UserModel = {};
UserModel.model = mongoose.model('users')
UserModel.getUsers = (callback) => {
  UserModel.model.find({}, { password: false }, (err, result) => {
    callback(err, result);
  });
}

UserModel.getUser = (Id, callback) =>{
    UserModel.model.findOne({_id:Id},{password: false}, (err, result) => {
      callback(err, result)
  })
}

UserModel.deleteUser = (Id, callback)=>{
  UserModel.model.remove({_id:Id}, (err, result)=>{
    callback(err, result)
  })
}

UserModel.deleteCart = (Id, callback)=>{
  UserModel.model.update({_id:Id},{
    $set:{
      cart: []
    }
  },(err, result)=>{
    callback(err, result)
  })
}

UserModel.addCart = (Id, cart, callback)=>{
    /* send data as 
   {"cart":[
    {"prodId":1, "quantity":60},
    {"prodId":3, "quantity":99}
   ]} */
  UserModel.model.update({_id:Id},{
    $set:{
      cart
    }
  },(err, result)=>{
      callback(err, result)
  })
}

UserModel.addUser = (data, callback)=>{

  encryptPassword.cryptPassword(data.password,(err, hashed)=>{
    data.password = hashed
    var user = new UserModel.model(data);
    var error = user.validateSync();
    console.log(error)
    user.save((err, doc)=>{
      callback(err, doc)
    });
  });
}

UserModel.editUser = (Id, data, callback)=>{
  if (data.password) {
    encryptPassword.cryptPassword(data.password,(err, hashed)=>{
      data.password = hashed
      UserModel.model.update({_id:Id}, data,(err, result)=>{
        callback(err, result)
      })
    })
  }else {
    UserModel.model.update({_id:Id}, data,(err, result)=>{
      callback(err, result)
    })
  }

}
module.exports = UserModel;
