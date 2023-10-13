import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import User from "../models/user.js";
import Joi  from 'joi';


const userRegister = catchAsyncErrors(async (req, res) => {
    const { fullName,email,mobile,city,cource } = req.body;
    const { body } = req;

    const user= await User.findOne({email:email});

    if(user){
        return res.json({
            message:"User Already Exist ...."
        })
    }
  
    const schema = Joi.object().keys({
     fullName: Joi.string().required(),
      email: Joi.string().email().required(),
      mobile: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
      city: Joi.string().required(),
      cource:Joi.string().required(),
    });

    const result = schema.validate(body); 
    const { value, error } = result; 
    const valid = error == null; 
    
    if (!valid) { 
        if(error){
           return  res.status(422).json({ 
                message: error.details[0].message, 
              }) 
        }
     
    } else { 
        const userData = await User.create({
            fullName:fullName,
            email: email,
            mobile: mobile,
            city:city,
            cource:cource
          });
          res.status(201).json({
            success: true,
            result:userData,
          });
    } 
  });

  export default userRegister
  