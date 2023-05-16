const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_REQUEST = process.env.REFRESH_TOKEN_REQUEST;
const tokenModel = require('../model/tokenModel');


class TokenService{

    generateTokens(payload){
        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
            expiresIn: '2h'
        });
        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_REQUEST, {
            expiresIn: '1y'
        });
        return { accessToken, refreshToken };
    }

    async storeRefreshToken(refreshToken,userId){
        try {
            await tokenModel.create({
                refreshToken,
                userId,
            })
            console.log(refreshToken, userId);
        } catch (error) {
            console.log(error.message);
        }
    }

    async verifyAccessToken(token){
        return jwt.verify(token,ACCESS_TOKEN_SECRET);
    }
}


module.exports = new TokenService();