export function createFiledata(file: File[], insertId: string) {
  let type;
  if (file[0].type.split("/")[0] === "image") type = ".png";
  else type = ".mp4";
  const filename =
    file[0].type.split("/")[0] + "_" + insertId + "_" + Date.now() + type;
  const filedata = new FormData();
  filedata.append("filedata", new Blob(file), filename);
  return { filedata, filename };
}

export function createFiledataProfile(file: File[], login: string) {
  const filename = login + ".png";
  const filedata = new FormData();
  filedata.append("filedata", new Blob(file), filename);
  return { filedata, filename };
}
