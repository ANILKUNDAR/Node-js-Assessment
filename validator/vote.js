const Joi = require("@hapi/joi");
const voteValidator = () => {

      const vote = {};
      
      vote.validateUserVote=async(user)=>{
        const schema = Joi.object({
            electionid: Joi.string()
              .required(),
            partyid: Joi.string()
              .required(),
            voterId: Joi.string(),
            phone: Joi.string(),
          });
          return schema.validate(user);
      }
    
      return vote;
  }
  
  module.exports = voteValidator