import fs from "fs";

export function jsonParser(input) {
    let filePath;
    if (input === "datasets") {
        filePath = './data/datasets.json'
    }
    else if (input === "users") {
        filePath = './data/users.json'
    }
    else if (input === "accessHistory") {
        filePath = './data/accessHistory.json'
    }

    // stops if jsonParser is called with an unknown file
    if (filePath === undefined) {
        throw new Error(`JSON file not found`);
    }

    try {
        //reads the selected json file
        const read_data = fs.readFileSync(filePath, 'utf-8');
        // returns the parsed json file to a readable javascript object
        return JSON.parse(read_data);
    }
    catch (error) {
        // make file/path/JSON problems easier to understand.
        throw new Error(`Could not read or parse ${filePath}: ${error.message}`);
    }

}

// findByID searches for dataset with datasetID which is dataset id such as c1

export function findByID(datasetID) {
    const json_data = jsonParser("datasets")
    return json_data.find(json_data => json_data.id === datasetID) //For each dataset, check whether its id matches the id we are looking for.
}

export function findUserByID(userID) {
    const users = jsonParser("users");
    return users.find(user => user.id === userID);
}

export function createUser(userID, userName) {
    // Creates new User  
    const users = jsonParser("users");
    const accessHistory = jsonParser("accessHistory");

    // stop if the ID or name is missing.
    if (userID === undefined || userName === undefined || userID === "" || userName === "") {
        console.log("CREATE USER DENIED: user ID and user name are required");
        return false;
    }

    // stop if duplicate user IDs in users.json.
    const existingUser = users.find(user => user.id === userID);
    if (existingUser !== undefined) {
        console.log(userID, "already exists");
        return false;
    }

    // stop if duplicate access-history records for the same user.
    const existingAccessHistory = accessHistory.find(history => history.userID === userID);
    if (existingAccessHistory !== undefined) {
        console.log(userID, "already has an access history record");
        return false;
    }

    const newUser = { id: userID, name: userName };
    const newAccessHistory = { userID: userID, readDatasets: [] };
    users.push(newUser);
    accessHistory.push(newAccessHistory);
    const newUsersJson = JSON.stringify(users, null, 2);
    const newAHJson = JSON.stringify(accessHistory, null, 2);
    fs.writeFileSync("./data/users.json", newUsersJson);
    fs.writeFileSync("./data/accessHistory.json", newAHJson);
    return true;
}


export function recordRead(userID, datasetID) {
    // adds the file to the access history of the user
    const accessHistory = jsonParser("accessHistory");
    const userHistory = accessHistory.find(history => history.userID === userID);

    // not record a read for an unknown user ID.
    if (userHistory === undefined) {
        console.log("unknown user ID", userID);
        return false;
    }

    // not record a read for an unknown dataset ID.
    if (findByID(datasetID) === undefined) {
        console.log("unknown dataset ID", datasetID);
        return false;
    }

    // avoid storing duplicate dataset IDs in readDatasets.
    if (userHistory.readDatasets.includes(datasetID)) {
        console.log(userID, "has already read", datasetID);
        return true;
    }

    userHistory.readDatasets.push(datasetID);

    const newAHJson = JSON.stringify(accessHistory, null, 2);
    fs.writeFileSync("./data/accessHistory.json", newAHJson);
    return true;
}

export function getAccessHistory(userID) {
    // Returns the access history of the user
    const accessHistory = jsonParser("accessHistory");
    const output = accessHistory.find(history => history.userID === userID);

    // return null instead of undefined when a user has no history.
    if (output === undefined) {
        return null;
    }

    return output;

}

export function getReadDatasets(userID) {
    // Returns the read history of the user
    const accessHistory = jsonParser("accessHistory");
    const history = accessHistory.find(history => history.userID === userID);

    // return null if history is undefined
    if (history === undefined) {
        return null;
    }

    const output = history.readDatasets;
    return output;
}

// -------------------------------------------
// Chinese Wall policy decisions enforcing
// -------------------------------------------

export function datasetsConflict(datasetID1, datasetID2) {
    const datasetA = findByID(datasetID1);
    const datasetB = findByID(datasetID2);

    // unknown datasets cannot be compared.
    if (datasetA === undefined || datasetB === undefined) {
        return false;
    }

    // Return true if same COI class and different dataset IDs
    const sameCOIclass = datasetA.coiClass === datasetB.coiClass;
    const differentDatasets = datasetA.id !== datasetB.id;
    return sameCOIclass && differentDatasets;
}

export function getConflictingReadDataset(userID, requestedDatasetID) {
    // Check the user's previously read datasets
    // Return the dataset that conflicts with requestedDatasetId
    // Return null/undefined if there is no conflict
    const readDatasets = getReadDatasets(userID);

    // unknown users cannot have readable access history.
    if (readDatasets === null) {
        return null;
    }

    for (const readDatasetID of readDatasets) {
        const check = datasetsConflict(requestedDatasetID, readDatasetID);
        if (check === true) {
            return readDatasetID;
        }
    }
    return null;
}


export function canRead(userID, datasetID) {
    // Return true if user can read datasetID
    // Return false if datasetID  conflicts with a previously read dataset

    // denies reads from unknown users.
    if (findUserByID(userID) === undefined) {
        return false;
    }

    // denies reads for unknown datasets.
    if (findByID(datasetID) === undefined) {
        return false;
    }

    const conflictDataset = getConflictingReadDataset(userID, datasetID);
    if (conflictDataset === null) {
        return true;
    }
    else return false;
}

export function canWrite(userID, datasetID) {
    // Return false if datasetID conflicts with previously read datasets
    // This simulates write revocation/blocking

    // denies writes from unknown users.
    if (findUserByID(userID) === undefined) {
        return false;
    }

    // denies writes for unknown datasets.
    if (findByID(datasetID) === undefined) {
        return false;
    }

    const conflictDataset = getConflictingReadDataset(userID, datasetID);
    if (conflictDataset === null) {
        return true;
    }
    else return false;

}

export function attemptRead(userID, datasetID) {
    if (findUserByID(userID) === undefined) {
        console.log("READ DENIED:", userID, "is an unknown user ID");
        return false;
    }

    if (findByID(datasetID) === undefined) {
        console.log("READ DENIED:", datasetID, "is an unknown dataset ID");
        return false;
    }

    const conflictDataset = getConflictingReadDataset(userID, datasetID);
    if (conflictDataset === null) {
        recordRead(userID, datasetID)
        console.log("READ ALLOWED:", userID, "can read", datasetID)
        return true;
    }

    console.log("READ DENIED:", userID, "cannot read", datasetID, "because it conflicts with previously read dataset", conflictDataset);
    return false;
}

export function attemptWrite(userID, datasetID) {

    if (findUserByID(userID) === undefined) {
        console.log("WRITE DENIED:", userID, "is an unknown user ID");
        return false;
    }

    if (findByID(datasetID) === undefined) {
        console.log("WRITE DENIED:", datasetID, "is an unknown dataset ID");
        return false;
    }

    const conflictDataset = getConflictingReadDataset(userID, datasetID);
    if (conflictDataset === null) {
        console.log("WRITE ALLOWED:", userID, "can write", datasetID)
        return true;
    }

    console.log("WRITE DENIED:", userID, "cannot write", datasetID, "because it conflicts with previously read dataset", conflictDataset);
    return false;
}
