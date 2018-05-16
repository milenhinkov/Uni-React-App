import {createStore, applyMiddleware } from 'redux'
import rootReducer from './RootReducer'

export default function configureStore(initialState){
    return createStore(rootReducer, initialState/* , applyMiddleware() */)
}