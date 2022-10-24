import userReducer from "./featured/userSlice"
import {persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { configureStore } from "@reduxjs/toolkit"

const persistConfig={
    key:"root",
    storage
}

const persistedReducer= persistReducer(persistConfig,userReducer)

const store= configureStore({
    reducer:persistedReducer
})

export default store
