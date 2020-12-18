const bcrypt = require("bcryptjs");
const Message = require("../../utils/Message");
const { addOne, findOne, findOneAndUpdate } = require("../../db/models/User");
const numberGenerator = require("number-generator");
const number = require("generate-sms-verification-code");

export const handler = (app) =>
  app.post("/rent", async (req, res, next) => {
    const data = req.body;
    console.log("RENT====", req.body);
    const { email } = data;
    try {
      let user = await findOne({ email });

      //   if (user) {
      //     return res.status(401).send(new Message("User already exists!"));
      //   }

      let newTokens = user.tokens;
      if (newTokens == 0) {
        return res.status(201).send("You don't have sufficiant tokens");
      }
      newTokens = newTokens - 3;
      let rentedScootirs = user.rentedScootir;
      rentedScootirs = rentedScootirs + 1;

      // console.log("TOKENS===",newTokens)
      //     const newUser ={
      //     name,
      //     email,
      //     password,
      //     balance:50,
      //     tokens: tokens,
      //     rewardedBalance:0,
      //     activity:[]
      //   };

      // userActivity.push({
      //   time: new Date(),
      //   scootirId: number(1, { type: "number" }),
      //   parkingZone: pakr[number(1, { type: "number" })],
      //   reward: "Yes",
      // });

      let newuser = await findOneAndUpdate(
        { email: email },
        { $set: { tokens: newTokens } }
      );
      let new2 = await findOneAndUpdate(
        { email: email },
        { $set: { rentedScootir: rentedScootirs } }
      );

      // let new23 = await findOneAndUpdate(
      //   { email: email },
      //   { $set: { activity: userActivity } }
      // );
      res.status(200).send(new2);
    } catch (error) {
      console.log(error);
    }
  });
