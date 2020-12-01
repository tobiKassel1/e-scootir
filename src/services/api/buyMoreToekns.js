const bcrypt = require("bcryptjs");
const Message = require("../../utils/Message");
const { addOne, findOne, findOneAndUpdate } = require("../../db/models/User");

export const handler = (app) =>
  app.post("/buymore", async (req, res, next) => {
    const data = req.body;
    console.log("RENT====", req.body);
    const { email } = data;
    try {
      let user = await findOne({ email });

      //   if (user) {
      //     return res.status(401).send(new Message("User already exists!"));
      //   }

      let newTokens = user.tokens;
      let userBalance = user.balance;
      if (newTokens == 0) {
        return res.status(201).send("You don't have sufficiant tokens");
      }
      newTokens = newTokens + 10;
      userBalance = userBalance - 1;

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
        { $set: { tokens: newTokens } }
      );
      let newBalance = await findOneAndUpdate(
        { email: email },
        { $set: { balance: userBalance } }
      );

      let userss = await findOne({ email });

      const myuser = {
        name: userss.name,
        email: userss.email,
        balance: userss.balance,
        tokens: userss.tokens,
        rewardedBalance: userss.rewardedBalance,
        activity: userss.activity,
      };

      res.status(200).send(myuser);
    } catch (error) {
      console.log(error);
    }
  });
