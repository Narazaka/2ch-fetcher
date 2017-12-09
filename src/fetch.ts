import * as iconv from "iconv-lite";
import * as request from "request-promise-native";
// tslint:disable-next-line no-var-requires no-require-imports
const chardet = require("chardet");

export async function fetch(url: string) {
    const responseBuffer = await request(url, {encoding: null});
    const encoding = chardet.detect(responseBuffer);
    const response = iconv.decode(responseBuffer, encoding);

    return response;
}
