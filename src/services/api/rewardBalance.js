const bcrypt = require("bcryptjs");
const Message = require("../../utils/Message");
const { addOne, findOne, findOneAndUpdate } = require("../../db/models/User");

export const handler = (app) =>
  app.post("/reward", async (req, res, next) => {
    const data = req.body;
    const { name, email, password } = data;
    try {
      let user = await findOne({ email });

      //   if (user) {
      //     return res.status(401).send(new Message("User already exists!"));
      //   }

      let newBalance = user.rewardedBalance;
      let scoortir = user.rentedScootir;

      if (scoortir == 0) {
        return res.status(201).send("You are not renting any scootir");
      }
      scoortir = scoortir - 1;
      newBalance = newBalance + 5;

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

      let newuser = await findOneAndUpdate(
        { email: email },
        { $set: { rewardedBalance: newBalance } }
      );
      let newnew2user = await findOneAndUpdate(
        { email: email },
        { $set: { rentedScootir: scoortir } }
      );
      res.status(200).send(new Message("Updated tokens"));
    } catch (error) {
      console.log(error);
    }
  });
