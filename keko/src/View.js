import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function View() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [memo, setMemo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const memos = JSON.parse(localStorage.getItem("memos")) || [];
        const memo = memos[id];
        if (memo) {
            setMemo(memo);
            setTitle(memo.title);
            setContent(memo.content);
        }
    }, [id]);

    const handleSave = () => {
        if(window.confirm('Click "Confirm" to continue to save it.')){
            const memos = JSON.parse(localStorage.getItem("memos")) || [];
            memos[id] = { ...memo, title, content };
            localStorage.setItem("memos", JSON.stringify(memos));
            setMemo(memos[id]);
            setIsEditing(false);
        }
    };

    const handleDelete = () => {
        if(window.confirm('Are you sure you want to delete it?')){
            const memos = JSON.parse(localStorage.getItem("memos")) || [];
            memos.splice(id, 1);
            localStorage.setItem("memos", JSON.stringify(memos));
            navigate("/");
        }
    };

    const goPrev = () => {
        navigate(-1);
    };

    if (!memo) {
        return <p>Memo not found</p>;
    }

    return (
        <>
            {isEditing ? (
                <div className="create_wrap">
                    <input 
                    type="text" 
                    placeholder="Title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}/>
                    <textarea 
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}>{content}</textarea>
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div className="view_wrap">
                    <div className="title_box">
                        <h2>{memo.title}</h2>
                        <span>{memo.date}</span>
                    </div>
                    <p>{memo.content}</p>
                    <div className="view_btn_box">
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                        <button onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default View;