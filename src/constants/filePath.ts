const projectPath: string = process.cwd();
const PATH = {
  IMAGES: "/assets/images",
  OTHERS: "/assets/others",
};

export const FilePath: { [fileExtension: string]: string } = {
  ".jpeg": `${projectPath}${PATH.IMAGES}/camera_lense_0.jpeg`,
  ".pdf": `${projectPath}${PATH.OTHERS}/test-pdf.pdf`,
};

export const LargeFile = {
  IMAGE: `${projectPath}${PATH.IMAGES}/large-size-image.png`,
};
