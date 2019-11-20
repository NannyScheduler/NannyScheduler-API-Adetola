import Db from "../../Db/db";
import Auth from "../../middlewares/auth";

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
}

export default Nannies;