import { AppApi } from "../../src/constants/api";
import { FileTypes, ImageFileTypes } from "../../src/constants/files";
import { getCurrentBaseURL } from "../../src/services/env/env";
import validator from "validator";

export class CommonStep {
  public validateFileTypeOfURLIsImage(url: string, uuid: string) {
    const urlWithoutFileExt = `${getCurrentBaseURL()}${
      AppApi.PATH.IMAGES
    }/${uuid}`;
    const fileExtension = url.replace(urlWithoutFileExt, "");
    expect(ImageFileTypes).toContain(fileExtension);
  }

  public validateResponseStatusEqual(expectStatus: any, actualStatus: any) {
    expect(parseInt(expectStatus)).toEqual(parseInt(actualStatus));
  }

  public validateJsonToMatchSchema(json: any, stringSchema: string) {
    expect(json).toMatchSchema(JSON.parse(stringSchema));
  }

  public validateUUIDIsInVersion(uuid: string, version: any) {
    expect(validator.isUUID(uuid, version)).toBeTruthy();
  }

  public validateObjectContains(object: any, item: any) {
    expect(object).toContain(item);
  }

  public validateObjectToEqual(firstObj: any, secondObj: any) {
    expect(firstObj).toEqual(secondObj);
  }

  public validateOjectLessThan(firstObj: any, secondObj: any) {
    expect(firstObj).toBeLessThan(secondObj);
  }

  public validateImageUrlIsInCorrectFormat(
    imageUrl: string,
    uuid: string,
    fileExtension?: string
  ) {
    if (fileExtension) {
      expect(imageUrl).toEqual(
        `${getCurrentBaseURL()}${AppApi.PATH.IMAGES}/${uuid}${fileExtension}`
      );
    } else {
      const urlWithoutFileExt = `${getCurrentBaseURL()}${
        AppApi.PATH.IMAGES
      }/${uuid}`;
      const fileExtension = imageUrl.replace(urlWithoutFileExt, "");
      expect(imageUrl).toEqual(`${urlWithoutFileExt}${fileExtension}`);
      expect(FileTypes).toContain(fileExtension);
    }
  }
}
