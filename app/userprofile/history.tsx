
import React from 'react'
import MovieBanner from './Movie-banner';

const History = () => {
  return (
    <div style={{display:'' , color:"white"}} >
      <h1 style={{textAlign:'center'}}>History</h1>
      <div style={{display:'flex' , flexDirection:'column' , color:"white"}}>
      <h2 style={{fontSize:'20px' ,fontWeight:'bold' , padding:'0 1rem '}}>Today</h2>
  <MovieBanner />
  <MovieBanner />
  </div>
  <div>
  <p style={{fontSize:'20px' ,fontWeight:'bold' , padding:'0 1rem'}}>Yesterday</p>
<MovieBanner />
  </div>
    </div>
  )
}

export default History;