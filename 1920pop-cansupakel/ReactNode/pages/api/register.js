import mongooseDb from "../../utils/mongooseDb";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import Shoppingcart from "../../models/Shoppingcart";
mongooseDb();

export default async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!isLength(password, { min: 8 })) {
      return res.status(422).send("Password min 8 character");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email invalid");
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("User already exists");
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await new User({
      firstname,
      lastname,
      email,
      password: hash
    }).save();
    await new Shoppingcart({ user: newUser._id }).save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWTSECRET, {
      expiresIn: "1d"
    });
    res.status(201).json(token);
  } catch (error) {
    console.log(error);
    res.status(500).send("Fail user register");
  }
};
