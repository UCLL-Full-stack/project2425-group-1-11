import jwt from 'jsonwebtoken';

const generateJwtToken = ({ userName, role }: { userName: string; role: string }): string => {
    const options = {
        expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`,
        issuer: 'courses_app',
    };

    return jwt.sign({ userName, role }, process.env.JWT_SECRET!, options);
};

export default {generateJwtToken}