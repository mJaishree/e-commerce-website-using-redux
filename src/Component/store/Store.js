import {configureStore} from '@reduxjs/toolkit'
import initial from './Slice'


export const Store = configureStore({

    reducer : {
        
        data : initial
    }
})

