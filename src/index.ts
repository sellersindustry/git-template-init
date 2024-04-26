
import fs from "fs-extra";
import path from "path";
import { Options } from './options.js'
import { getArchiveURL } from "./archive-url.js";
import { InternalError } from "./error.js";
import { FilesUtility } from "./files-utility.js";


(async () => {
    await GitTemplateInit({
        git: "https://github.com/sellersindustry/SherpaJS-template-module",
        directory: "./test"
    });
})();



export default async function GitTemplateInit(options:Options) {
    let archiveURL = getArchiveURL(options.git);
    let directory  = getDownloadDirectory(options.directory);
    let filepath   = await FilesUtility.download(archiveURL, directory);

    FilesUtility.extract(filepath, directory);
    fs.unlinkSync(filepath);

    //! FIXME Cleanup
    if (!options.disablePrimaryDirectoryFix) {
        let subdirectories = FilesUtility.getDirectories(directory);
        if (subdirectories.length == 1) {
            moveFilesUpOneLevel(path.join(directory, subdirectories[0]));
        }
    }
}


function getDownloadDirectory(directory:string) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
    if (!FilesUtility.isDirectoryEmpty(directory)) {
        throw new InternalError("Directory is not empty");
    }
    return directory;
}



function moveFilesUpOneLevel(source:string):Promise<void> {
    //! FIXME Cleanup
    return new Promise((resolve, reject) => {
        fs.readdir(source, (err, files) => {
            if (err) {
                reject(err);
            } else {
                const moveFile = (fileIndex: number): void => {
                    if (fileIndex >= files.length) {
                        fs.rmdir(source).then(() => {
                            resolve();
                        });
                        return;
                    }
            
                    let sourcePath = path.join(source, files[fileIndex]);
                    let targetPath = path.join(source, "..", files[fileIndex]);
            
                    fs.rename(sourcePath, targetPath, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            moveFile(fileIndex + 1);
                        }
                    });
                };
                moveFile(0);
            }
        });
    });
}

