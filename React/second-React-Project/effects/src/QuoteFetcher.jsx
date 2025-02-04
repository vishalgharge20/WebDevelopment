import { useState, useEffect } from "react"

const random_quote = "https://inspo-quotes-api.herokuapp.com/quotes/random"
export default function QuoteFetcher(){

    const [quote,setQuote] = useState("")

    function myEffect(){
        fetchQuote()
    }
    useEffect(myEffect,[])

    async function fetchQuote(){
        const response = await fetch(random_quote)
        const jsonResponse = await response.json()
        const quote = jsonResponse.quote
        setQuote(quote.text)
    }


    return(
        <div>
            <h2>Quote: {quote}</h2>
            <button onClick={fetchQuote}>Get Quote</button>
        </div>
    )
}