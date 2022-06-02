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

  searchUser(param = {}){
    return this.apiGet("/search", param);
  }
  update(body){
    return this.apiPut("/self-update/" + body.id, body);
  }
  createUser(body){
    return this.apiPost("/insert", body);
  }
  updateUser(body,id){
    return this.apiPut("/update/" + id, body);
  }
}
export default new User();
