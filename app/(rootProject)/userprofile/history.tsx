
import React from 'react'
import { useState, useEffect } from 'react';
import MovieBanner from './Movie-banner';
import useUserStore from '@/Stores/UserStore';

const History = () => {
  const [movies, setMovies] = useState([]);
  const getHistory = async () => {
    // get request
    const state = useUserStore.getState();
    console.log(state);
    const user_id = state._id;
    console.log("hi");
    console.log(user_id);
    let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/history/${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    let jsonData = await res.json();
    if (!res.ok) {
      console.log(jsonData.message);
    }
    else {
      console.log(jsonData.message);
    }
  }

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div style={{ display: '', color: "white" }} >
      <h1 style={{ textAlign: 'center' }}>History</h1>
      <div style={{ display: 'flex', flexDirection: 'column', color: "white" }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', padding: '0 1rem ' }}>Today</h2>
        <MovieBanner />
        <MovieBanner />
      </div>
      <div>
        <p style={{ fontSize: '20px', fontWeight: 'bold', padding: '0 1rem' }}>Yesterday</p>
        <MovieBanner />
      </div>
    </div>
  )
}

export default History;