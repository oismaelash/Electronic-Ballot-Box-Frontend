import axios from "axios";

const IS_DEV_MODE = true;

export default axios.create({
  baseURL: IS_DEV_MODE
    ? "https://localhost:44388/api/"
    : "http://electronicballotboxapi-dev.us-east-1.elasticbeanstalk.com/api/",
});
