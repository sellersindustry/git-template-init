import fs from "fs-extra";
import path from "path";
import https from "https";
import AdmZip from "adm-zip";
import { Options } from './options.js'


GitTemplateInit({
    gitURL: "https://github.com/sellersindustry/SherpaJS-template-module",
    location: "./test"
});

export default async function GitTemplateInit(options:Options) {
    validateGitHubURL(options.gitURL);
    let { owner, repo } = extractRepoDetails(options.gitURL);
    let archiveURL      = getArchiveURL(owner, repo);
    let zipFile         = path.join(options.location, "git-template-init.zip");
    let extractionDir   = path.join(options.location, "git-template-init");
    await download(archiveURL, zipFile);
    extract(zipFile, extractionDir);
}



function extract(inputFile:string, outputPath:string) {
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    }
    let zip = new AdmZip(inputFile);
    zip.extractAllTo(outputPath, true);
}


async function download(archiveURL:string, filename:string) {
    // let file = fs.createWriteStream(filename);
    // https.get(archiveURL, response => {
    //     response.pipe(file);
    //     file.on("finish", () => {
    //         file.close();
    //     });
    // }).on("error", error => {
    //     fs.unlink(filename);
    //     throw new Error("Unable to download archive: " + error);
    // });
}


function getArchiveURL(owner:string, repo:string) {
    return `https://github.com/${owner}/${repo}/archive/refs/heads/main.zip`;
}


function extractRepoDetails(gitURL:string):{ owner:string, repo:string } {
    let url      = gitURL.endsWith("/") ? gitURL.slice(0, -1) : gitURL;
    let sections = url.split("/");
    if (sections.length < 3) {
        throw new Error("Invalid GitHub Repository URL format");
    }
    return {
        owner: sections[sections.length - 2],
        repo:  sections[sections.length - 1],
    }
}


function validateGitHubURL(gitURL:string) {
    try {
        let url = new URL(gitURL);
        if (url.hostname.toLowerCase() != "github.com") {
            throw new Error("Only GitHub repositories are supported");
        }
    } catch {
        throw new Error("Invalid URL format");
    }
}
