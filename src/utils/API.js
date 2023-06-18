import { SERVER_BASE_URL } from "./Constants";
import axios from "axios";

class API {
    constructor() {
      this.configs = {
        baseURL: `${SERVER_BASE_URL}/api/`,
        timeout: 70000,
      };
    }

    instance(cfgs = {}) {
        return axios.create({ ...this.configs, ...cfgs });
      }

    async get(url, data) {
        const rs = await this.instance().get(url, { body: data });
        return this.response(rs);
      }
    
      async post(url, data, cfgs     = {}) {
        const rs = await this.instance(cfgs).post(url, data);
        return this.response(rs);
      }
    
      async put(url, data) {
        const rs = await this.instance().put(url, data);
        return this.response(rs);
      }
    
      async delete(url) {
        const rs = await this.instance().delete(url);
        return this.response(rs);
      }
    
      response(rs) {
        return rs?.data;
      }
}
const ApiQlcv = new API();
export default ApiQlcv;
