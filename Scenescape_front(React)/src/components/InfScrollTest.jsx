import React, { useState, useEffect, useRef } from "react";

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  // 데이터 로드 함수
  const fetchMoreData = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
    );
    const newData = await response.json();

    if (newData.length === 0) {
      setHasMore(false);
    } else {
      setData((prev) => [...prev, ...newData]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
          fetchMoreData();
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore]);

  return (
    <div>
      <ul>
        {data.map((item) => (
          <li
            key={item.id}
            style={{
              margin: "20px 0",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            {item.title}
          </li>
        ))}
      </ul>
      {hasMore && (
        <div
          ref={loaderRef}
          style={{ height: "100px", background: "lightgray" }}
        >
          Loading more...
        </div>
      )}
      {!hasMore && <p>No more data to load</p>}
    </div>
  );
};

export default InfiniteScroll;
