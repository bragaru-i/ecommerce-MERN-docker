class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  filter() {
    let queryObj = { ...this.queryStr };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((item) => delete queryObj[item]);
    const partQueryKeys = Object.keys(queryObj);
    //DEFINING PARTIAL QUERY SEARCH WITH REGEX
    partQueryKeys.forEach((key) => {
      if (key === 'firstName' || key === 'lastName' || key === 'cId') {
        let value = queryObj[key] + '';
        queryObj[key] = { $regex: value, $options: 'i' };
      }
    });
    this.query.find(queryObj);
    return this;
  }
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query.sort('-registerDate');
    }
    return this;
  }
  fields() {
    if (this.queryStr.fields) {
      let fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  paginate() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 20;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;
