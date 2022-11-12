const getClassNames = (classObject) => {
    let classStr = '';
    for (let key in classObject) {
        if (classObject[key]) {
            classStr += key;
        }
    }
    return classStr;
}

export default {
    getClassNames
}