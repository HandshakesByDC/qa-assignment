import axios from "axios";
import * as fs from "fs";
import { createStreamableFile } from "../../utils/files";
import FormData from "form-data";
import { ApiConfig } from "../../types/apiConfig";

// const path = "./assets/images/camera_lense_0.jpeg";
// const path2 = "./assets/images/istockphoto-1322277517-612x612.jpg";
// const path3 = "./assets/images/istockphoto-1322277517-612x612.zip";
// // var newFile = fs.createReadStream(path);

// const form = new FormData();
// form.append("file", fs.createReadStream(path3));
// // form.append("file", fs.createReadStream(path2));

// const config: ApiConfig = {
//   method: "post",
//   url: "https://assessement.onrender.com/api/zip",
//   headers: {
//     ...form.getHeaders(),
//   },
//   data: form,
// };

// axios
//   .request(config)
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// // const BASE_URL = process.env.live -- will get from dot env

export class ApiContext {
  private config: ApiConfig;
  constructor(config: ApiConfig) {
    this.config = config;
  }

  async execute() {
    try {
      return axios.request(this.config);
    } catch (error) {
      return error;
    }
  }
}
