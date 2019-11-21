import Db from "../../Db/db";

class Request {
  static async requestNanny(req, res) {
    const { id } = req.params;
    const { email } = req.user;
    const { no_of_kids, time_needed, notes, ages_of_kids } = req.body;
    try {
      const requestQuery = "SELECT * FROM nannies WHERE id = $1";
      const { rows } = await Db.query(requestQuery, [id]);

      const parentQuery = "SELECT * FROM parents WHERE email = $1";
      const parent = await Db.query(parentQuery, [email]);
      const parentInfo = parent.rows[0];
      const values = [
        parentInfo.fname + " " + parentInfo.lname,
        time_needed,
        no_of_kids,
        ages_of_kids,
        notes,
        parentInfo.phone,
        rows[0].fname + " " + rows[0].lname,
        rows[0].phone,
        new Date(),
        "pending",
        rows[0].email
      ];

      const queryString =
        "INSERT INTO requests(parent_name,time_needed,number_of_kids,ages_of_wards,notes,parent_phone,nanny_name,nanny_phone,created_at,status,nanny_email) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *";

      const request = await Db.query(queryString, values);
      return res.status(201).json({
        status: 201,
        data: {
          request: request.rows[0]
        }
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: "Something went wrong, try again"
      });
    }
  }

  static async sendMessage(req, res) {
    const { nanny_email } = req.params;
    const { message } = req.body;
    const { email } = req.user;
    const values = [email, message, nanny_email];
    console.log(nanny_email);
    try {
      const queryString =
        "INSERT INTO messages(sender_email,message,receiver_email) VALUES($1,$2,$3) returning *";
      const { rows } = await Db.query(queryString, values);
      return res.status(201).json({
        status: 201,
        data: {
          message: rows[0]
        }
      });
    } catch (error) {}
  }
}

export default Request;
