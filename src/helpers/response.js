const res = {};

res.success = (r, status, data, msg) => {
  r.status(status).json({ result: data });
};

res.err = (r, status, data) => {
  const err = new Error(data);
  r.status(status).json({ error: err.message });
};

module.exports = res;
