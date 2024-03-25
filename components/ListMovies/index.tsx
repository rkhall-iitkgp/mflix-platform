import MovieCard from '@/app/(root)/components/MovieCard';
import { Divider } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const ListMovies = () => {
  const useStyles = createStyles(() => ({
    MovieListContainer: {
      display: 'flex',
      width: 'calc(98vw)',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '350px',
      overflow: 'hidden',
      margin: 'auto',
    },
    MovieListNavigation: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      height: '350px',
    },
    MovieListBox: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: '350px',
      width: 'max-content',
      gap: '2rem',
      transform: 'translateX(100px)',
    },
    MovieListLeftArrow: {
      width: '50px',
      background:
        'linear-gradient(90deg, rgba(0,0,0,1) 0%,rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    MovieListRightArrow: {
      width: '50px',
      background:
        'linear-gradient(90deg, rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 20%, rgba(0,0,0,1) 100%)',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }));
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [showFirstArrow, setShowFirstArrow] = React.useState(false);
  const [showSecondArrow, setShowSecondArrow] = React.useState(true);
  const handleScrollRight = () => {
    if (scrollRef.current) {
      console.log('scrolling');
      scrollRef.current.scrollBy({
        top: 0,
        left: 220,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      console.log('scrolling');
      scrollRef.current.scrollBy({
        top: 0,
        left: -220,
        behavior: 'smooth',
      });
    }
  };
  const handleScroll = () => {
    if (scrollRef.current) {
      if (scrollRef.current.scrollLeft > 0) {
        setShowFirstArrow(true);
      } else {
        setShowFirstArrow(false);
      }
      if (
        scrollRef.current.scrollLeft <
        scrollRef.current.scrollWidth - scrollRef.current.offsetWidth
      ) {
        setShowSecondArrow(true);
      } else {
        setShowSecondArrow(false);
      }
    }
  };
  const { classes, cx } = useStyles();
  const {
    MovieListContainer,
    MovieListNavigation,
    MovieListBox,
    MovieListLeftArrow,
    MovieListRightArrow,
  } = classes;
  return (
    <div className={MovieListContainer} ref={scrollRef} onScroll={handleScroll}>
      <div className={MovieListBox}>
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
      <div className={MovieListNavigation}>
        {showFirstArrow ? (
          <div onClick={handleScrollLeft} className={MovieListLeftArrow}>
            <FaChevronLeft style={{ height: '50px', width: '100px' }} />
          </div>
        ) : (
          <div></div>
        )}
        {showSecondArrow && (
          <div onClick={handleScrollRight} className={MovieListRightArrow}>
            <FaChevronRight style={{ height: '50px', width: '100px' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListMovies;
