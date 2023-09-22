import { File } from "buffer";
import { open } from "node:fs/promises";
import { basename } from "node:path";

// Using with new of Formdata updated from node v18
export async function createStreamableFile(path: string): Promise<File> {
  const name = basename(path);
  const handle = await open(path);
  const { size } = await handle.stat();

  const file = new File([], name);
  file.stream = () => handle.readableWebStream();

  Object.defineProperty(file, "size", { get: () => size });

  return file;
}
