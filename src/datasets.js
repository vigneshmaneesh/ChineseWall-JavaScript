export const datasets = [
    {
        id: "c1",
        name: "KPMG Advisory W.L.L.",
        coiClass: "consulting"

    },
    {
        id: "c2",
        name: "PWC",
        coiClass: "consulting"
    },
    {
        id: "u1",
        name: "University of Strathclyde",
        coiClass: "education"
    },
    {

        id: "u2",
        name: "Heriot-Watt University",
        coiClass: "education"
    },
    {
        id: "f1",
        name: "Dominos Pizza",
        coiClass: "food"   
    }
]

// findByID searches for dataset with d_id which is dataset id such as c1
export function findByID(d_id){ 
return datasets.find(datasets => datasets.id === d_id) // For each dataset, check whether its id matches the id we are looking for.
}