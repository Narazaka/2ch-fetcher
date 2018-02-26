import * as iconv from "iconv-lite";
import * as request from "request-promise-native";
// tslint:disable-next-line no-var-requires no-require-imports
const chardet = require("chardet");

export const requestOptions = {};

export async function fetch(url: string) {
    const responseBuffer = await request(url, {...requestOptions, encoding: null});
    const encoding = chardet.detect(responseBuffer);
    const response = iconv.decode(responseBuffer, encoding);

    return response;
}
