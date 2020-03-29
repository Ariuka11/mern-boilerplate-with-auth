const express = require('express')
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")

const router = express.Router()

router.get("/users", auth(), async (req, res, next) => {
    try{
        const user = await User.find()
        res.json(user)
    } catch (err) {
        next(err)
    }
})

router.post("/register", async (req, res, next) => {
    try{ 
        const { username, email, password} = req.body
        const user =  new User({username, email, password})
        await user.save()

        return res.json({
            message: "Successfully Registered"
        })
    } catch(err) {
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    try{ 
        const{username, password} = req.body
        const user = await User.findOne({ username })
        if(!user) {
            return res.status(400).send({ message: "The username does not exist" });
        }
        user.comparePassword(password, (error, match) => {
            if(!match) {
                return res.status(400).send({ message: "The password is invalid" });
            }
        });

        const payload = {
			userId: user._id,
		}

		const token = jwt.sign(payload,  process.env.JWT_SECRET || 'whale')

        res.cookie("token", token)
        
        res.json({
            message: `Welcome`
        })
    } catch(err) {
        next(err)
    }
})

router.get('/logout', auth(), (req, res, next) => {
  return  res.clearCookie("token").json({
      message: "success"
  })
})

module.exports = router

