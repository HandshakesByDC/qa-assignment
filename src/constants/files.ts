const projectPath: string = process.cwd();
const PATH = {
  IMAGES: "/assets/images",
  OTHERS: "/assets/others",
  ZIP: "/assets/zip",
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

export const ZipPath = {
  CONTAINS_SAME_TYPE_IMAGE: `${projectPath}${PATH.ZIP}/same-type-img.zip`,
  CONTAINS_DIFFERENT_TYPE_IMAGE: `${projectPath}${PATH.ZIP}/different-type-image.zip`,
  CONTAINS_100_IMAGES: `${projectPath}${PATH.ZIP}/100-images.zip`,
  CONTAINS_1_IMG_1_PDF: `${projectPath}${PATH.ZIP}/1-img-1-pdf.zip`,
  CONTAINS_ALL_FILES_NOT_IMAGE: `${projectPath}${PATH.ZIP}/all-files-not-image.zip`,
  HAVE_NOTHING_INSIDE: `${projectPath}${PATH.ZIP}/nothing.zip`,
  NOT_A_ZIP_FILE: `${projectPath}${PATH.ZIP}/rar-file-with-img.rar`,
};

export const LargeFile = {
  IMAGE: `${projectPath}${PATH.IMAGES}/large-size-image.png`,
};

export const ImageFileTypes = [
  ".bmp",
  ".ico",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".tif",
  ".webp",
];

export const OtherFileType = [
  ".csv",
  ".docx",
  ".json",
  ".pdf",
  ".xml",
  ".zip",
  ".rar",
];

export const FileTypes = ImageFileTypes.concat(OtherFileType);
