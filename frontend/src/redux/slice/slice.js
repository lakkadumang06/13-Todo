import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id:null,
    data:null,
    status:false,
    getapi:null
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateid: (state, action) => {
    state.id = action.payload
    console.log("SSSS",state.id)
    },
    updatevalue: (state, action) => {
    state.data = action.payload
    console.log("data",state.data)
    },
    status: (state, action) => {
state.status = action.payload
    },
    get:(state,action)=>{
state.getapi = action.payload
    }


  },
})

// Action creators are generated for each case reducer function
export const { updateid ,updatevalue,status,get} = counterSlice.actions

export default counterSlice.reducer