import Base from "./Base";

class User extends Base {
    constructor() {
        super("/user");
    }
    login(body) {
        return this.apiPost("/login", body);
    }

    register(body) {
        return this.apiPost("/register", body);
    }
    getUser(id) {
        return this.apiGet(`/detail/${id}`);
    }
    changeProFile(body, id) {
        return this.apiPut(`/self-update/${id}`, body);
    }
    changePassword(body) {
        return this.apiPost(`/change-password`, body);
    }
}
export default new User();
