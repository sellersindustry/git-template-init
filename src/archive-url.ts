import { InternalError } from "./error.js";


const REGEX_GITHUB_STANDARD_URL = /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/;



export function getArchiveURL(gitURL:string):string {
    let url = getURL(gitURL);
    if (url.toString().endsWith(".zip")) {
        return url.toString();
    } else if (isGithubStandard(url)) {
        return getGithubStandard(url);
    }
    throw new InternalError("Invalid Git URL, unable to detect format");
}


function getURL(url:string):URL {
    try {
        return new URL(url);
    } catch (error) {
        throw new InternalError("Invalid Git URL");
    }
}


function isGithubStandard(url:URL) {
    return REGEX_GITHUB_STANDARD_URL.test(url.toString());
}


function getGithubStandard(url:URL):string {
    url.pathname += "/archive/refs/heads/main.zip";
    return url.toString();
}

