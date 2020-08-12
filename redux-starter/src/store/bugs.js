import {createSlice} from "@reduxjs/toolkit";
import {createSelector} from "reselect"

let lastId = 0;

const slice = createSlice({
    name:"bugs",
    initialState:[],
    reducers:{
        bugAdded: (bugs, action)=>{
            bugs.push({
                id : lastId++,
                description: action.payload.description,
                resolve : false,
                assignTo: action.payload.userId
            })
        },
        bugResolved:(bugs, action)=>{
            const index= bugs.findIndex(bug => bug.id === action.payload.id);
            bugs[index].resolved = true;
        },
        bugRemoved:(bugs, action)=>{
            bugs.filter(bug => bug.id !== action.payload.id);
        },
        assignToUser: (bugs, action)=>{
            const index= bugs.findIndex(bug => bug.id === action.payload.id);
            bugs[index].assignTo = action.payload.userId;
        },
    }
});

export const {bugAdded, bugRemoved, bugResolved, assignToUser } = slice.actions
export default  slice.reducer

//Selector
export const getUnresolvedBugs = state => state.entities.bugs.filter(bug=> !bug.resolved)
export const getBugsByUserId = userId => createSelector(
        state => state.entities.bugs,
        bugs => bugs.filter(bug => bug.assignTo === userId)
)
