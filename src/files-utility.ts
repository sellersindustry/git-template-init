import AdmZip from "adm-zip";
import fs from "fs";
import Downloader from "nodejs-file-downloader";
import { InternalError } from "./error";


export class FilesUtility {


    public static isDirectoryEmpty(directory:string) {
        return fs.readdirSync(directory).length === 0;
    }


    public static getDirectories(filepath:string):string[] {
        try {
            return fs.readdirSync(filepath, { withFileTypes: true })
                .filter((entry) => entry.isDirectory())
                .map((entry) => entry.name);
        } catch (err) {
            return [];
        }
    }


    public static async download(url:string, directory:string):Promise<string> {
        try {
            let downloader = new Downloader({ url, directory });
            return (await downloader.download()).filePath!;
        } catch (error) {
            throw new InternalError("Unable to download archive: " + error);
        }
    }


    public static extract(filepath:string, directory:string) {
        try {
            new AdmZip(filepath).extractAllTo(directory, true);
        } catch (error) {
            throw new InternalError("Unable to unzip archive: " + error);
        }
    }

}


