import Base from "./Base";

class User extends Base{
    constructor() {
        super('/user');
    }
    login(body) {
        return this.apiPost("/login", body);
    }

    register(body){
        return this.apiPost("/register", body);
    }
}
export default new User();