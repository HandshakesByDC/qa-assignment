import { AppApi } from "../../src/constants/api";
import { getCurrentBaseURL } from "../../src/core/env/env";

export class CommonStep {
  public validateImageUrlIsInCorrectFormat(
    imageUrl: string,
    uuid: string,
    fileExtension: string
  ) {
    expect(imageUrl).toEqual(
      `${getCurrentBaseURL()}${AppApi.PATH.IMAGES}/${uuid}${fileExtension}`
    );
  }
}
