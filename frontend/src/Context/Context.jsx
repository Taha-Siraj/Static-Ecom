import React, { createContext, useEffect, useReducer, useState } from 'react';
import { reducer } from './Reducer';
import axios from 'axios';
import api from '../Api';

export const GlobalContext = createContext(null);
const initialState = {
  user: null,           
  isLogin: null,       
  cartCount: 0,
  baseUrl: 'http://localhost:5004/api/v1',
  loading: true,    
};
export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}
