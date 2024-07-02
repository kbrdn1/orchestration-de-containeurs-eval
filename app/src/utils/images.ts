const urlS3DAM: string = "https://dam-flippad.s3.eu-west-3.amazonaws.com/";

export const changeImageSize = (url: string | undefined, size: number) => {
  if (!urlS3DAM || !url) return "";

  const regex = new RegExp(`${urlS3DAM}([0-9]+)`);
  return url.replace(regex, `${urlS3DAM}${size}`);
};

