import { Currency } from "react-intl-number-format";
import { useSelector } from "react-redux";
import {selectCurrentCurrency} from '../../store/currency/currency.selector';
import {endpointPath, API_KEY} from '../../utils/currency/currency-api'
import axios from "axios";
import { useEffect, useState } from "react";


const CurrencyPrice = ({ price }) => {
    const currency = useSelector(selectCurrentCurrency);
    const url = endpointPath('USD', currency, price);
    const [amountValue, setAmountValue] = useState(price);

   useEffect(
    () => {
        const getPrice = async () => {
            try{
                const response = await axios.get(url, {
                    headers: {apikey: API_KEY},
                });
                const parsedData = response.data;
                setAmountValue(parsedData.result);
            }
            catch(error){
                console.error("Error while converting currency: ", error);
            }
        };

        getPrice();

        return () => {
            
        };
    },
    [currency, url, price]
   );

    return (
        <>
            <Currency currency={currency}>{amountValue}</Currency>
        </>

    );
}

export default CurrencyPrice;