const { Watermark } = require('../config/database');
const fs = require('fs');
const path = require('path');
const imageWatermark = require('image-watermark');
const jimpWatermark = require('jimp-watermark');

const publicFolderName = "temp/";
const tempFolderName = "watermark/";


function watermarkText(mainFilePath, watermark, exportPath) {
    if (!fs.existsSync(exportPath)) {
        const separator = "/" || "\\";
        const makePath = exportPath.split(separator);
        makePath
            .reduce((prevPath, folder, currentIndex) => {
                const currentPath = path.join(prevPath, folder, separator);
                if (currentIndex < makePath.length - 1 && !fs.existsSync(currentPath)) {
                    fs.mkdirSync(currentPath);
                }
                return currentPath;
            }, '');
    }
    return new Promise(resolve => {
        imageWatermark.embedWatermarkWithCb(mainFilePath, {
            'text': watermark.text,
            'color': watermark.colorCode,
            'dstPath': exportPath,
        }, (err) => {
            if (!err) {
                resolve('Succefully embeded watermark');
            } else {
                console.log(err);
            }
        });
    });
}

async function watermarkImage(imagePath, watermark, imageExportPath) {
    const options = {
        dstPath: imageExportPath,
    }
    let imageData = new Buffer(watermark.image).toString('binary');
    imageData = imageData.split(",").slice(1, imageData.length).join(",");
    fs.writeFileSync('./temp/watermark.jpg', imageData, 'base64', function (err) {
        if (err) console.log(err);
    });
    await jimpWatermark.addWatermark(imagePath, './temp/watermark.jpg', options);
}

module.exports = async (mainFilePath, type) => {
    const list = mainFilePath.split("/");
    list[0] = publicFolderName.slice(0, -1);
    const exportPath = publicFolderName + list.slice(2, list.length).join("/");
    const watermarkDb = await Watermark.findOne({
        where: { isActive: true },
        raw: true,
    });
    if (watermarkDb) {
        if (watermarkDb.isImage) {
            if (type === "pdf") return;
            await watermarkImage(mainFilePath, watermarkDb, exportPath);
        } else {
            await watermarkText(mainFilePath, watermarkDb, exportPath);
        }
    }
}
