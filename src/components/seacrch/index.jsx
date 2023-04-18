import './style.css'
import { useState,useEffect } from 'react'

const Search = (props) => {
    const{getDataFromSearchComponent,apiCalledSuccess,setApiCalledSuccess} = props;
    const [inputValue, setinputValue] = useState("")
    const handleEvent = (event) => {
        const { value } = event.target;
        setinputValue(value)
    }

    const handleSubmit = (e) => {
         getDataFromSearchComponent(inputValue)
        e.preventDefault()
    }

    useEffect(() => {
    if(apiCalledSuccess){
        setinputValue('')
        setApiCalledSuccess(false)
    }
    }, [apiCalledSuccess])
    

    return (
        <form onSubmit={handleSubmit} className="search">
            <input name="search" id="search" onChange={handleEvent} value={inputValue} placeholder="search recipes" />
            <button>Submit</button>
        </form>
    )
}
export default Search