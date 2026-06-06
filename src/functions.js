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
    
    // Should I add error handling for a function the user wont be able to use? idk

    //reads the selected json file
    const read_data = fs.readFileSync(filePath, 'utf-8');
    // returns the parsed json file to a readable javascript object
    return JSON.parse(read_data);

}

// findByID searches for dataset with d_id which is dataset id such as c1

export function findByID(d_id) {
    const json_data = jsonParser("datasets")
    return json_data.find(json_data => json_data.id === d_id) //For each dataset, check whether its id matches the id we are looking for.
}

export function createUser(userID, userName) {
    // Creates new User  
    const users = jsonParser("users");
    const newUser = { id: userID, name: userName };
    // Could add handling to prevent duplicate user ID or names
    users.push(newUser);
    const newUsersJson = JSON.stringify(users, null, 2);
    fs.writeFileSync("./data/users.json", newUsersJson);
}


export function recordRead(userID, d_id) {
    // adds the file to the access history of the user
    const accessHistory = jsonParser("accessHistory");
    const userHistory = accessHistory.find(history => history.userID === userID);
    userHistory.readDatasets.push(d_id);
    
    // Could add handling to prevent duplicate file or company entry but not now
    
    const newAHJson = JSON.stringify(accessHistory, null, 2);
    fs.writeFileSync("./data/accessHistory.json", newAHJson);
}

export function getAccessHistory(userID) {
    // Shows the access history of the user
    const accessHistory = jsonParser("accessHistory");
    const output = accessHistory.find(history => history.userID === userID);
    console.log(output);

}

export function canRead(userID, dataID) {
    // Shows what this user can read
    // TBD
}

export function canWrite(userID, dataID) {
    // Shows what this user can write
    // TBD
}