import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.route';
import Category from '../category/category.route';
import { useDispatch } from 'react-redux';
import { getCategoriesAndDocument } from '../../utils/firebase/firebase.utils';
import { setCategories } from '../../store/categories/category.action';
import { useEffect } from 'react';

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocument();
            dispatch(setCategories(categoriesArray));
        }
        getCategoriesMap();
    },[
        //Not necessary to add - Adding just to remove React Warning
        dispatch
    ])
    
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    )
}

export default Shop;