const crypto = require('crypto');
const hashService = require('../services/hashService');

class OtpService{

    async genrateOtp(){
        const otp = crypto.randomInt(1000, 9999);
        return otp;
    }

    async sendBySms(phone, otp){
        //will do letter
    }

    verifyOtp(hashedOtp, data) {
        let computedHash = hashService.hashOtp(data);
        if(computedHash === hashedOtp){
            return true;
        }

        return false;
    }

}

module.exports = new OtpService();