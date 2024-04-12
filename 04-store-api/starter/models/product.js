import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'product name required']
  },
  price: {
    type: Number,
    required: [true, 'product price required']
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 4.5
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  company: {
    type: String,
    enum: {
      values: ['marcos', 'liddy', 'ikea', 'caressa'],
      message: '{VALUE} not supported'
    }
  }
});

const model = mongoose.model('Product', productSchema);

export default model;
