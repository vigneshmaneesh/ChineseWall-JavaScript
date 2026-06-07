# simple-chinese-wall-js


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