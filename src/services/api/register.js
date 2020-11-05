const bcrypt = require("bcryptjs");
const Message = require("../../utils/Message");
const { addOne, findOne } = require("../../db/models/User")

export const handler = (app) => app.post("/register",async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
    let user = await findOne({email})
    console.log("USER RESSPONSE++++++++++++++" + user)

      if (user) {
        return res.status(400).send(new Message("User already exists!"));
      }

      const stalt = await bcrypt.genSalt(10);
      let encPassword = await bcrypt.hash(password, stalt);

        const newUser ={
        name,
        email,
        encPassword,
      };
      
     await addOne(newUser)
      res.status(200).send(new Message("Registered Successfuly"))
    } catch (error) {
      console.log(error);
    }
  });