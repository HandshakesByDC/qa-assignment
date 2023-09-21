const projectPath: string = process.cwd();
const PATH = {
  IMAGES: "/assets/images",
  OTHERS: "/assets/others",
};

export const FilePath: { [fileExtension: string]: string } = {
  ".bmp": `${projectPath}${PATH.IMAGES}/flower-field.gif`,
  ".csv": `${projectPath}${PATH.OTHERS}/csv-sample.csv`,
  ".docx": `${projectPath}${PATH.OTHERS}/test-docs.docx`,
  ".ico": `${projectPath}${PATH.IMAGES}/whatsapp-icon.ico`,
  ".json": `${projectPath}${PATH.OTHERS}/sample-json.json`,
  ".gif": `${projectPath}${PATH.IMAGES}/flying-bird.gif`,
  ".jpeg": `${projectPath}${PATH.IMAGES}/camera_lense.jpeg`,
  ".jpg": `${projectPath}${PATH.IMAGES}/istock612.jpg`,
  ".png": `${projectPath}${PATH.IMAGES}/kinemaster.png`,
  ".pdf": `${projectPath}${PATH.OTHERS}/test-pdf.pdf`,
  ".svg": `${projectPath}${PATH.IMAGES}/strawberry.svg`,
  ".tif": `${projectPath}${PATH.IMAGES}/leaves.tif`,
  ".xml": `${projectPath}${PATH.OTHERS}/test-xml.xml`,
  ".webp": `${projectPath}${PATH.IMAGES}/webp-sample.webp`,
};

export const LargeFile = {
  IMAGE: `${projectPath}${PATH.IMAGES}/large-size-image.png`,
};
