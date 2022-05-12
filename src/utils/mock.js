const fs = require('fs');
const path = require('path');

class Mock {

    static getMockFilePath(utility) {
        console.log(path.join(path.dirname(process.mainModule.filename), 'mocks', utility + '.json'));
        return path.join(path.dirname(process.mainModule.filename), 'mocks', utility + '.json');
    }

    static load(utility) {
        const mockFilename = Mock.getMockFilePath(utility);
        let data = {};
        try {
            data = fs.readFileSync(mockFilename, {encoding: 'utf8', flag: 'r'});
        } catch (e) {
        }

        return data;
    }

    static get(utility, key) {
        const data = Mock.load(utility);
        const mock = (data.length > 0) ? JSON.parse(data) : {};
        return mock[key];
    }

    static put(utility, key, value) {
        const mockFilename = Mock.getMockFilePath(utility);
        let mock = {};
        if (!fs.existsSync(mockFilename)) {
            fs.writeFileSync(mockFilename, JSON.stringify(mock), {encoding: 'utf8', flag: 'w'});
        }
        const data = Mock.load(utility);
        mock = (data.length > 0) ? JSON.parse(data) : {};
        mock[key] = value;
        fs.writeFileSync(mockFilename, JSON.stringify(mock), {encoding: 'utf8', flag: 'w'});
    }

}

module.exports = Mock;