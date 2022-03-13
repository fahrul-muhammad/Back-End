const notif = {};
const response = require("../helpers/response");
const admin = require("firebase-admin");
const key = require("../../private/vehiclerental-dbb73-firebase-adminsdk-pwqta-a05730c00f.json");

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
    return res.statuys(500).json({
      pesan: "internal server error firebase",
      error,
    });
  }
};

module.exports = notif;
