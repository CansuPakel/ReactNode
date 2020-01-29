import mongooseDb from "../../utils/mongooseDb";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
mongooseDb();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).send("Cannot find user");
    }
    const login = await bcrypt.compare(password, user.password);
    if (login) {
      const token = jwt.sign({ userId: user._id }, process.env.JWTSECRET, {
        expiresIn: "1d"
      });

      res.status(200).json(token);
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error server");
  }
};
