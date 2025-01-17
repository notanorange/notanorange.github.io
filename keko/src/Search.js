import React, { useState } from 'react';

function Search( {onSearch} ) {
    const [inputValue, setInputValue] = useState('');

    const handleSearch = (e) => {
        const inputVal = e.target.value;
        setInputValue(inputVal);
        onSearch(inputVal);
    }

    return(
        <div className="search_box">
            <input type="text" placeholder="Search" value={inputValue} onChange={handleSearch} />
            {inputValue && <span className="delete" onClick={ () => {setInputValue(''); onSearch('');}}>close</span>}
        </div>
    );
}

export default Search;