import jwt from 'jsonwebtoken';
require("dotenv").config();


const generateToken = (user) => {

    const payload = {
        id: user.id,
        email: user.email,
        roleId: user.role.id,
    }

    const accessToken = "Nuongxinhdep"

    const token = jwt.sign(payload,accessToken);
    
    return token;

};

export default generateToken