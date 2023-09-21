import { AppApi } from "../../src/constants/api";
import { FileTypes, ImageFileTypes } from "../../src/constants/files";
import { getCurrentBaseURL } from "../../src/core/env/env";

export class CommonStep {
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

  public validateFileTypeOfURLIsImage(url: string, uuid: string) {
    const urlWithoutFileExt = `${getCurrentBaseURL()}${
      AppApi.PATH.IMAGES
    }/${uuid}`;
    const fileExtension = url.replace(urlWithoutFileExt, "");
    expect(ImageFileTypes).toContain(fileExtension);
  }
}
