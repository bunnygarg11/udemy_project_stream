import {combineReducers} from "redux"
import {reducer as Formreducer} from "redux-form"
import authReducer from "./authReducer"



export default combineReducers({
    auth:authReducer,
    form:Formreducer
})