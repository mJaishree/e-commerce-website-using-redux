import { createSlice } from "@reduxjs/toolkit";
import Product from './Product.json'

export const Slice = createSlice(
    {
        name : "cart", //name of the slice (anyname)
        initialState : { //link this initial state in store.js in reducer
            name : "jaishree",
            arr : Product.tea,
            isAuth : false

        },
        reducers : { //update function
            updateArr : (state,action)=>{
                state.arr =action.payload
            },
            updateAuth : (state,action)=>{
                state.isAuth = action.payload
            }

        }
    }
)

export default Slice.reducer
export const {updateArr,updateAuth} = Slice.actions