import db from "../models/index";
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let hasUserPassword = (password) => {
    
    return new Promise( async (resolve, reject) => {
        try{
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }catch(e){
            reject(e);
        }

    })
}

let handleUserLogin = (email,password) => {
    return new Promise(async(resolve, rejact) => {
    try{
        let userData= {};
        let isExist = await checkUserEmail(email);
        if(isExist){

            let user = await db.User.findOne({
                attributes: ['id','email', 'roleId', 'password', 'firstName', 'lastName'],
                where: {email: email},
                raw: true,
            });
            if(user){
                // let check = password === user.password;
                let check = await bcrypt.compareSync(password, user.password);
                // console.log(check);
                // console.log(password);
                // console.log(user.password);
                if(check){
                    userData.errCode = 0;
                    userData.errMessage = 'Ok';
                    console.log(user);
                    delete user.password;
                    userData.user = user;
                }else{
                    userData.errCode = 3;
                    userData.errMessage = 'Wrong Password';
                }
            }else{
                userData,errCode = 2;
                userData.errMessage = `User is not found`
            }

        }else{
            userData.errCode = 1;
            userData.errMessage = `Your is Email is not Exist in your system. Pleasr try oder email`
            
            
        }
        resolve(userData)
    }catch(e){
        rejact(e)
    }
})
}

let checkUserEmail = (userEmail) => {
    return new Promise( async(resolve, rejact) => {
        try{
            let user = await db.User.findOne({
                where:{email : userEmail}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        }catch(e){
            rejact(e);
        }
    })
}
let getAllUsers = (userId) => {
    return new Promise( async (resolve, rejact)=>{
        try{
            let users = '';
            if(userId === 'ALL'){
                users = db.User.findAll({
                    attributes:{
                        exclude:['password']
                    }
                })
            }if(userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where: {id: userId},
                    attributes:{
                        exclude:['password']
                    }
                    
                })
            }
            resolve(users)
        }catch(e){
            rejact(e);
        }
    })
}
let createNewUser = (data) => {
    return new Promise( async (resolve, rejact) => {
        try{
            let check = await checkUserEmail(data.email);
            if(check === true){
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is alrealdy in used, please another email'
                })
            }else{
                let hashPasswordFromBcrypt = await hasUserPassword(data.password);
                await db.User.create({
                    password: hashPasswordFromBcrypt,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId, 
                    positionId: data.positionId,
                    image: data.avatar
                })

                    resolve({
                        errCode: 0,
                        message: 'OK'
                    })
            }
            
        }catch(e){
            rejact(e);
        }
    })
}
let deleteUser = (userId) => {
    return new Promise ( async (resolve, rejact) => {
        let foundUser = await db.User.findOne({
            where: {id: userId}
        })
        if(!foundUser){
            resolve({
                errCode: 2,
                errMessage: `The User is not exist`
            })
            
        }
        await db.User.destroy({
            where: {id: userId}
        })
        resolve({
            errCode: 0,
            message: `The user is deleted`
        })
    })
}

let updateUserData = (data) => {
    return new Promise( async (resolve, reject) => {
        try{
            console.log('check nodeJS',data)

            if(!data.id || !data.roleId || !data.positionId || !data.gender){
                resolve({
                    errCode:2,
                    errMessage: 'Missing required parameters !'
                })
            }
            let user = await db.User.findOne({
                where: {id:data.id},
                raw: false
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phonenumber = data.phonenumber;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                if(data.avatar){
                    user.image = data.avatar;
                }
                await user.save();
               
                resolve({
                    errCode: 0,
                    message: 'Update the user succeds !'
                })

            }else{
                resolve({
                    errCode: 1,
                    errMessage: 'User is not found !'
                });
            }
        }catch(e){
            reject(e);
        }
    })
}
let getAllCodeService = (typeInput) => {
    return new Promise( async (resolve, reject) => {
        try{
            if(!typeInput){
                resolve({
                    errCode:1,
                    errMessage:'Missing required parameters !'
                })
            }else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: {type: typeInput}
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
            
            
        }catch(e){
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin:handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData:updateUserData,
    getAllCodeService:getAllCodeService
       
}