const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenModel = require('../model/refreshTokenModel');


class TokenService{

    generateTokens(payload){
        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
            expiresIn: '1m'
        });
        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
            expiresIn: '1y'
        });
        return { accessToken, refreshToken };
    }

    async storeRefreshToken(refreshToken,userId){
        try {
            await refreshTokenModel.create({
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

    async verifyRefreshToken(token){
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    }

    async findRefreshToken(id, refreshToken){
        return await refreshTokenModel.findOne({
            userId: id,
            refreshToken: refreshToken,
        });
    }

    async updateRefreshToken(id, refreshToken){
        return await refreshTokenModel.updateOne(
            { userId: id },
            { refreshToken: refreshToken}
        );
    }


    async removeToken(refreshToken){
        return await refreshTokenModel.deleteOne({refreshToken: refreshToken});
    }

    
}


module.exports = new TokenService();