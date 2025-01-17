import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Write() {
    const [titleValue, setTitleValue] = useState("");
    const [contentValue, setContentValue] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setTitleValue(e.target.value);
    }

    const handleChange2 = (e) => {
        setContentValue(e.target.value);
    }

    const handleClick = (e) => {
        // validation check
        const title = titleValue.trim();
        const content = contentValue.trim();
        if(title.length < 1){
            alert('Please fll in title.');
            return;
        }else if(content.length < 1){
            alert('Please fll in content.');
            return;
        }

        let memos = JSON.parse(localStorage.getItem("memos")) || [];
        
        // add new list
        const newMemo = {title: title, content: content, date: new Date().toLocaleString()};
        memos.push(newMemo);

        // save into memos
        localStorage.setItem("memos", JSON.stringify(memos));

        // initialize input
        setTitleValue("");
        setContentValue("");
        navigate("/");
    }

    return (
        <div className="create_wrap">
            <input 
                type="text" 
                placeholder="Title" 
                value={titleValue}
                onChange={handleChange} 
            />
            <textarea 
                placeholder="Content"
                value={contentValue}
                onChange={handleChange2} 
            />
            <button onClick={handleClick}>Done</button>
        </div>
    );
}

export default Write;
