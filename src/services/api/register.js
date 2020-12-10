const bcrypt = require("bcryptjs");
const Message = require("../../utils/Message");
const { addOne, findOne } = require("../../db/models/User");

export const handler = (app) =>
  app.post("/register", async (req, res, next) => {
    const data = req.body;
    console.log(data);
    const { name, email, password } = data;
    try {
      let user = await findOne({ email });

      if (user) {
        return res.status(401).send(new Message("User already exists!"));
      }

      const newUser = {
        name,
        email,
        password,
        balance: 50,
        tokens: 50,
        rewardedBalance: 0,
        rentedScootir: 0,
        activity: [
          {
            time: "",
            scootirId: "",
            parkingZone: "",
          },
        ],
      };

      await addOne(newUser);
      res.status(200).send(new Message("Registered Successfuly"));
    } catch (error) {
      console.log(error);
    }
  });
