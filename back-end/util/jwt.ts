import jwt from 'jsonwebtoken';

const generateJwtToken = ({ userName, role }: { userName: string, role: string }): string => {
    const options = {expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`,
    issuer: 'LVMed_app'
   }
    
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        return jwt.sign({userName, role}, process.env.JWT_SECRET, options)
    } catch (error) {
        console.log(error);
        throw new Error('Error generate JWT token, see server log for details.')
    }
}
  

export default {
    generateJwtToken,
}