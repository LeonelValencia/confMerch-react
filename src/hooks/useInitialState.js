import { useState, useEffect } from "react";
import axios from "axios";
import initialState from "../initialState";

const API = 'http://localhost:1337/api/products?populate=%2A';

const useInitialState = () => {
    const [state, setState] = useState(initialState);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Create an scoped async function in the hook
        const getData = async () => {
            const response = await axios(API);
            setProducts(response.data.data);
          };
      
        getData();
    }, []);

    const addToCart = payload => {
        setState({
            ...state,
            cart: [...state.cart, payload]
        })
    }
    const removeFromCart = (payload, indexToRemove) => {
        setState({
            ...state,
            cart: state.cart.filter((_item,indexCurrent) => indexCurrent !== indexToRemove)
        })
    }
    const addToBuyer = payload => {
        setState({
            ...state,
            buyer: [...state.buyer, payload]
        })
    }

    const addNewOrder = payload => {
        setState({
            ...state,
            orders: [...state.orders, payload]
        })
    }

    return {
        addToCart,
        removeFromCart,
        addToBuyer,
        addNewOrder,
        products,
        state,
    }
}

export default useInitialState;