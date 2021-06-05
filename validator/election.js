const Joi = require("@hapi/joi");
const electionValidator = () => {

      const election = {};
      
      election.validateElection=async(user)=>{
        const schema = Joi.object({
          name: Joi.string()
                .required(),
          information:Joi.string(),
          user: Joi.object(),
          startTime: Joi.object(),
          endTime: Joi.object(),
          isActive: Joi.boolean(),
          isNotify:Joi.boolean()
        });
        return schema.validate(user);
      }
  
      return election;
  }
  
  module.exports = electionValidator