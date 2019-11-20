import Joi from "joi";

class validate {
  /**
   *Database parent signup validation
   * @param {user} object
   */
  static validateParent(user) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .error(() => "email is required and must be a valid email")
        .email()
        .trim()
        .required(),
      fname: Joi.string()
        .regex(/^[a-zA-Z]+$/)
        .error(() => "Firstname is required and must contain only alphabets")
        .required(),
      lname: Joi.string()
        .regex(/^[a-zA-Z]+$/)
        .error(() => "Lastname is required and must contain only alphabets")
        .trim()
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .error(
          () => "password is required and must be at least 6 characters long"
        )
        .min(6)
        .alphanum()
        .required(),
      address: Joi.string().required(),
      phone: Joi.string().required()
    });
    return Joi.validate(user, schema);
  }

  /**
   *Database nanny signup validation
   * @param {user} object
   */
  static validateNanny(user) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .error(() => "email is required and must be a valid email")
        .email()
        .trim()
        .required(),
      fname: Joi.string()
        .regex(/^[a-zA-Z]+$/)
        .error(() => "Firstname is required and must contain only alphabets")
        .required(),
      lname: Joi.string()
        .regex(/^[a-zA-Z]+$/)
        .error(() => "Lastname is required and must contain only alphabets")
        .trim()
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .error(
          () => "password is required and must be at least 6 characters long"
        )
        .min(6)
        .alphanum()
        .required(),
      address: Joi.string().required(),
      language: Joi.string().required(),
      skills: Joi.string().required(),
      phone: Joi.string().required(),
      canDrive: Joi.string().required(),
      firstAid: Joi.string().required()
    });
    return Joi.validate(user, schema);
  }

  /**
   * @param{details} string
   */
  static validateLogin(details) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .error(() => "email is required ")
        .trim()
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .error(() => "password is required")
        .trim()
        .required()
    });
    return Joi.validate(details, schema);
  }
}

export default validate;
