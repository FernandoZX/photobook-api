const Model = require('./model');

const {
  parsePaginationParams,
} = require('./../../../utils/');


const responseObject = doc => ({
  sucess: true,
  post: doc,
});

exports.id = (req, res, next, id) => {
  Model.findById(id)
    .then((doc) => {
      if (doc) {
        req.doc = doc;
        next();
      } else {
        res.json({
          sucess: false,
          message: `${Model.modelName} not found`,
        });
      }
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.all = (req, res, next) => {
  const {
    query,
  } = req;

  const {
    limit,
    skip,
    page,
  } = parsePaginationParams(query);

  const count = Model.count();
  const all = Model.find().skip(skip).limit(limit);

  Promise.all([count.exec(), all.exec()])
    .then((data) => {
      const [total = 0, docs = []] = data;
      const pages = Math.ceil(total / limit);

      res.json({
        success: true,
        items: docs,
        meta: {
          limit,
          skip,
          total,
          page,
          pages,
        },
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.create = (req, res, next) => {
  const {
    body,
  } = req;

  const document = new Model(body.post);
  document.save()
    .then((doc) => {
      res.status(201);
      res.json(responseObject(doc));
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.read = (req, res, next) => {
  const {
    doc,
  } = req;

  res.json(responseObject(doc));
};

exports.update = (req, res, next) => {
  const {
    doc,
    body,
  } = req;

  Object.assign(doc, body.post);

  doc.save()
    .then((updated) => {
      res.json(responseObject(updated));
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.delete = (req, res, next) => {
  const {
    doc,
  } = req;

  doc.remove()
    .then((deleted) => {
      res.json(responseObject(deleted));
    })
    .catch((err) => {
      next(new Error(err));
    });
};
