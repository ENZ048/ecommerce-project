const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true }, // INR
  discountPercentage: { type: Number },
  rating: { type: Number },
  stock: { type: Number },
  tags: [{ type: String }],
  brand: { type: String },
  sku: { type: String },
  weight: { type: Number },
  dimensions: {
    width: { type: Number },
    height: { type: Number },
    depth: { type: Number },
  },
  warrantyInformation: { type: String },
  shippingInformation: { type: String },
  availabilityStatus: { type: String },
  reviews: [
    {
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      date: { type: Date, required: true },
      reviewerName: { type: String, required: true },
      reviewerEmail: { type: String, required: true },
    },
  ],
  returnPolicy: { type: String },
  minimumOrderQuantity: { type: Number },
  meta: {
    createdAt: { type: Date },
    updatedAt: { type: Date },
    barcode: { type: String },
    qrCode: { type: String },
  },
  images: [{ type: String }],
  thumbnail: { type: String },
}, {
  timestamps: true
});

const Product = mongoose.model("ProductsModel", productSchema);

module.exports = Product;
