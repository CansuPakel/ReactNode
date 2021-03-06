import User from "../../models/User";
import jwt from "jsonwebtoken";
import mongooseDb from "../../utils/mongooseDb";

mongooseDb();
export default async (req, res) => {

  if (!req.headers.authorization) {
    return res.status(401).send("No auth token");
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWTSECRET
    );


    const user = await User.findOne({ _id: userId });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    res.status(403).send("Invalid token");
  }
};
