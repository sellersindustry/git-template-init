const Downloader = require("nodejs-file-downloader");

(async () => {
  //Wrapping the code with an async function, just for the sake of example.

  const downloader = new Downloader({
    url: "https://github.com/sellersindustry/SherpaJS-template-module/archive/refs/heads/main.zip", //If the file name already exists, a new file with the name 200MB1.zip is created.
    directory: "./downloads", //This folder will be created, if it doesn't exist.   
  });
  try {
    const {filePath,downloadStatus} = await downloader.download(); //Downloader.download() resolves with some useful properties.

    console.log("All done");
  } catch (error) {
    //IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
    //Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
    console.log("Download failed", error);
  }
})();