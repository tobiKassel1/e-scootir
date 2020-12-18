const bcrypt = require("bcryptjs");
const Message = require("../../utils/Message");
const { addOne, findOne, findOneAndUpdate } = require("../../db/models/User");
var phoneToken = require("generate-sms-verification-code");

export const handler = (app) =>
  app.post("/activity", async (req, res, next) => {
    const data = req.body;
    const { email, noParking } = data;
    try {
      let user = await findOne({ email });

      console.log(user);

      let random = Math.random(3);
      let stringRandom = random.toString();
      let trimmed = stringRandom.slice(2, 5);
      let id = phoneNumberToken(3, { type: "number" });

      let history = user.activity;
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();

      let fullDate = `${year}-${month}-${date}`;

      if (noParking) {
        history.push({
          Scooter: "E-Scooter",
          scooterId: id,
          Date: fullDate,
          rewarded: "No",
        });

        let newuser = await findOneAndUpdate(
          { email: email },
          { $set: { activity: history } }
        );
        return res.status(200).send(new Message("Updated tokens"));
      }

      history.push({
        Scooter: "E-Scooter",
        scooterId: id,
        Date: fullDate,
        rewarded: "Yes",
      });

      let newuser = await findOneAndUpdate(
        { email: email },
        { $set: { activity: history } }
      );
      res.status(200).send(new Message("Updated tokens"));
    } catch (error) {
      console.log(error);
    }
  });
