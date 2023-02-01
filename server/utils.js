const Utils = {};

Utils.formMessage = (message, code) => {
    let response = { code: "", success: false };
    response.data = message;
    response.code = code;

    if (response.code === 200 || response.code === 202) {
        response.success = true;
    }

    return response;
}

Utils.buildMap = (array, mapKey, mapValue) => {
    let map = {};
    for (let item of array) {
        map[item[mapKey]] = mapValue ? item[mapValue] : item;
    }
    return map;
}

Utils.getValue = (data, key, defaultValue) => {
    let value = _.get(data, key);
    if (value === undefined || value === null) {
        return defaultValue;
    }
    return value;
};

export default Utils;