const bcrypt = require("bcryptjs");
const Message = require("../../utils/Message");
const { addOne, findOne, findOneAndUpdate } = require("../../db/models/User");
const numberGenerator = require("number-generator");
const number = require("generate-sms-verification-code");

export const handler = (app) =>
  app.post("/reward", async (req, res, next) => {
    const data = req.body;
    const { name, email, password, noReward } = data;
    try {
      let user = await findOne({ email });

      let newBalance = user.rewardedBalance;
      let scoortir = user.rentedScootir;

      if (scoortir == 0) {
        return res.status(201).send("You are not renting any scootir");
      }
      scoortir = scoortir - 1;
      newBalance = newBalance + 1;

      let pakr = [
        "Parking Zone",
        "Parking Zone",
        "Parking Zone",
        "Parking Zone",
        "Parking Zone",
        "Parking Zone",
        "Parking Zone",
        "Parking Zone",
        "Parking Zone",
        "Parking Zone",
        "Parking Zone",
      ];
      let userActivity = user.activity;

      if (noReward) {
        userActivity.push({
          time: new Date(),
          scootirId: number(1, { type: "number" }),
          parkingZone: "No Parking Zone",
          reward: "No",
        });

        let newuser = await findOneAndUpdate(
          { email: email },
          { $set: { rewardedBalance: newBalance - 1 } }
        );
        let newnew2user = await findOneAndUpdate(
          { email: email },
          { $set: { rentedScootir: scoortir } }
        );

        let new23 = await findOneAndUpdate(
          { email: email },
          { $set: { activity: userActivity } }
        );
        return res.status(200).send(new23);
      }
      userActivity.push({
        time: new Date(),
        scootirId: number(1, { type: "number" }),
        parkingZone: pakr[number(1, { type: "number" })],
        reward: "Yes",
      });

      let newuser = await findOneAndUpdate(
        { email: email },
        { $set: { rewardedBalance: newBalance } }
      );
      let newnew2user = await findOneAndUpdate(
        { email: email },
        { $set: { rentedScootir: scoortir } }
      );
      let new23 = await findOneAndUpdate(
        { email: email },
        { $set: { activity: userActivity } }
      );
      res.status(200).send(new Message("Updated tokens"));
    } catch (error) {
      console.log(error);
    }
  });
