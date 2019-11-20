import Db from "../Db/db";
import bcrypt from "bcryptjs";
import Auth from "../middlewares/auth";

const { genSaltSync, hashSync } = bcrypt;

export default class parentController {
  static async createParent(req, res) {
    const { body } = req;
    const salt = genSaltSync(10);
    const hash = hashSync(body.password, salt);

    const values = [
      body.fname,
      body.lname,
      body.address,
      body.phone,
      body.email,
      hash
    ];
    try {
      const queryString =
        "INSERT INTO parents(fname, lname, address, phone, email, password) VALUES($1, $2, $3, $4, $5, $6) returning *";
      const { rows } = await Db.query(queryString, values);

      // create token
      const token = Auth.generateToken(rows[0].email, rows[0].id);
      const newUser = {
        email: rows[0].email,
        firstName: rows[0].fname,
        lastName: rows[0].lname,
        address: rows[0].address,
        phone: rows[0].phone,
        password: rows[0].password
      };
      return res.status(201).json({
        status: 201,
        data: { newUser, token }
      });
    } catch (error) {
      // check if user exist
      if (error.routine === "_bt_check_unique") {
        return res.status(409).json({
          status: 409,
          error: "User already exist"
        });
      }

      return res.status(400).json({
        status: 400,
        errors: "Something went wrong, try again"
      });
    }
  }
}
