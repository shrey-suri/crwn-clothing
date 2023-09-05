import React from "react";
import { useDispatch } from "react-redux";
import { setCurrency } from '../../store/currency/currency.action';
import { currencyArray } from "../../utils/currency/currency-values";
import { useSelector } from "react-redux";
import {selectCurrentCurrency} from '../../store/currency/currency.selector';

const NavDropdown = () => {
    const dispatch = useDispatch();
    const currency = useSelector(selectCurrentCurrency);
    

    const setNewCurrency = (event) => {
        console.log("Event:")
        console.log(event.target.value);
        const newCurrency = event.target.value === 'Others' ? 'INR' : event.target.value;
        dispatch(setCurrency(newCurrency))
    }

    return (
        <>
            <select onChange={setNewCurrency} defaultValue={currency}>
                {
                    currencyArray.map((value, idx) =>
                        <option value={value} key={idx}>{value}</option>
                    )
                }
            </select>
        </>
    )

}

export default NavDropdown;