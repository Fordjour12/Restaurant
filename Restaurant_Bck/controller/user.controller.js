const createError = require('http-errors')

// user model
const user = require('../model/users.model')

// helper method (user validator)
const { userSchema } = require('../helpers/schema_validation.helper')

exports.register = async(Request,Response,Next)=>{

}
exports.login = async (Request,Response,Next)=>{}
