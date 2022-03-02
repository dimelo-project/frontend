import axios from "axios";

export default function ({ $axios }) {
  $axios.onRequest((config) => {
    axios.defaults.headers.common.Authorization =
      localStorage.getItem("auth._token.local");
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    return config;
  });
}
