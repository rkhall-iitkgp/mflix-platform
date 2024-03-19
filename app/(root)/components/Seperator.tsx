import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedLines = () => {
  // Refs for the DOM elements you want to animate
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    // Simple GSAP animation to grow the lines' width
    gsap.to(line1Ref.current, { width: '100%', duration: 1 });
    gsap.to(line2Ref.current, { width: '100%', duration: 1, delay: 0.5 });
  }, []);

  return (
    <div style={styles.container}>
    {/* //   <div style={styles.searchBox}> Your search box here </div> */}
      <div style={styles.line} ref={line1Ref}></div> {/* First line */}
      <div style={styles.line} ref={line2Ref}></div> {/* Second line */}
    {/* //   <div style={styles.resultsBox}> Your results box here </div> */}
    </div>
  );
};

export default AnimatedLines;

const styles = {
    container: {
      position: 'relative',
      // Add other styles for the container as needed
    },
    line: {
      position: 'absolute',
      height: '2px',
      backgroundColor: '#FFFFFF', // White line color
      width: '0', // Start with 0 width to animate from
      top: '50%', // Centered vertically, but adjust as needed
      left: '0',
      // Add other styles like zIndex if you need the line to be above or below other elements
    },
    // Styles for your search box
    searchBox: {
      // Add your styles here
    },
    // Styles for your results box
    resultsBox: {
      // Add your styles here
    }
  };
  
  