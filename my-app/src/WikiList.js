// src/components/WikiList.js
import React, { useState, useEffect } from 'react';

function WikiList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [errorMore, setErrorMore] = useState(null);
  const [offset, setOffset] = useState(0); // 用於分頁的 offset
  const limit = 10; // 每次載入的資料數量 (可以調整)

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://dae-mobile-assignment.hkit.cc/api/wiki-entries?offset=${offset}&limit=${limit}`
      );
      const data = await response.json();

      if (data.length > 0) {
        setItems([...items, ...data]);
        setOffset(offset + limit);
        setHasMore(data.length === limit); // 如果返回的資料少於 limit，則表示沒有更多資料
      } else {
        setHasMore(false); // 沒有更多資料
      }
    } catch (error) {
      setError('載入資料時發生錯誤：' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoadingMore(true);
    setErrorMore(null);

    try {
      const response = await fetch(
        `https://dae-mobile-assignment.hkit.cc/api/wiki-entries?offset=${offset}&limit=${limit}`
      );
      const data = await response.json();

      if (data.length > 0) {
        setItems([...items, ...data]);
        setOffset(offset + limit);
        setHasMore(data.length === limit); // 如果返回的資料少於 limit，則表示沒有更多資料
      } else {
        setHasMore(false); // 沒有更多資料
      }
    } catch (error) {
      setErrorMore('載入更多資料時發生錯誤：' + error.message);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div>
      {loading && <p>載入中...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            {/*  API 沒有提供 image_url, 請根據實際情況調整 */}
            {/* <img src={item.image_url} alt={item.title} /> */}
          </li>
        ))}
      </ul>

      {hasMore && (
        <button onClick={loadMore} disabled={loadingMore}>
          {loadingMore ? '載入中...' : '載入更多'}
        </button>
      )}
      {errorMore && <p style={{ color: 'red' }}>{errorMore}</p>}
    </div>
  );
}

export default WikiList;