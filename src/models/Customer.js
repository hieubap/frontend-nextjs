import WrapBase from "./WrapBase";

class User extends WrapBase {
    constructor() {
        super("/customer");
    }
}
export default new User();
