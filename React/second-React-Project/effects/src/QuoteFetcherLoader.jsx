import { useState, useEffect } from "react"
import "./App.css"

const random_quote = "https://inspo-quotes-api.herokuapp.com/quotes/random"
export default function QuoteFetcherLoader(){

    const [quote,setQuote] = useState({text:"",author:""})
    const [isLoading,setIsLoading] = useState(true)

    function myEffect(){
        fetchQuote()
    }
    useEffect(myEffect,[])

    async function fetchQuote(){
        const response = await fetch(random_quote)
        const jsonResponse = await response.json()
        const quote = jsonResponse.quote
        setQuote(quote)
        setIsLoading(false)
    }


    return(
        <div>
            <p className="Loader" style={{opacity: isLoading ? 2 : 0}}>Loading...</p>
            <h2>Quote: {quote.text}</h2>
            <h3>Author: {quote.author}</h3>
        </div>
    )
}