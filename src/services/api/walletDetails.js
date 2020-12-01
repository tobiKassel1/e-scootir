const bcrypt = require("bcryptjs");
const Message = require("../../utils/Message");
const { findOne } = require("../../db/models/User");

export const handler = (app) =>
  app.post("/wallet", async (req, res, next) => {
    const data = req.body;
    console.log("WALLET===", req.body);
    const { email } = req.body;
    try {
      let user = await findOne({ email });

      if (!user) {
        return res.status(401).send(new Message("User does not exists"));
      }

      const newUser = {
        name: user.name,
        email: user.email,
        balance: user.balance,
        tokens: user.tokens,
        rewardedBalance: user.rewardedBalance,
        activity: user.activity,
      };

      //  await addOne(newUser)
      res.status(200).send(newUser);
    } catch (error) {
      console.log(error);
    }
  });
