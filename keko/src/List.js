import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function List( { memoList, searchValue } ) {
    const filteredMemoList = memoList.filter(memo =>
        memo.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        memo.content.toLowerCase().includes(searchValue.toLowerCase())
    );

    return(
        <ul className="note_list">
            {filteredMemoList.map((memo, idx) => 
            <li key={idx}>
                <Link to={`/View/${idx}`}>
                    <span className="tag">Note #{idx + 1}</span>
                    <div>
                        <p className="note_title">{memo.title}</p>
                        <p className="note_content">{memo.content}</p>
                        <span className="date">{memo.date}</span>
                    </div>
                </Link>
            </li>
            )}
        </ul>
    );
}

export default List;