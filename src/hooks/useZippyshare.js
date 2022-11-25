import { load } from "cheerio";

const useZippyshare = async (_videoUrl) => {
  try {
    console.log("useZippyshare");
    const response = await fetch(_videoUrl);
    const html = await response.text();
    const $ = load(html);
    const scriptHref = $("div.center script").text();
    if (!scriptHref) return null;
    const scriptUrl = scriptHref.split("href =")[1].split(";")[0];
    const videoUrl = `${_videoUrl.split(".")[0]}.zippyshare.com${eval(
      scriptUrl
    )}`;
    if (!videoUrl) return null;
    return videoUrl;
  } catch (error) {
    console.log(error);
    console.log(_videoUrl);
    return null;
  }
};

export default useZippyshare;
