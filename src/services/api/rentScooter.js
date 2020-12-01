const bcrypt = require("bcryptjs");
const Message = require("../../utils/Message");
const { addOne, findOne, findOneAndUpdate } = require("../../db/models/User");

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
      newTokens = newTokens - 5;

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
      res.status(200).send(new Message("Updated tokens"));
    } catch (error) {
      console.log(error);
    }
  });
