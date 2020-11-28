const {
  DATABASE_CLIENT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
} = process.env;

exports.options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

exports.url = `${DATABASE_CLIENT}://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?authSource=admin`;
