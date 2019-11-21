import Db from "../../Db/db";

class Nannies {
  static async getAllNannies(req, res) {
    try {
      const allNanniesQuery = "SELECT * FROM nannies";
      const { rows } = await Db.query(allNanniesQuery);
      const allNannies = rows.length;

      if (!allNannies) {
        return res.status(404).json({
          status: 404,
          error: "No nannies found"
        });
      }

      const info = rows.map(nanyInfo => {
        return {
          firstName: nanyInfo.fname,
          lastName: nanyInfo.lname,
          address: nanyInfo.address,
          language: nanyInfo.language,
          skills: nanyInfo.skills,
          phone: nanyInfo.phone,
          Licensed_to_Drive: nanyInfo.candrive,
          firstAid: nanyInfo.firstaid
        };
      });

      return res.status(200).json({
        status: 200,
        message: `${allNannies} nanies found`,
        data: info
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: "Something went wrong, try again"
      });
    }
  }

  static async searchNannies(req, res) {
    const { location } = req.body;

    try {
      const nanyQuerry = "SELECT * from nannies";
      const { rows } = await Db.query(nanyQuerry);

      const foundNannies = rows.filter(nanny =>
        nanny.address.includes(location)
      );

      if (foundNannies.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "no nannies found in this location"
        });
      }

      return res.status(200).json({
        status: 200,
        data: foundNannies
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: "Something went wrong, try again"
      });
    }
  }

  static async acceptOrRejectRequest(req, res) {
    const { id } = req.params;
    const { email } = req.user;
    const { status } = req.body;
    const values = [status, id];

    try {
      const queryString = "SELECT * FROM requests WHERE id = $1";
      const { rows } = await Db.query(queryString, [id]);

      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: "Booking not found"
        });
      }

      if (rows[0].nanny_email !== email) {
        return res.status(403).json({
          status: 403,
          error: "You cannot perform an operation on this booking"
        });
      }

      if (rows[0].status !== "pending") {
        return res.status(409).json({
          status: 409,
          error: "This booking has already been closed"
        });
      }

      const updateQuery =
        "UPDATE requests SET status = $1 WHERE id = $2 returning *";
      const update = await Db.query(updateQuery, values);

      return res.status(200).json({
        status: 200,
        data: update.rows[0]
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: "Something went wrong, try again"
      });
    }
  }
}

export default Nannies;
