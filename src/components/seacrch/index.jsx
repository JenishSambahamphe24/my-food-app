import './style.css'
import { useState } from 'react'

const Search = (props) => {
    const{getDataFromSearchComponent} = props;
    const [inputValue, setinputValue] = useState("")
    const handleEvent = (event) => {
        const { value } = event.target;
        setinputValue(value)
    }

    const handleSubmit = (e) => {
         getDataFromSearchComponent(inputValue)
        e.preventDefault()
    }
    return (
        <form onSubmit={handleSubmit} className="search">
            <input name="search" id="search" onChange={handleEvent} value={inputValue} placeholder="search recipes" />
            <button>Submit</button>
        </form>
    )
}
export default Search