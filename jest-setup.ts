import { matchers } from "jest-json-schema";
import { toMatchImageSnapshot } from "jest-image-snapshot";

expect.extend(matchers);
expect.extend({ toMatchImageSnapshot });
