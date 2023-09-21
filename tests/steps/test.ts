// import FormData from "form-data";
// import fs from "fs";
// import { FilePath } from "../../src/constants/filePath";
// import { ApiConfig } from "../../src/types/apiConfig";
// import { getCurrentBaseURL } from "../../src/core/env/env";
// import { ApiContext } from "../../src/core/api/ApiContext";
// const form = new FormData();
// form.append("file", fs.createReadStream("./assets/images/camera_lense_0.jpeg"));
// const apiConfig: ApiConfig = {
//   url: `${getCurrentBaseURL()}/api/image`,
//   method: "post",
//   headers: {
//     ...form.getHeaders(),
//   },
//   data: form,
// };
// let apiContext: ApiContext;
// apiContext = new ApiContext(apiConfig);

// // const data = async () => {
// //   return await apiContext.execute();
// // };

// // data().then((r) => {
// //   console.log(r);
// // });

// apiContext.execute().then((r) => {
//   console.log(r);
// });

import validator from "validator";

const uuid = "3c05ea7a-3638-4c90-aafe-554ca9a5707b";
const version = 4;
console.log(uuid);
console.log(version);
console.log(validator.isUUID(uuid, version));
// expect(validator.isUUID(uuid, version)).toBeTruthy();

// const link =
//   "https://assessement.onrender.com/images/c185d3c2-395d-48ec-9b06-13351d0cc3c4.jpeg";

// // const uuidPattern =
// //   /([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/;

// const match = link.match(uuidPattern);

// if (match) {
//   const uuid = match[0];
//   console.log(uuid); // Output: c185d3c2-395d-48ec-9b06-13351d0cc3c4
// } else {
//   console.log("No UUID found in the link.");
// }
