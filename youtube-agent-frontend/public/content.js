
const getYouTubeVideoURL = () => {
  const url = window.location.href;

  if (url.includes("youtube.com/watch")) {
    return url;
  }

  return null;
};

const videoURL = getYouTubeVideoURL();
if (videoURL) {
  chrome.runtime.sendMessage({ type: "YOUTUBE_VIDEO_URL", url: videoURL });
}
