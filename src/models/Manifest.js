import Base from "./Base";

class Manifest extends Base {
    constructor() {
        super("/manifest");
    }

    search(queryObj) {
        return this.apiGet("/search", queryObj);
    }

    create(body) {
        return this.apiPost("/insert", body);
    }

    update(id, body) {
        return this.apiPut(`/update/${id}`, body);
    }

    toggleActive(id) {}

    delete(id) {
        this.apiDelete(`delete/${id}`);
    }

    detail(id) {
        this.apiGet(`detail/${id}`);
    }
}

export default new Manifest();
