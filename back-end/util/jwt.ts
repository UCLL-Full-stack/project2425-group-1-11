import jwt from 'jsonwebtoken';

const generateJwtToken = ({ userName, role }): string => {
    const options = {expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`}
    issuer: 'LVMed_app'

    try {
        return jwt.sign({userName, role}, process.env.JWT_SECRET, options)
    } catch (error) {
        console.log(error);
        throw new Error('Error generate JWT token, see server log for details.')
    }
}

export default {
    generateJwtToken,
}