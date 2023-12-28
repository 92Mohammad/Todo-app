import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [{
        id : 1,
        title: "hello"
    }],
    status: 'idle',
    error: null
}
const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        createTodo: () => {

        },
        getAllTodo: () => {

        }
    }

})



export default todoSlice.actions;
export const {createTodo, getAllTodo } = todoSlice.reducer;