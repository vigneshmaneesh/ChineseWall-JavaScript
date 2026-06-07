# Simple ChineseWall-JavaScript

A small JavaScript prototype for testing the basic logic behind the Chinese Wall security policy.

Developed as a working prototype to validate access-control logic before developing the full project in the MSc dissertation project (Solid/CSS, Node.js, JavaScript). I made this first to understand the policy logic in a simpler environment before connecting it to Solid Pods, WAC/ACP, and access-history based enforcement.

## What this does

The prototype uses JSON files to model:

* users
* datasets
* conflict-of-interest classes
* access history

It can then decide whether a user should be allowed to read or write to a dataset based on what they have already read.

Example idea:

```text
User reads KPMG.
KPMG is in the consulting COI class.

The same user then tries to read PWC.
PWC is also in the consulting COI class.

Result: deny.
```

But if the user tries to read something from a different COI class, such as food, it should be allowed.

## Running the demo

Install dependencies if needed:

```bash
npm install
```

Run the demo:

```bash
node src/demo.js
```

## Why I made this

This project is preparation for my MSc dissertation work on applying a Chinese Wall policy in the Solid ecosystem.

Before dealing with Solid authentication, Pods, WAC/ACP, or SELinux, I wanted a simple version of the decision logic that I could actually understand and test.

So this repo is basically the first step:


## Project structure

```text
.
├── data/
│   ├── datasets.json
│   ├── users.json
│   └── accessHistory.json
│
├── src/
│   ├── functions.js
│   └── demo.js
│
├── tests/
│
├── package.json
└── README.md
```

## Data files

### `datasets.json`

Stores the datasets and their conflict-of-interest class.

Example:

```json
{
  "id": "c1",
  "name": "KPMG Advisory W.L.L.",
  "coiClass": "consulting"
}
```

### `users.json`

Stores simple test users.

### `accessHistory.json`

Stores what each user has already read.

Example:

```json
{
  "userID": "u1",
  "readDatasets": ["c1"]
}
```

This is the important part for Chinese Wall logic because access decisions depend on history.

## Main functions

The main logic is in `src/functions.js`.

Some of the important functions are:

```text
findByID(datasetID)
```

Finds a dataset from `datasets.json`.

```text
createUser(userID, userName)
```

Adds a new user and creates an empty access history record for them.

```text
recordRead(userID, datasetID)
```

Records that a user has read a dataset.

```text
datasetsConflict(datasetID1, datasetID2)
```

Checks whether two datasets are in the same COI class but are not the same dataset.

```text
canRead(userID, datasetID)
```

Returns `true` if the user can read the dataset, otherwise `false`.

```text
canWrite(userID, datasetID)
```

Returns `true` if the user can write to the dataset, otherwise `false`.

For now, write blocking uses the same conflict check as reading. This is only a simplified version of write revocation.

```text
attemptRead(userID, datasetID)
```

Tries to read a dataset. If allowed, it records the read in access history.

```text
attemptWrite(userID, datasetID)
```

Tries to write to a dataset. It does not update read history.

The demo shows a basic flow:

```text
1. Create or prepare a test user
2. Show the datasets
3. Try to read a first dataset
4. Try to read a conflicting dataset
5. Try to read a non-conflicting dataset
6. Try to write to a conflicting dataset
```

Expected behaviour:

```text
READ ALLOWED when there is no conflict
READ DENIED when the requested dataset conflicts with a previously read dataset
WRITE DENIED when the requested dataset conflicts with a previously read dataset
```

## limitations

This is only a simple JavaScript prototype.

It does not yet:

* connect to Solid Pods
* use WebIDs
* use WAC or ACP
* enforce permissions at the server level
* detect real file access
* implement proper atomic write revocation


Access events are simulated through function calls such as:

```text
attemptRead("u1", "c1")
```

That is intentional for this stage. The goal is to test the policy logic first.

## Next steps

The next stage is to connect this logic to a Solid/CSS environment.


# To do

Prototype completed

# Done

1. Write a function to find a user by ID
2. Convert data storage from JS objects to JSON
3. Create `users.json` to store simple test users
4. Write a function to add a new user to `users.json`
5. Create `accessHistory.json` to store which datasets each user has read
6. Write a function to declare that a user read a dataset
7. Write a function to get a user's access history
8. Write a function to find a data by ID
9. Create getReadDatasets(userID)
10. Create datasetsConflict(datasetA, datasetB)
11. Implement getConflictingReadDataset(userID, requestedDatasetID)
12. Write `canRead(userID, dataID)` to check Chinese Wall read rules
13. Write `canWrite(userId, dataID)` to check basic write restriction/revocation
14. Create attemptRead(userID, datasetID)
15. Create attemptWrite(userID, datasetID)
16. Create a demo scenario
17. Print clear ALLOW/DENY messages with reasons
18. Add simple error handling for unknown user ID or dataset ID
