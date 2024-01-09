import db from '../models/index'
import bcrypt from 'bcryptjs'
import e from 'express'
import { isPluginRequired } from '@babel/preset-env'
const salt = bcrypt.genSaltSync(10)
import jwt from 'jsonwebtoken'
const Op = db.Sequelize.Op
const config = require('../configs/auth.config')
import { loadContract } from './loadContract'
require('dotenv').config()

// const contract = loadContract()

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: [
                        'id',
                        'email',
                        'roleId',
                        'password',
                        'firstName',
                        'lastName',
                    ],
                    raw: true,
                })
                if (user) {
                    let check = await bcrypt.compareSync(
                        password,
                        user.password,
                    )
                    if (check) {
                        var token = await jwt.sign(
                            { id: user.id },
                            config.secret,
                            {
                                expiresIn: 86400, // 1 day
                            },
                        )
                        userData.errCode = 0
                        userData.errMessage = 'Ok'
                        delete user.password
                        userData.user = user
                        userData.user.accessToken = token
                    } else {
                        userData.errCode = 1
                        userData.errMessage = `Your email or password is incorrect!`
                    }
                } else {
                    userData.errCode = 1
                    userData.errMessage = `Your email or password is incorrect!`
                }
            } else {
                userData.errCode = 1
                userData.errMessage = `Your email or password is incorrect!`
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

export { handleUserLogin }
