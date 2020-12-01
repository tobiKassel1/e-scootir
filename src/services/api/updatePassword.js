const bcrypt = require("bcryptjs");
const { findOneAndUpdate} = require("../../db/models/User")

export const handler = (app) => app.post("/update", async (req, res, next) => {
    const { email, password} = req.body;
    try {
      
      const stalt = await bcrypt.genSalt(10);
      let pwd = await bcrypt.hash(password, stalt);
      let user = await findOneAndUpdate({email:email}, {$set: {encPassword:pwd}});
      if (!user) {
        return res.status(400);
      }
  
      res.status(200).json({message: "Updated"})
    } catch (error) {
      console.log(error);
    }
  });