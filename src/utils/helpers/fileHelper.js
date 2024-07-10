import { apiRequest } from '../config/apiRequest';
import config from '../config/config';
import { _apiUrls } from '../endPoints/apiUrls';

const fileUploadToS3 = async (files, dirName = '') => {
    try {
        let payload = new FormData()
        let fileUploadArray = [], resultUrls = []

        for (const file of files) {

            if (typeof file === 'object') {
                fileUploadArray.push(file)
            } else {
                resultUrls?.push(file)
            }
        }

        for (const file of fileUploadArray) {
            payload.append('file', file)
        }

        payload.append("folder_name", dirName)

        if (fileUploadArray?.length) {

            let { status, data } = await apiRequest({
                endUrl: _apiUrls.fileUploadToS3,
                method: "POST",
                body: payload,
                headerType: 'form'
            })
            if (status) {
                resultUrls = resultUrls.concat(data)
            }
        }
        return resultUrls
    } catch (err) {
        console.log('err in fileUploadToS3 : ', err);
        return null;
    }
};

const getS3Url = (path) => config.S3Configs.base_url + path;

const validateImageFileType = (formate) =>
    ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/bmp', 'image/svg', 'image/svg+xml'].includes(formate);


const validateDocFileType = (formate) =>
    ['image/png', 'image/jpg', 'image/jpeg'].includes(formate);

export {
    fileUploadToS3,
    validateImageFileType,
    validateDocFileType,
    getS3Url
}


