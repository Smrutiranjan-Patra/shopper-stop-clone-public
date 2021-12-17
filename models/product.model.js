const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
    Product_Id: {
    type: String,
    required: true,
    unique: true,
  },
  Product_Brand:{

    uppercase: true,
    type: String,
  },
  Product_Title:{
    type: String,
    uppercase: true,
    required: true,
  },
  Product_Image: [{
    type: String,
    required: true,
  }],
  Product_Description: {
    type: String,
    required: true,
  },
  Product_MRP: {
    type: Number,
    required: true,
  },
  Product_Price: {
    type: Number,
    required: true,
  },
  Product_Discount: {
    type: Number,
    required: true,
  },
  Product_Color:{
    type: String,
    uppercase: true,
  },
  Delivery_Type:{
    type: String,
  },
   Product_Type:{
    type: String,
    uppercase: true
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  Product_Category: {
    type: String,
    uppercase: true
  },
  OCCASION:{
    type: String,
    uppercase: true
  },
  Product_Material:{
      type:String,
      uppercase: true
  },
  Product_Contents:{
      type:String
  },
  Product_Size:[{
    type:String
  }],
  Gender:{
    type:String,
    uppercase: true,
  },
  Product_Rating:{
    type:Number, 
  },
  Age:{
      type:String,
  }


});

module.exports = mongoose.model("Product", productSchema);