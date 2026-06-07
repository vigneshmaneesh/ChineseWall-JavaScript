import {
    createUser,
    getAccessHistory,
    findByID,
    attemptRead,
    attemptWrite
} from "../src/functions.js";

function printLine() {
    console.log("-------------------------------------------");
}

function printDataset(datasetID) {
    const dataset = findByID(datasetID);

    if (dataset === undefined) {
        console.log(datasetID, "was not found in datasets.json");
        return;
    }

    console.log(datasetID, "=", dataset.name, "| COI class:", dataset.coiClass);
}

function printUserHistory(userID) {
    console.log("Current access history for", userID);
    console.log(getAccessHistory(userID));
}

const userID = "u3";
const userName = "Demo User";

const kpmgID = "c1";
const pwcID = "c2";
const dominosID = "f1";


console.log("Chinese Wall JavaScript Demo");

printLine();
console.log("Step 1: Create or prepare a test user");
console.log("User:", userID, "-", userName);
createUser(userID, userName);
printUserHistory(userID);


printLine();
console.log("Step 2: User tries to read KPMG");

attemptRead(userID, kpmgID);
printUserHistory(userID);

printLine();
console.log("Step 3: User tries to read PWC");

attemptRead(userID, pwcID);
printUserHistory(userID);

printLine();
console.log("Step 4: User tries to read Domino's Pizza");

attemptRead(userID, dominosID);
printUserHistory(userID);

printLine();
console.log("Step 5: User tries to write to PWC");

attemptWrite(userID, pwcID);

printLine();
console.log("DONE!!");
