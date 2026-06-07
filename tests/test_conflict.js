import { datasetsConflict } from "../src/functions.js";
import {getConflictingReadDataset} from "../src/functions.js";
console.log("dataset conflict between c1 and s1: ", datasetsConflict("c1","s1"));

console.log("Conflict relatiopnship between u1 and s2 : ", getConflictingReadDataset("u1","s1"))
console.log("Conflict relatiopnship between u1 and c2 : ", getConflictingReadDataset("u1","c2"))