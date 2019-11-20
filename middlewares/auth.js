import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import DB from "../Db/db";
dotenv.config();

export default class Auth {
  static generateToken(email, id) {
    const token = jwt.sign({ email, id }, process.env.SECRET_KEY, {
      expiresIn: "48h"
    });

    return token;
  }
}
