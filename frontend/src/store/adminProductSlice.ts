import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import type { AppDispatch, RootState } from "./store";
import { API, APIWITHTOKEN } from "../http";
import {type IProduct } from "../pages/admin/products/components/ProductModal";



export interface IProductAdmin {
    id: string,
    productName: string,
    productPrice: number,
    productTotalStock: number,
    productDescription: string,
    productImageUrl: string,
    createAt: string,
    categoryId: string
    discount: number,

    Category: {
        categoryName: string
    }
}

interface IInitialState {
    products: IProductAdmin[],
    status: Status
    product: null | IProductAdmin
}
const initialState: IInitialState = {
    products: [],
    status: Status.LOADING,
    product: null
}

const productSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {
        setStatus(state: IInitialState, action: PayloadAction<Status>) {
            state.status = action.payload
        },
        setProducts(state: IInitialState, action: PayloadAction<IProductAdmin[]>) {
            state.products = action.payload
        },
        addProductToProducts(state: IInitialState, action: PayloadAction<IProductAdmin>) {
            state.products.push(action.payload)
        },
        removeProduct(state: IInitialState, action: PayloadAction<string>) {
            state.products = state.products.filter((item) => item.id !== action.payload)
        },
        setProduct(state: IInitialState, action: PayloadAction<IProductAdmin>) {
            state.product = action.payload
            const index = state.products.findIndex((item) => item.id === action.payload.id)
            if (index !== -1) state.products[index] = action.payload
        },
    }
})


export const { setStatus, setProducts, addProductToProducts, removeProduct, setProduct } = productSlice.actions
export default productSlice.reducer

export function fetchProducts() {
    return async function fetchProductsThunk(dispatch: AppDispatch) {
        try {
            const response = await APIWITHTOKEN.get("/product")
            if (response.status === 200) {

                dispatch(setProducts(response.data.data))
            } else {
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}
export function addProduct(data: IProduct) {
    return async function addProduct(dispatch: AppDispatch) {
        try {
            const formData = new FormData()
            formData.append('productName', data.productName)
            formData.append('productDescription', data.productDescription)
            formData.append('productPrice', String(data.productPrice))
            formData.append('productTotalStock', String(data.productTotalStock))
            formData.append('categoryId', data.categoryId)
            if (data.productImage instanceof File) formData.append('productImage', data.productImage)
            const response = await APIWITHTOKEN.post("/product", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            if (response.status === 200) {
                dispatch(setStatus(Status.SUCCESS))
                dispatch(addProductToProducts(response.data.data))
            } else {
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function updateProduct(id: string, data: Partial<IProduct>) {
    return async function updateProductThunk(dispatch: AppDispatch) {
        try {
            const formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '' && key !== 'productImage') formData.append(key, String(value))
            })
            if (data.productImage instanceof File) formData.append('productImage', data.productImage)
            const response = await APIWITHTOKEN.put(`/product/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            if (response.status === 200) { dispatch(setProduct(response.data.data)); dispatch(setStatus(Status.SUCCESS)); return true }
            dispatch(setStatus(Status.ERROR)); return false
        } catch (error) { console.error('Product update failed', error); dispatch(setStatus(Status.ERROR)); return false }
    }
}

export function deleteProduct(id: string) {
    return async function deleteProductThunk(dispatch: AppDispatch) {
        try {
            const response = await APIWITHTOKEN.delete(`/product/${id}`)
            if (response.status === 200) {
                dispatch(removeProduct(id))
                dispatch(setStatus(Status.SUCCESS))
                return true
            }
            dispatch(setStatus(Status.ERROR)); return false
        } catch (error) {
            console.error('Product deletion failed', error)
            dispatch(setStatus(Status.ERROR)); return false
        }
    }
}

export function fetchProductAdmin(id: string) {
    return async function fetchProductAdminThunk(dispatch: AppDispatch, getState: () => RootState) {
        const store = getState()
        const productExists = store.adminProducts.products.find((product: IProductAdmin) => product.id == id)

        if (productExists) {
            dispatch(setProduct(productExists))
            dispatch(setStatus(Status.SUCCESS))
        } else {
            try {
                const response = await API.get("/product/" + id)
                if (response.status === 200) {
                    dispatch(setStatus(Status.SUCCESS))
                    if (response.data.data?.[0]) dispatch(setProduct(response.data.data[0]))
                } else {
                    dispatch(setStatus(Status.ERROR))
                }
            } catch (error) {
                console.log(error)
                dispatch(setStatus(Status.ERROR))
            }
        }
    }
}
