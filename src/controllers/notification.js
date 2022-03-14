const notif = {};
const response = require("../helpers/response");
const admin = require("firebase-admin");
const key = require("../../private/vehiclerental-dbb73-firebase-adminsdk-pwqta-a05730c00f.json");
const models = require("../models/firebase");

// FIREBASE
admin.initializeApp({
  credential: admin.credential.cert(key),
});
const message = admin.messaging();

notif.send = async (req, res) => {
  try {
    const { body } = req;
    await message.send({
      token: body.receiver,
      notification: {
        title: body.title,
        body: body.message,
      },
    });
    return res.status(200).json({
      pesan: "notification sent",
    });
  } catch (error) {
    return res.status(500).json({
      pesan: "internal server error firebase",
      error,
    });
  }
};

notif.getToken = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const result = await models.getUserToken(id);
    console.log(result[0]);
    return res.status(200).json({
      pesan: "Get Data Success",
      data: {
        id: result[0].id,
        token: result[0].FBtoken,
      },
    });
  } catch (error) {
    return res.statuys(500).json({
      pesan: "internal server error",
      error,
    });
  }
};

module.exports = notif;
