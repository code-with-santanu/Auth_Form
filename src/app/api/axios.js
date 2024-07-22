import axios from "axios";

export default axios.create({
  baseURL: "authenticationsystem-production.up.railway.app",
  mode: "cors",
});
