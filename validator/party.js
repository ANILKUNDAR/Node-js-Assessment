const Joi = require("@hapi/joi");
const partyValidator = () => {

      const party = {};
      
      party.validateParty=async(user)=>{
        const schema = Joi.object({
            logo:Joi.string(),
            name: Joi.string()
              .required(),
            user: Joi.object(),
            election:Joi.string()
          });
        return schema.validate(user);
      }
    
      return party;
  }
  
  module.exports = partyValidator