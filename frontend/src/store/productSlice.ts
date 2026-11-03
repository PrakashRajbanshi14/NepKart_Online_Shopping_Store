import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct, IProducts } from "../pages/product/types";
import { Status } from "../globals/types/type";
import type { AppDispatch } from "./store";
import { API } from "../http";
import type { RootState } from "./store";

const initialState: IProducts = {
    products: [],
    status: Status.LOADING,
    product: null
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts(state: IProducts, action: PayloadAction<IProduct[]>) {
            state.products = action.payload
        },
        setStatus(state: IProducts, action: PayloadAction<Status>) {
            state.status = action.payload
        },
        setProduct(state: IProducts, action: PayloadAction<IProduct>) {
            state.product = action.payload
        }
    }
})

const { setProducts, setStatus, setProduct } = productSlice.actions
export default productSlice.reducer

export function fetchProducts() {
    return async function fetchProductsThunk(dispatch: AppDispatch) {
        try {
            const response = await API.get("/product")
            if (response.status === 200) {
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setProducts(response.data.data))
            } else {
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function fetchProduct(id: string) {
    return async function fetchProductThunk(dispatch: AppDispatch, getState: () => RootState) {
        const store = getState()
        const productexists = store.products.products.find((product: IProduct) => product.id === id) //returns boolean value
        if (productexists) {
            dispatch(setProduct(productexists))
            dispatch(setStatus(Status.SUCCESS))
        } else {
            try {
                const response = await API.get("/product/" + id)
                if (response.status === 200) {
                    dispatch(setStatus(Status.SUCCESS))
                    dispatch(setProduct(response.data.data.length > 0 && response.data.data[0]))
                } else {
                    dispatch(setStatus(Status.ERROR))
                }
            } catch (error) {
                dispatch(setStatus(Status.ERROR))
            }
        }
    }
}