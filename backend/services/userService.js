const UserModel = require('../model/userModel');


class UserService {

    async findUser(phone) {
        const user = await UserModel.findOne(phone);
        return user;
    }

    async createUser(data) {
        const user = await UserModel.create(data);
        return user;
    }   
}


module.exports = new UserService();