import React, { useState, useEffect }  from 'react';
import { Route, Routes, Link } from "react-router-dom";
import Write from './Write';
import List from './List';
import View from './View';
import Footer from './Footer';
import Search from './Search';

function App() {
  const [memoList, setMemoList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    let memos = JSON.parse(localStorage.getItem("memos")) || [];
    setMemoList(memos);
  }, []);

  const handleSearch = (value) => {
    setSearchValue(value);
  }

  return (
    <div className="container">
        <header>
            <h1><a href="/">keko</a></h1>
            <Search onSearch={handleSearch} />
        </header>
      <main>
        <div className="main_top">
            <ul className="sub_tab">
                <li className="on"><Link to="/List">List</Link></li>
            </ul>
            <Link to="/Write">Add</Link>
        </div>
        <Routes>
          <Route path="/" element={<List memoList={memoList} searchValue={searchValue} />} />
          <Route path="/List" element={<List memoList={memoList} searchValue={searchValue} />} />
          <Route path="/Write" element={<Write />} />
          <Route path="/View/:id" element={<View />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
