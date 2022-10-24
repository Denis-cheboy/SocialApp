const bcrypt=require("bcryptjs")

const hash= (password)=>{
    const salt= bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password,salt)
}

const comparePasswords=(raw,userPassword)=>{
    return bcrypt.compare(raw,userPassword)
}

module.exports={
    hash,comparePasswords
}