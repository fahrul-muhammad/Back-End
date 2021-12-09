const val = {};

val.validate = (req, res, next) => {
  const { body } = req;
  const signUpBody = ["firstname", "lastname", "gender", "email", "phone_number", "DoB", "address", "password", "role_id"];
  const bodyProperty = Object.keys(body);
  const isBodyValid = signUpBody.filter((property) => !bodyProperty.includes(property)).length == 0 ? true : false;
  //console.log(isBodyValid);
  if (!isBodyValid) return res.status(500).json({ pesan: "invalid body" });
  next();
};

module.exports = val;
