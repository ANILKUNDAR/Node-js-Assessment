const Joi = require("@hapi/joi");
const userValidator = () => {

      const user = {};
      
      user.validateUser=async(user)=>{
        const schema = Joi.object({
            name: Joi.string()
              .min(2)
              .max(50)
              .required(),
            phone: Joi.string()
              
              .required(),
            password: Joi.string()
              .min(5)
              .max(255)
              .required(),
            isAdmin:Joi.boolean()
          });
          return schema.validate(user);
      }
    user.validateLogin = async (user) => {
        const schema =Joi.object({
            phone: Joi.string().required(),
            password: Joi.string().required()
          });
          return schema.validate(user);
    }
    
    user.validateVoters = async (user) => {
        const schema = Joi.object({
            name: Joi.string()
              .required(),
            phone: Joi.string()
              .required(),
            address: Joi.string(),
            gender: Joi.string(),
            age: Joi.string(),
            adhaar: Joi.string(),
          });
          return schema.validate(user);
    }
      return user;
  }
  
  module.exports = userValidator