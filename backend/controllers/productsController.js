const multer = require('multer');
const Product = require('../models/productModel');

const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsyns');

// //////////////// Uploading photos with multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/images');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    console.log(`product-${req.params.id}--${Date.now()}.${ext}`);
    cb(null, `product-${req.params.id}--${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    return cb(null, true);
  } else cb(new AppError('The file provided is not an image', 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductPhoto = upload.single('images');
//  ////////////////////////END UPLOAD PHOTOS

// Get All Products
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .fields()
    .paginate();
  const products = await features.query;
  res.status(200).json({
    data: products,
    status: 'success',
    results: products.length,
  });
});

// Create a new product

exports.createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    data: product,
  });
});

// ->>>>>> Get Product by id
exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  console.log('product is', product);
  if (!product) return next(new AppError('No product found with that ID', 404));

  res.status(201).json({
    status: 'success',
    data: { product },
  });
});

// Update Product

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id);
  if (!product) return next(new AppError('No product found with that ID', 404));
  console.log(req.params.id);
  console.log(req.body);
  res.status(201).json({
    status: 'succes',
    data: { product },
  });
});
