const deepCopy = obj => {
    return JSON.parse(JSON.stringify(obj));
};

const prettyJSON = obj => {
    JSON.stringify(obj, null, 2);
};

const deepFreeze = obj => {
    Object.freeze(obj);

    Object.getOwnPropertyNames(obj).forEach(prop => {
        if (obj.hasOwnProperty(prop)
            && obj[prop] !== null
            && (typeof obj[prop] === 'object' || typeof obj[prop] === 'function')
            && !Object.isFrozen(obj[prop])) {
            deepFreeze(obj[prop]);
        }
    });

    return obj;
};

/**
 * Simplified version of lodash.getPath to fetch a nested value.
 * Examples:
 * - deepValue(obj, 'a.b.1')
 * - deepValue(obj, ['a','b','1'])
 * - deepValue(obj, 'a.b.1', 'my default value if property does not exist')
 *
 * @param obj Object in which to search for the nested value.
 * @param path An array of strings or single string with '.' as properties delimiter.
 * @param defaultValue Optional parameter (default: undefined) to return in case the nested value is not found (undefined).
 * @returns The nested value defined by the path or defaultValue if not found in the obj
 */
const deepValue = (obj, path, defaultValue) => {
    if (obj === undefined || obj === null) {
        return defaultValue;
    }

    let properties;
    if (Array.isArray(path)) {
        properties = path;
    } else if (typeof path === 'string') {
        properties = path.split('.');
    } else {
        throw new Error(`Argument error for path ${path}`);
    }

    if (properties.length === 0) {
        return defaultValue;
    }

    let current = obj;
    for (let p = 0; p < properties.length; p++) {
        let property = properties[p];
        current = current[property];
        // If not evaluating the deepest property and value is undefined/null, then stop and return defaultValue
        if (p !== properties.length - 1 && (current === undefined || current === null)) {
            return defaultValue;
        }
    }
    return current;
};

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
const isObject = item => item && typeof item === 'object' && !Array.isArray(item);

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
const deepMerge = (target, ...sources) => {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                deepMerge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return deepMerge(target, ...sources);
};

module.exports.deepCopy = deepCopy;
module.exports.prettyJSON = prettyJSON;
module.exports.deepFreeze = deepFreeze;
module.exports.deepValue = deepValue;
module.exports.isObject = isObject;
module.exports.deepMerge = deepMerge;
