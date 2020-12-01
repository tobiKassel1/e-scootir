
const { findOne } = require("../../db/models/User")

export const handler = (app) => app.post("/details", async (req, res, next) => {
    const { email } = req.body;

    console.log("DETAILS REQUEST=====",req.body)
    try {
      let user = await findOne({ email });
  
      res.status(200).json(
          {email:user.email,
            name:user.name})
    } catch (error) {
      console.log(error);
    }
  });