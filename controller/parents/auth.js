import Db from "../../Db/db";
import bcrypt from "bcryptjs";
import Auth from "../../middlewares/auth";
import validation from "../../validation/validate";

const { genSaltSync, hashSync, compareSync } = bcrypt;

export default class parentController {
  static async createParent(req, res) {
    const { body } = req;

    const { error } = validation.validateParent(body);
    if (error)
      return res.status(422).json({
        status: 422,
        message: error.details[0].message
      });
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

  static async parentLogin(req, res) {
    const { email, password } = req.body;
    const { error } = validation.validateLogin(req.body);
    if (error)
      return res.status(422).json({
        status: 422,
        message: error.details[0].message
      });
    const queryString = "SELECT * FROM parents WHERE email = $1";

    try {
      const { rows } = await Db.query(queryString, [email]);

      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: "user not found"
        });
      }

      if (!compareSync(password, rows[0].password)) {
        return res.status(401).json({
          status: 401,
          error: "invalid email/password"
        });
      }

      const token = Auth.generateToken(rows[0].email, rows[0].id);

      return res.status(200).json({
        status: 200,
        data: [
          {
            message: "Logged in successfully",
            user: {
              lastname: rows[0].lname,
              email: rows[0].email
            },
            token
          }
        ]
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        errors: "Something went wrong, try again"
      });
    }
  }
}
