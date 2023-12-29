import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    todoItems: [],
}


const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todoItems = action.payload;
        }
    },
})  



export default todoSlice.reducer;
export const {addTodo } = todoSlice.actions;