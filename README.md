# simple-chinese-wall-js


# To do




8. Write `canRead(userId, dataID)` to check Chinese Wall read rules
9. Write `canWrite(userId, dataID)` to check basic write restriction/revocation
10. Create a demo scenario:
    - user reads KPMG
    - user tries to read PWC
    - user tries to read Domino's Pizza
11. Print clear ALLOW/DENY messages with reasons
12. Add simple error handling for unknown user ID or dataset ID


# Done

1. Write a function to find a user by ID
2. Convert data storage from JS objects to JSON
3. Create `users.json` to store simple test users
4. Write a function to add a new user to `users.json`
5. Create `accessHistory.json` to store which datasets each user has read
6. Write a function to declare that a user read a dataset
7. Write a function to get a user's access history