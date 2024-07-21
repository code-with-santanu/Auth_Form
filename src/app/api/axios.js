import axios from "axios";

export default axios.create({
  baseURL: "https://authenticationsystem-ttz8.onrender.com",
  mode: "cors",
});
