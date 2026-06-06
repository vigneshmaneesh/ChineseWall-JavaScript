import fs from "fs";

export function jsonParser(){ 

//reads the datasets json file
const read_data = fs.readFileSync('./data/datasets.json','utf-8');
// returns the parsed json file to a readable javascript object
return JSON.parse(read_data);

}

// findByID searches for dataset with d_id which is dataset id such as c1

export function findByID(d_id){ 
const json_data = jsonParser()
return json_data.find(json_data => json_data.id === d_id) //For each dataset, check whether its id matches the id we are looking for.
}


export function createAccessHistory(userName){
    
    // TBD

}


export function recordRead(accessHistory, datasetID){

    // TBD
}
