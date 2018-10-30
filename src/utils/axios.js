import axios from "axios";
import { Message } from "element-ui";
import router from "../router";
const env = process.env.NODE_ENV;
const baseURL = env == "development" ? "/api" : "/";
export default class Axios {
  static xhr = axios.create({
    baseURL,
    timeout: 15000
  });
  static get(url, data, config) {
    return new Promise((resolve, reject) => {
      this.xhr
        .get(url, { params: data }, config)
        .then(res => {
          if (res.data.code == 403) {
            Message.info(res.msg);
            router.push("/");
          }
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  static fetch(url, data, config, method) {
    return new Promise((resolve, reject) => {
      this.xhr[method](url, data, config)
        .then(res => {
          if (res.data.code == 403) {
            Message.info(res.msg);
            router.push("/");
          }
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  static post(url, data, config) {
    return this.fetch(url, data, config, "post");
  }
  static patch(url, data, config) {
    return this.fetch(url, data, config, "patch");
  }
  static delete(url, data, config) {
    return this.fetch(url, data, config, "delete");
  }
}
