import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import AdminLayout from "../AdminLayout";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProductAdmin, updateProduct } from "../../../store/adminProductSlice";
import { useParams } from "react-router-dom";


function ProductDescription(){
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const {product} = useAppSelector((store)=>store.adminProducts)
    useEffect(()=>{
        id && dispatch(fetchProductAdmin(id))
    },[id, dispatch])
    const [form, setForm] = useState<any>({})
    const [saving, setSaving] = useState(false)
    useEffect(() => { if (product) setForm({ productName: product.productName, productDescription: product.productDescription, productPrice: product.productPrice, productTotalStock: product.productTotalStock, discount: product.discount, categoryId: product.categoryId }) }, [product])
    const change = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value })
    const save = async (e: FormEvent) => { e.preventDefault(); if (!id) return; setSaving(true); const saved = await dispatch(updateProduct(id, form)); setSaving(false); if (saved) window.scrollTo({ top: 0, behavior: 'smooth' }) }
    return (
        <AdminLayout>
            <div className="max-w-2xl rounded-xl bg-white p-6 shadow-sm"><h1 className="mb-6 text-2xl font-bold">Edit Product</h1>
            {product ? <form onSubmit={save} className="grid gap-4"><input name="productName" value={form.productName || ''} onChange={change} placeholder="Product name" className="rounded border p-3" required /><textarea name="productDescription" value={form.productDescription || ''} onChange={change} placeholder="Description" className="rounded border p-3" required /><input name="productPrice" type="number" value={form.productPrice || ''} onChange={change} placeholder="Price" className="rounded border p-3" required /><input name="productTotalStock" type="number" value={form.productTotalStock || ''} onChange={change} placeholder="Stock" className="rounded border p-3" required /><input name="discount" type="number" value={form.discount || 0} onChange={change} placeholder="Discount" className="rounded border p-3" /><button disabled={saving} className="rounded bg-indigo-600 p-3 font-semibold text-white">{saving ? 'Saving…' : 'Save changes'}</button></form> : <p>Loading product…</p>}</div>
        </AdminLayout>
    )
}

export default ProductDescription
