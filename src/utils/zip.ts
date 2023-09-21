import StreamZip from "node-stream-zip";

export async function getTotalFileInZip(zipPath: string): Promise<number> {
  const zip = new StreamZip({
    file: zipPath,
    storeEntries: true,
  });

  try {
    return await new Promise<number>((resolve, reject) => {
      zip.on("ready", () => {
        const filesInZip = zip.entriesCount;
        zip.close();
        resolve(filesInZip);
      });

      zip.on("error", (err) => {
        reject(err);
      });
    });
  } catch (error) {
    console.error("Error when reading Zip file:", error);
    throw error;
  }
}
