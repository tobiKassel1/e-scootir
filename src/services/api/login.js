const bcrypt = require("bcryptjs");
const Message = require("../../utils/Message");
const { findOne } = require("../../db/models/User")

export const handler = (app) => app.post("/login",  async (req, res, next) => {
    const { email, password } = req.body;
    try {
      let user = await findOne({ email });
      if (!user) {
        return res.status(400).send(new Message("Invalid Credentials"));
      }
  
      let isMatch = await bcrypt.compare(password, user.encPassword);
  
      if (!isMatch) {
        return res.status(400).send(new Message("Invalid Credentials"));
      }
  
      res.status(200).send(new Message("User logged in"))
    } catch (error) {
      console.log(error);
    }
  });