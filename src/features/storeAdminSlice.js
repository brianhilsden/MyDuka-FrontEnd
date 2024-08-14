import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:{}
}

const storeAdminSlice = createSlice({
    name:"storeAdmin",
    initialState,
    reducers:{
        setStoreAdmin(state,action){
            state.value = action.payload
        }
    }
})

export const {setStoreAdmin} = storeAdminSlice.actions
export default storeAdminSlice.reducer

