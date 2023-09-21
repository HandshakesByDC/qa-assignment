import { DefineStepFunction, defineFeature, loadFeature } from "jest-cucumber";
import { ApiContext } from "../../src/core/api/ApiContext";
import { ApiConfig } from "../../src/types/apiConfig";
import { getCurrentBaseURL } from "../../src/core/env/env";
import FormData from "form-data";
import fs from "fs";
import { FilePath, LargeFile } from "../../src/constants/filePath";
import validator from "validator";
import {
  extractNumberFromString,
  extractUUIDFromUrl,
} from "../../src/utils/string";
import { CommonStep } from "./common";
import { ApiResponse } from "../../src/types/apiResponse";

const feature = loadFeature("./tests/feature/Image.feature");

defineFeature(feature, (test) => {
  let apiContext: ApiContext;
  let uuid: string;
  let imageExtension: string;
  let imageUrl: string;
  let apiResponse: ApiResponse;
  let commonStep: CommonStep = new CommonStep();

  beforeEach(() => {
    commonStep = new CommonStep();
  });

  const whenIExecuteTheImageAPIAndReceiveResponse = (
    when: DefineStepFunction
  ) => {
    when(
      /^I execute the '\/api\/image' API and receive the response$/,
      async () => {
        await apiContext
          .execute()
          .then((response: any) => {
            apiResponse = {
              header: response.headers,
              status: response.status,
              body: response.data,
            };
          })
          .catch((err) => {
            const responseErr = err.response;
            apiResponse = {
              header: responseErr.headers,
              status: responseErr.status,
              body: responseErr.data,
            };
          });
      }
    );
  };

  const thenIExpectResponseHaveCorrectStatus = (then: DefineStepFunction) => {
    then(/^I expect response should have status (\d+)$/, (status) => {
      expect(apiResponse.status).toEqual(parseInt(status));
    });
  };

  const andTheReponseHaveCorrectFormat = (and: DefineStepFunction) => {
    and(
      /^the response have a permanent link to this picture in the correct format$/,
      () => {
        uuid = extractUUIDFromUrl(apiResponse.body.image);
        imageUrl = apiResponse.body.image;
        uuid = extractUUIDFromUrl(imageUrl);
        commonStep.validateImageUrlIsInCorrectFormat(
          imageUrl,
          uuid,
          imageExtension
        );
      }
    );
  };

  const andTheResponseHaveCorrectSchema = (and: DefineStepFunction) => {
    and(
      /^the response should have a json schema '(.*)'$/,
      (jsonStringSchema: string) => {
        expect(apiResponse.body).toMatchSchema(JSON.parse(jsonStringSchema));
      }
    );
  };

  const andTheUUIDIsInCorrectVersion = (and: DefineStepFunction) => {
    and(
      /^the image link in the response is the valid UUID '(.*)'$/,
      (uuidVersion: string) => {
        const version = extractNumberFromString(uuidVersion);
        expect(validator.isUUID(uuid, version)).toBeTruthy();
      }
    );
  };

  test("01 I have a permanent link when attach a picture to the Service", async ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^I make '(.*)' request to '(.*)' attached a picture with extension '(.*)'$/,
      (apiMethod: string, path: string, fileExtension: string) => {
        imageExtension = fileExtension;
        const form = new FormData();
        form.append("file", fs.createReadStream(FilePath[fileExtension]));
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

    andTheReponseHaveCorrectFormat(and);

    andTheResponseHaveCorrectSchema(and);

    andTheUUIDIsInCorrectVersion(and);
  });

  test("02 I have a permanent link when attach a large-size picture to the Service", async ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^I make a '(.*)' request to '(.*)' attached a large size picture$/,
      (apiMethod: string, path: string) => {
        const form = new FormData();
        form.append("file", fs.createReadStream(LargeFile.IMAGE));
        imageExtension = ".png";
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

    andTheReponseHaveCorrectFormat(and);

    andTheResponseHaveCorrectSchema(and);

    andTheUUIDIsInCorrectVersion(and);
  });

  test("03 I can not attach a file which is not an image to the Service", async ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^I make a '(.*)' request to '(.*)' attached a '(.*)' file which is not an image$/,
      (apiMethod: string, path: string, fileExtension: string) => {
        const form = new FormData();
        form.append("file", fs.createReadStream(FilePath[fileExtension]));
        imageExtension = fileExtension;
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

    and(
      /^the error in response message should be "(.*)"$/,
      (errorMsg: string) => {
        expect(apiResponse.body.err).toEqual(errorMsg);
      }
    );
  });
});
