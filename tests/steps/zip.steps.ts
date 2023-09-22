import FormData from "form-data";
import { DefineStepFunction, defineFeature, loadFeature } from "jest-cucumber";
import fs from "fs";
import { FilePath, ZipPath } from "../../src/constants/files";
import { getCurrentBaseURL } from "../../src/services/env/env";
import { ApiContext } from "../../src/services/api/ApiContext";
import { CommonStep } from "./common";
import { ApiResponse } from "../../src/types/apiResponse";
import { ApiConfig } from "../../src/types/apiConfig";
import {
  extractNumberFromString,
  extractUUIDFromUrl,
} from "../../src/utils/string";
import validator from "validator";
import { getTotalFileInZip } from "../../src/utils/zip";

const feature = loadFeature("./tests/feature/Zip.feature");

defineFeature(feature, (test) => {
  let apiContext: ApiContext;
  let apiResponse: ApiResponse;
  let commonStep: CommonStep = new CommonStep();
  let zipPath: string;
  let listImages: string[];

  //#region common steps
  const whenIExecuteTheImageAPIAndReceiveResponse = (
    when: DefineStepFunction
  ) => {
    when(/^I execute the '(.*)' API and receive the response$/, async () => {
      await apiContext
        .execute()
        .then((response: any) => {
          apiResponse = {
            header: response.headers,
            status: response.status,
            body: response.data,
          };
          listImages = apiResponse.body.images;
        })
        .catch((err) => {
          const responseErr = err.response;
          apiResponse = {
            header: responseErr.headers,
            status: responseErr.status,
            body: responseErr.data,
          };
        });
    });
  };

  const thenIExpectResponseHaveCorrectStatus = (then: DefineStepFunction) => {
    then(/^I expect response should have status (\d+)$/, (status) => {
      commonStep.validateResponseStatusEqual(apiResponse.status, status);
    });
  };

  const andTheResponseHaveCorrectSchema = (and: DefineStepFunction) => {
    and(
      /^the response should have a json schema '(.*)'$/,
      (jsonStringSchema: string) => {
        commonStep.validateJsonToMatchSchema(
          apiResponse.body,
          jsonStringSchema
        );
      }
    );
  };

  const andAllLinksInResponseCorrectFormat = (and: DefineStepFunction) => {
    and(/^all links in response are in the correct format link$/, () => {
      listImages.forEach((imageLink) => {
        const uuid: string = extractUUIDFromUrl(imageLink);
        commonStep.validateImageUrlIsInCorrectFormat(imageLink, uuid);
      });
    });
  };

  const andTotalLinksInResponseEqualTotalFileInZip = (
    and: DefineStepFunction
  ) => {
    and(
      /^total links in response equal with total image files in Zip file$/,
      async () => {
        const totalFileInZip = await getTotalFileInZip(zipPath);
        commonStep.validateObjectToEqual(listImages.length, totalFileInZip);
      }
    );
  };

  const andAllImagesIDInResponseAreValidUUID = (and: DefineStepFunction) => {
    and(
      /^all images ID in the response are valid UUID '(.*)'$/,
      (uuidVersion: string) => {
        const version = extractNumberFromString(uuidVersion);
        listImages.forEach((imageLink) => {
          const uuid: string = extractUUIDFromUrl(imageLink);
          commonStep.validateUUIDIsInVersion(uuid, version);
        });
      }
    );
  };

  const andTheErrorInResponseShouldShowCorrect = (and: DefineStepFunction) => {
    and(
      /^the error in response message should be "(.*)"$/,
      (errorMsg: string) => {
        commonStep.validateObjectToEqual(apiResponse.body.err, errorMsg);
      }
    );
  };

  const andTheResponseShouldContainsCorrectMsg = (and: DefineStepFunction) => {
    and(/^the response should contains '(.*)'$/, (errorMsg: string) => {
      commonStep.validateObjectContains(apiResponse.body, errorMsg);
    });
  };
  //#endregion
  test("01 I get a list of permanent links when attach a Zip file containing multiple same image file type", async ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^I make a '(.*)' request to '(.*)' with a Zip file contains multiple image files in same type$/,
      (apiMethod: string, path: string) => {
        const form = new FormData();
        zipPath = ZipPath.CONTAINS_SAME_TYPE_IMAGE;
        form.append("file", fs.createReadStream(zipPath));
        const apiConfig: ApiConfig = {
          url: `${getCurrentBaseURL()}${path}`,
          method: apiMethod,
          headers: {
            ...form.getHeaders(),
          },
          data: form,
        };
        apiContext = new ApiContext(apiConfig);
      }
    );

    whenIExecuteTheImageAPIAndReceiveResponse(when);

    thenIExpectResponseHaveCorrectStatus(then);

    andTheResponseHaveCorrectSchema(and);

    andAllLinksInResponseCorrectFormat(and);

    andTotalLinksInResponseEqualTotalFileInZip(and);

    andAllImagesIDInResponseAreValidUUID(and);
  });

  test("02 I get a list of permanent links when attach a Zip file containing multiple image files with different types", async ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^I make a '(.*)' request to '(.*)' with a Zip file contains multiple image files with different types$/,
      (apiMethod: string, path: string) => {
        const form = new FormData();
        zipPath = ZipPath.CONTAINS_DIFFERENT_TYPE_IMAGE;
        form.append("file", fs.createReadStream(zipPath));
        const apiConfig: ApiConfig = {
          url: `${getCurrentBaseURL()}${path}`,
          method: apiMethod,
          headers: {
            ...form.getHeaders(),
          },
          data: form,
        };
        apiContext = new ApiContext(apiConfig);
      }
    );

    whenIExecuteTheImageAPIAndReceiveResponse(when);

    thenIExpectResponseHaveCorrectStatus(then);

    andTheResponseHaveCorrectSchema(and);

    andAllLinksInResponseCorrectFormat(and);

    andTotalLinksInResponseEqualTotalFileInZip(and);

    andAllImagesIDInResponseAreValidUUID(and);
  });

  test("03 I get a list of permanent links when attach a Zip file containing a lot of image files", async ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^I make a '(.*)' request to '(.*)' with a Zip file contains 100 image files$/,
      (apiMethod: string, path: string) => {
        const form = new FormData();
        zipPath = ZipPath.CONTAINS_100_IMAGES;
        form.append("file", fs.createReadStream(zipPath));
        const apiConfig: ApiConfig = {
          url: `${getCurrentBaseURL()}${path}`,
          method: apiMethod,
          headers: {
            ...form.getHeaders(),
          },
          data: form,
        };
        apiContext = new ApiContext(apiConfig);
      }
    );

    whenIExecuteTheImageAPIAndReceiveResponse(when);

    thenIExpectResponseHaveCorrectStatus(then);

    andTheResponseHaveCorrectSchema(and);

    andAllLinksInResponseCorrectFormat(and);

    andTotalLinksInResponseEqualTotalFileInZip(and);

    andAllImagesIDInResponseAreValidUUID(and);
  });

  test("04 I get a list of permanent links when attach a Zip file containing file that is not in image format", async ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^I make a '(.*)' request to '(.*)' with a Zip file contains file that is not in image format$/,
      (apiMethod: string, path: string) => {
        const form = new FormData();
        zipPath = ZipPath.CONTAINS_1_IMG_1_PDF;
        form.append("file", fs.createReadStream(zipPath));
        const apiConfig: ApiConfig = {
          url: `${getCurrentBaseURL()}${path}`,
          method: apiMethod,
          headers: {
            ...form.getHeaders(),
          },
          data: form,
        };
        apiContext = new ApiContext(apiConfig);
      }
    );

    whenIExecuteTheImageAPIAndReceiveResponse(when);

    thenIExpectResponseHaveCorrectStatus(then);

    andTheResponseHaveCorrectSchema(and);

    andAllLinksInResponseCorrectFormat(and);

    and(/^all links in response are image type$/, () => {
      listImages.forEach((imageLink) => {
        const uuid: string = extractUUIDFromUrl(imageLink);
        commonStep.validateFileTypeOfURLIsImage(imageLink, uuid);
      });
    });

    //Api will remove files that are not image type
    and(
      /^total links in response less than total image files in Zip file$/,
      async () => {
        const totalFileInZip = await getTotalFileInZip(zipPath);
        commonStep.validateOjectLessThan(listImages.length, totalFileInZip);
      }
    );

    andAllImagesIDInResponseAreValidUUID(and);
  });

  test("05 I receive the error when attach a Zip file that all files inside are not image", async ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^I make a '(.*)' request to '(.*)' with a Zip file that all files inside are not image$/,
      (apiMethod: string, path: string) => {
        const form = new FormData();
        zipPath = ZipPath.CONTAINS_ALL_FILES_NOT_IMAGE;
        form.append("file", fs.createReadStream(zipPath));
        const apiConfig: ApiConfig = {
          url: `${getCurrentBaseURL()}${path}`,
          method: apiMethod,
          headers: {
            ...form.getHeaders(),
          },
          data: form,
        };
        apiContext = new ApiContext(apiConfig);
      }
    );

    whenIExecuteTheImageAPIAndReceiveResponse(when);

    thenIExpectResponseHaveCorrectStatus(then);

    andTheResponseHaveCorrectSchema(and);

    andTheErrorInResponseShouldShowCorrect(and);
  });

  test("06 I receive the error when attach a Zip file that have nothing inside", async ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^I make a '(.*)' request to '(.*)' with a Zip file that have nothing inside$/,
      (apiMethod: string, path: string) => {
        const form = new FormData();
        zipPath = ZipPath.HAVE_NOTHING_INSIDE;
        form.append("file", fs.createReadStream(zipPath));
        const apiConfig: ApiConfig = {
          url: `${getCurrentBaseURL()}${path}`,
          method: apiMethod,
          headers: {
            ...form.getHeaders(),
          },
          data: form,
        };
        apiContext = new ApiContext(apiConfig);
      }
    );

    whenIExecuteTheImageAPIAndReceiveResponse(when);

    thenIExpectResponseHaveCorrectStatus(then);

    andTheResponseHaveCorrectSchema(and);

    andTheErrorInResponseShouldShowCorrect(and);
  });

  test("07 I receive the error when attach a file that is not a zip file", async ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^I make a '(.*)' request to '(.*)' with a file that is not a zip file$/,
      (apiMethod: string, path: string) => {
        const form = new FormData();
        zipPath = ZipPath.NOT_A_ZIP_FILE;
        form.append("file", fs.createReadStream(zipPath));
        const apiConfig: ApiConfig = {
          url: `${getCurrentBaseURL()}${path}`,
          method: apiMethod,
          headers: {
            ...form.getHeaders(),
          },
          data: form,
        };
        apiContext = new ApiContext(apiConfig);
      }
    );

    whenIExecuteTheImageAPIAndReceiveResponse(when);

    thenIExpectResponseHaveCorrectStatus(then);

    andTheResponseHaveCorrectSchema(and);

    andTheErrorInResponseShouldShowCorrect(and);
  });

  test("08 I receive the error when request to Service without attach any zip file", async ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^I make a '(.*)' request to '(.*)' without attach any zip file$/,
      (apiMethod: string, path: string) => {
        const form = new FormData();
        const apiConfig: ApiConfig = {
          url: `${getCurrentBaseURL()}${path}`,
          method: apiMethod,
          headers: {
            ...form.getHeaders(),
          },
          data: form,
        };
        apiContext = new ApiContext(apiConfig);
      }
    );

    whenIExecuteTheImageAPIAndReceiveResponse(when);

    thenIExpectResponseHaveCorrectStatus(then);

    andTheResponseShouldContainsCorrectMsg(and);
  });

  test("09 I receive the error when upload multiple zip files", async ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^I make a '(.*)' request to '(.*)' with 2 zip files$/,
      (apiMethod: string, path: string) => {
        const form = new FormData();
        form.append("file", fs.createReadStream(ZipPath.CONTAINS_1_IMG_1_PDF));
        form.append(
          "file",
          fs.createReadStream(ZipPath.CONTAINS_SAME_TYPE_IMAGE)
        );
        const apiConfig: ApiConfig = {
          url: `${getCurrentBaseURL()}${path}`,
          method: apiMethod,
          headers: {
            ...form.getHeaders(),
          },
          data: form,
        };
        apiContext = new ApiContext(apiConfig);
      }
    );

    whenIExecuteTheImageAPIAndReceiveResponse(when);

    thenIExpectResponseHaveCorrectStatus(then);

    andTheResponseShouldContainsCorrectMsg(and);
  });

  test("10 I receive the error when upload the valid zip file to wrong end point", async ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^I make a '(.*)' request to '(.*)' with a valid zip file$/,
      (apiMethod: string, path: string) => {
        const form = new FormData();
        form.append(
          "file",
          fs.createReadStream(ZipPath.CONTAINS_SAME_TYPE_IMAGE)
        );
        const apiConfig: ApiConfig = {
          url: `${getCurrentBaseURL()}${path}`,
          method: apiMethod,
          headers: {
            ...form.getHeaders(),
          },
          data: form,
        };
        apiContext = new ApiContext(apiConfig);
      }
    );

    whenIExecuteTheImageAPIAndReceiveResponse(when);

    thenIExpectResponseHaveCorrectStatus(then);

    andTheResponseShouldContainsCorrectMsg(and);
  });
});
