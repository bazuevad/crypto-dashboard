import ExchangeRate from './ExchangeRate.js';
import { useState } from 'react';
import axios from 'axios';
function CurrencyConverter() {
    const currencies=['BTC','ETH','USD','XPR','LTC','ADA']
    const [chosenPrimaryCurrency,setChosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency,setChosenSecondaryCurrency] = useState('BTC')
    const [amountPrimCurr,setAmountPrimCurrency] = useState(0)
    const [exchangeRate, setExchangeRate] = useState(0)
    const [resultAmount,setResultAmount] = useState(0)
    const password = process.env.REACT_APP_API_KEY;
    //require('dotenv').config();
    // console.log(process.env);
    
    
    const convert = () => {
        console.log("CONVERTED");
        console.log(password);
        let options = {
            method:'GET',
            url:'https://alpha-vantage.p.rapidapi.com/query',
            params:{
                from_currency:chosenPrimaryCurrency,
                function:'CURRENCY_EXCHANGE_RATE',
                to_currency:chosenSecondaryCurrency
            },
            headers:{
                'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
                'x-rapidapi-key': password,
            }
        };
        axios.request(options).then(
            function(response){
                console.log(response.data);
                setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
                setResultAmount(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']*amountPrimCurr);
            }
        ).catch(
            function(error){
                console.error(error);
            }
        );
    }
    console.log(exchangeRate);
    console.log(resultAmount);
    return (
      <div className="currency-converter">
        <h2>CURRENCY CONVERTER</h2>
        <div className="input-box">
            <table>
                <tbody>
                    <tr>
                        <td>Primary Currency: </td>
                        <td>
                            <input
                                type="number"
                                name="currency-amount-1"
                                value={amountPrimCurr}
                                onChange={(e)=>setAmountPrimCurrency(e.target.value)}
                            />
                        </td>
                        <td>
                            <select
                                value={resultAmount}
                                name="currency-option-1"
                                className="currency-options"
                                // onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                            >
                                {currencies.map( (currency,_index) => (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Secondary Currency: </td>
                        <td>
                            <input
                                type="number"
                                name="currency-amount-2"
                                value={resultAmount}
                                disabled="true"
                            />
                        </td>
                        <td>
                            <select
                                value={chosenSecondaryCurrency}
                                name="currency-option-2"
                                className="currency-options"
                                onChange={(e)=>setChosenSecondaryCurrency(e.target.value)}
                            >
                                {currencies.map( (currency,_index) => (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button id="convert-button" onClick={convert}>Convert</button>
        </div>

        <ExchangeRate exchangeRate={exchangeRate}></ExchangeRate>
      </div>
    );
  }


  export default CurrencyConverter;