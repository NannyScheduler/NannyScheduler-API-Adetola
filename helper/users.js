class Helper {
  /*
   **
   * trim input whitespaces
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static trimmer(req, res, next) {
    const { body } = req;
    if (body) {
      const trimmed = {};

      Object.keys(body).forEach(key => {
        const value = body[key];
        Object.assign(trimmed, { [key]: value.trim() });
      });
      req.body = trimmed;
    }
    next();
  }
}

export default Helper;
