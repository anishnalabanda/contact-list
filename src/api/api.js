export default class Api {
    static makeRemoteRequest(configJson) {
        const url = `${configJson.userUrl}/?results=${configJson.numberCards}`;
        return fetch(url);
    }
}