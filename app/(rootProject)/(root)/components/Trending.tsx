'use client';
import Image from 'next/image';
import { useRef, useState, CSSProperties, useEffect } from 'react';
import MovieCard from '@/app/(rootProject)/(root)/components/MovieCard';
import rArrow from '@/assets/icons/rarrow.svg';
import { createStyles } from '@mantine/styles';

// explicity define the type of the props
export default function Trending({ title, image }: { title: string; image: any }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowFirstArrow] = useState(false);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // Check if the container is scrolled horizontally
      if (!scrollRef.current) return;
      if (scrollRef.current.scrollLeft > 0) {
        setShowFirstArrow(true);
      } else {
        setShowFirstArrow(false);
      }
    };
    if (!scrollRef.current) return;
    scrollRef.current.addEventListener('scroll', handleScroll);
    return () => {
      if (!scrollRef.current) return;
      scrollRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollRight = () => {
    console.log('scrolling');
    setVis(true);
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      top: 0,
      left: 220,
      behavior: 'smooth',
    });
  };

  const handleScrollLeft = () => {
    console.log('scrolling');
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      top: 0,
      left: -220,
      behavior: 'smooth',
    });
  };

  const { classes, cx } = useStyles();

  return (
    <section className={classes.sectionStyles}>
      <div className={classes.trendStyles}>
        <h1 className={classes.titleStyles}>{title}</h1>
        <Image src={image} alt="icon" className={classes.iconStyles} />
      </div>
      <div ref={scrollRef} className={classes.containerStyles}>
        <div className={classes.movieDiv}>
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>

        <Image
          src={rArrow}
          alt="slider"
          className={cx(classes.arrowStyles, classes.leftArrow, {
            [classes.opacity]: showLeftArrow === true,
          })}
          width={30}
          height={40}
          onClick={handleScrollLeft}
        />

        <Image
          src={rArrow}
          alt="slider"
          className={cx(classes.arrowStyles, classes.rightArrow)}
          width={30}
          height={40}
          onClick={handleScrollRight}
        />
      </div>
    </section>
  );
}

const useStyles = createStyles(() => ({
  opacity: {
    opacity: 1,
  },
  sectionStyles: {
    // paddingBottom: '5rem',
    position: 'relative',
    width: 'calc(100vw)',
    background: '#0B0212',
    overflow: 'hidden',
  },

  titleStyles: {
    fontSize: '3rem',
    lineHeight: '5.5rem',
    display: 'inline',
    zIndex: 5,
  },

  iconStyles: {
    // marginLeft: '1rem',
    width: '70px',
  },

  containerStyles: {
    width: '100%',
    overflow: 'hidden',
  },

  arrowStyles: {
    backgroundColor: '#000000e0',
    boxShadow: '-12px 20px 222px 180px #000',
    position: 'absolute',
    top: '21rem',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    zIndex: 2,
    right: '1rem',
  },

  movieDiv: {
    display: 'flex',
    position: 'relative',
    width: 'max-content',
    paddingLeft: '5rem',
    paddingTop: '1rem',
    paddingBottom: '.5rem',
    height: '30rem',
  },

  leftArrow: {
    left: '5rem',
    transform: 'translateY(-50%) rotate(180deg)',
    transition: 'opacity .15s',
    opacity: 0,
  },

  rightArrow: {
    right: '5rem',
  },
  trendStyles: {
    width: 'fit-content',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5rem',
  },
}));

// const useStyles = createStyles(() => ({
//     opacity: {
//         opacity: 1
//     },
//     sectionStyles: {
//         paddingBottom: '0rem',
//         // position: 'relative',
//         width: 'calc(100vw)',
//         background: '#0B0212',
//         // overflow: 'hidden'
//     },

//     titleStyles: {
//         fontSize: '3rem',
//         lineHeight: "5.5rem",
//         display: 'inline',
//         // zIndex: 1,
//     },

//     iconStyles: {
//         // marginLeft: '1rem',
//         width: '70px',
//     },

//     containerStyles: {
//         width: '100%',
//         // overflow: 'hidden',
//         position: 'relative',
//     },

//     arrowStyles: {
//         backgroundColor: '#000000e0',
//         boxShadow: '-12px 20px 222px 180px #000',
//         position: 'absolute',
//         top: '11.5rem',
//         transform: 'translateY(-50%)',
//         cursor: 'pointer',
//         zIndex: 2,
//         right: '1rem'
//     },

//     movieDiv: {
//         display: 'flex',
//         position: 'relative',
//         width: 'max-content',
//         paddingLeft: '5rem',
//         paddingTop: '1rem',
//         paddingBottom: '.5rem'
//     },

//     leftArrow: {
//         left: '40px',
//         transition: 'opacity .15s',
//         opacity: 0
//     },

//     rightArrow: {
//         right: '5rem'
//     },
//     trendStyles: {
//         width: 'fit-content',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginLeft: '5rem'
//     },
// }));
