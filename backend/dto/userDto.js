
class UserDto{
    id;
    phone;
    activated;
    createdAt;
    updatedAt;

    UserDto(user){
        this.id = user._id;
        this.phone = user.phone;
        this.activated = user.activated;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}

module.exports = UserDto();