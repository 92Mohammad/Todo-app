import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    emailMessage: "",
    status: 'idle',
    error: null
}


export const addNewUser = createAsyncThunk('users/addNewUser', async(USER) => {
    console.log('this is new user : ', USER);
    try {
        const response = await fetch("http://localhost:8000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(USER),
        }); 

        const data = await response.json();
        console.log('this is response comming back from server: ', data)
        return data;
    }
    catch(error){
        console.log(error);
    }
})


const userSlice  = createSlice({
    name: "users",
    initialState,
    reducers: {
        userSignUp:(currentState, action) => {
            console.log('I am inside userSignup action creater: ', action.payload);
        },
        
        userLogin: (currentState, action) => {  
            console.log(action.payload);
        },
        extraReducers(builder)  {
            builder
                .addCase(addNewUser.fulfilled , (state, action) => {
                    state.status = 'completed' 
                    console.log('inside completed case')
                    return action.payload;

                })
                .addCase(addNewUser.failed , (state, action) => {
                    state.status = 'failed'
                    console.log('inside failed case')
                    state.error = action.error.message;
                })
        }
    }
})


export default userSlice.reducer;
export const {userSignUp, userLogin} = userSlice.actions;





// try {
//     const response = await fetch("http://localhost:8000/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     //   body: JSON.stringify(USER),
//     });

//     const data = await response.json();
//     if (data.message === "Incorrect! password") {
//     //   setPasswordMessage(data.message);
//     }
//     if (data.message === "Email not found") {
//     //   setEmailMessage(data.message);
//     }
//     if (response.status === 200) {
//       // store the json token insdie the localstorage
//       localStorage.setItem("token", data.token);
//       window.location.href = "/todoPage";
//     }
// }
// catch (err) {
//     console.error(err);  
// }




// try {

//     const response = await fetch("http://localhost:8000/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     //   body: JSON.stringify(USER),
//     });
//     const data = await response.json();
//     if (data.message === "Incorrect password") {
//     //   setPasswordMessage(data.message);
//     }
//     if (data.message === "Email already exist") {
//     //   setEmailMessage(data.message);
//     }
//     if (response.status === 201) {
//       // Redirect to '/login'
//       window.location.href = "/login"; // user navigate hook over here
//     }
// }
// catch (err) {
//     console.error(err);
// }