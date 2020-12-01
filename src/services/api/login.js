const bcrypt = require("bcryptjs");
const Message = require("../../utils/Message");
const { findOne } = require("../../db/models/User");

export const handler = (app) =>
  app.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    console.log(req.body.email);
    try {
      console.log("START====1");
      let user = await findOne({ email });
      if (!user) {
        console.log("START====2");

        // return res.status(400).send(new Message("Invalid Credentials"));
        return res.status(400).send({ msg: "error" });
      }

      // let isMatch = await bcrypt.compare(password, user.encPassword);

      if (password != user.password) {
        console.log("PASED THIS");
        return res.status(400).send(new Message("Invalid Credentials"));
      }

      console.log("FINAL PASS===");
      res.status(200).send({ email: user.email });
    } catch (error) {
      console.log(error);
    }
  });
