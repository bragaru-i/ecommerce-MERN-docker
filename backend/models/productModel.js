const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'A product must have a name'],
    },
    productId: {
      type: String,
      required: [true, 'A product must have an ID'],
      unique: [true, 'ID must be unique! Please check. We have a conflict!'],
    },
    category: {
      type: String,
      enum: {
        values: ['jewellery', 'watches', 'eyewear'],
        message: "Choose between 'jewellery', 'watches', 'eyewear' ",
      },
      required: [true, 'Please add a category to product'],
    },
    subcategories: {
      type: String,
      enum: {
        values: ['rings', 'earrings', 'necklaces', 'charms-bracelets'],
        message: "Choose between 'rings', 'earrings', 'necklaces', 'charms-bracelets' ",
      },
      required: false,
    },
    is: {
      new: {
        type: Boolean,
        default: true,
        required: true,
      },
      topRated: {
        type: Boolean,
        default: false,
        required: true,
      },
      mostPopular: {
        type: Boolean,
        default: false,
        required: true,
      },
    },
    price: {
      isDiscounted: Boolean,
      amount: {
        type: Number,
      },

      discount: {
        percent: {
          type: Number,
          min: 1,
          max: 99,
        },
        amount: {
          type: Number,
          min: 1,
        },
      },
      total: Number,
    },
    description: {
      type: String,
      required: [true, 'Please enter a product description.Min 20 characters length'],
      minlength: 30,
    },
    inStock: { type: Boolean, required: true, default: true },
    images: { type: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// On .save() and create() we modify is.discounted => DISCOUNTS MIDDLEWARE
productSchema.pre('save', function (next) {
  if (this.price.discount) {
    if (this.price.discount.amount) {
      this.price.total = this.price.amount - this.price.discount.amount;
      this.price.isDiscounted = true;
      delete this.price.discount.percent;
    }
    if (this.price.discount.percent) {
      this.price.total = parseFloat(
        this.price.amount * (1 - this.price.discount.percent / 100)
      );
      this.price.isDiscounted = true;
      delete this.price.isDiscounted;
    }
  } else this.price.isDiscounted = false;
  next();
});

//TO implemet:  COUNT VISITS

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
