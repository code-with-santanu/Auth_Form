import axios from "axios";

export default axios.create({
  baseURL: "https://authenticationsystem.up.railway.app",
  mode: "cors",
});
