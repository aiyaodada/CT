import * as AdmZip from 'adm-zip';
import * as path from 'path';
import * as fs from 'fs';

export const isEmpty = (value: any): Boolean => {
    return (
        value == null ||
        value == "" ||
        value == undefined
    );
}

//解压zip
export const unzip = async (zipPath, targetPath) => {
    if (!fs.existsSync(zipPath)) {
        return false;
    }
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(targetPath, true);
    return true;
};