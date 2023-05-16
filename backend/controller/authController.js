const otpService = require('../services/otpService')
const hashService = require('../services/hashService');
const userService = require('../services/userService');
const tokenService = require('../services/tokenService');


class AuthController {

    async sendotp(req, res) {
        const { phone } = req.body;
        if (!phone) {
            res.status(400).json({message:'Bad Request! Please provide phone number'})
        }
        

        const otp = await otpService.genrateOtp();
        console.log(phone+"\t "+otp);
        
        var alive = 1000 * 60 * 10;
        var expiresIn = Date.now() + alive;
        const data = `${phone}.${otp}.${expiresIn}`;
        const hash = hashService.hashOtp(data);

        try {
            // await otpService.sendBySms(phone, otp);
            res.status(200).json({
                hash: `${hash}.${expiresIn}`,
                phone:phone,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'message sending failed' });
        }

    }


    
    async verifyOtp(req,res){
        const { otp, hash, phone } = req.body;
        if (!otp || !hash || !phone) {
            res.status(400).json({ message: 'Bad Request. All fields are required!' });
        }

        const [hashedOtp, expiresIn] = hash.split('.');
        if (Date.now() > +expiresIn) {
            res.status(400).json({ message: 'OTP expired!' });
        }

        const data = `${phone}.${otp}.${expiresIn}`;
        const isValid = otpService.verifyOtp(hashedOtp, data);
        if (!isValid) {
            res.status(400).json({ message: 'Invalid OTP' });
        }

        let user;
        try {
            user = await userService.findUser({ phone });
            if (!user) {
                user = await userService.createUser({ phone });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Database error' });
        }

        console.log(user);
        const { accessToken, refreshToken } = tokenService.generateTokens({
            _id: user._id,
            activated: false,
        });

        await tokenService.storeRefreshToken(refreshToken, user._id);

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });
        
        res.status(200).json({ user: user, auth: true });
    }

}

module.exports = new AuthController();