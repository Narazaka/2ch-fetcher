import * as iconv from "iconv-lite";
import * as request from "request-promise-native";
// tslint:disable-next-line no-var-requires no-require-imports
const chardet = require("chardet");

export const requestOptions: request.RequestPromiseOptions = {};

export async function fetch(url: string) {
    let responseBuffer;
    try {
        responseBuffer = await request(url, {...requestOptions, encoding: null});
    } catch (error) {
        const errorEncoding = chardet.detect(error.error);
        const errorResponse = iconv.decode(error.error, errorEncoding);
        throw new Error(`${error.message} ${errorResponse}`);
    }
    const encoding = chardet.detect(responseBuffer);
    const response = iconv.decode(responseBuffer, encoding);

    return response;
}
