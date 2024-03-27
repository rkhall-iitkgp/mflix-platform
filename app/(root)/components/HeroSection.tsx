'use client';
import SearchBar from '@/app/(root)/components/SearchBar';
import Image from 'next/image';
import React from 'react';
import { gsap } from 'gsap';
import { useState, useEffect, useRef } from 'react';
import BgImage from '@/assets/images/bg-home.jpeg';
import { createStyles } from '@mantine/styles';
import Poster from '@/assets/images/poster.png';
import Vector1 from '@/assets/images/vect-1.svg';
import Vector2 from '@/assets/images/vect-2.svg';
import { memo } from 'react';
import { ScrollToPlugin } from 'gsap/all';
gsap.registerPlugin(ScrollToPlugin);
const HeroSection = () => {
  console.log('rendered');
  const { classes, cx } = useStyles();
  const [input, setInput] = React.useState('' as string);
  const [showSearchSection, setShowSearchSection] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const flexRef = useRef(null);
  console.log(flexRef);
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      flexRef.current,
      { scale: 0, opacity: 1, visibility: 'visible', height: 0, width: 0 },
      {
        duration: 0.25,
        scale: 1.01,
        opacity: 1,
        visibility: 'visible',
        height: 'auto',
        width: 'auto',
      }
    );
    if (isTyping) {
      tl.play();
    } else {
      tl.reverse();
    }
    return () => {
      tl.kill();
    };
  }, [isTyping]);
  const handleTyping = (typing: string) => {
    console.log('func called');
    setIsTyping(typing !== '');
    console.log(isTyping);
    setInput(typing);
  };
  return (
    <>
      <div className={classes.bgContainer}>
        <Image
          src={BgImage}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className={classes.bgImage}
        />
        <div className={classes.HeroImgOverlay}></div>
      </div>
      <div className={classes.hero} style={{ gap: `${isTyping ? '0rem' : '4rem'}` }}>
        <div
          className={classes.leftSection}
          style={{ marginLeft: `${isTyping ? '0rem' : '0rem'}` }}
        >
          <h1 className={classes.heading}>Cool Animated Text</h1>
          <SearchBar
            onTyping={handleTyping}
            input={input}
            setInput={setInput}
            // isTyping={isTyping}
          />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni est dolores iure natus
            laboriosam fugit laudantium facilis. Molestiae consectetur explicabo quibusdam esse
            iusto atque iste quos qui, officiis obcaecati voluptatibus!
          </p>
        </div>
        <div className={classes.rightSection} style={{ display: `${input ? 'none' : 'flex'}` }}>
          <p className={classes.p}>Recent Searches:</p>
          <div className={classes.movies}>
            <MovieCard />
            <MovieCard />
            <MovieCard />
          </div>
        </div>
        <div className={classes.flex} id="flex" ref={flexRef}>
          <div className={classes.flex} id="flex">
            <div className={classes.flex1}>
              <Image src={Vector1} alt="vector" className={classes.vec1Style} id="vec1" />
              <Image src={Vector2} alt="vector" className={classes.vec2Style} id="vec2" />
            </div>
            <div
              className={cx(
                classes.searchRightSection,
                showSearchSection && classes.searchRightSectionVisible
              )}
              style={{ height: `${isTyping ? '0px' : '0'}`, marginTop: '2rem' }}
            >
              <div className={classes.searchMovies}>
                <SearchResultCard />
                <SearchResultCard />
                <SearchResultCard />
                <SearchResultCard />
                <SearchResultCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MovieCard = () => {
  const { classes, cx } = useStyles();
  return (
    <div className={cx(classes.movieCard)}>
      <Image src={Poster} alt="poster" style={{ height: '5.25rem', width: '3.7rem' }} />
      <div className={classes.cardDescription}>
        <h2 className={classes.movieTitle}>{'movie.title'}</h2>
        <div className={classes.movieGenre}>{'movie.genre'}</div>
        <span className={classes.movieYear}>Year</span>
      </div>
    </div>
  );
};
const SearchResultCard = () => {
  const { classes, cx } = useStyles();
  return (
    <div className={cx(classes.searchCard)}>
      <div className={classes.cardDescription}>
        <h2 className={classes.movieTitle}>{'movie.title'}</h2>
        <div className={classes.flex}>
          <div className={classes.movieGenre}>{'movie.genre'}</div>
          <span className={classes.movieYear}>Year</span>
        </div>
      </div>
    </div>
  );
};

const useStyles = createStyles(() => ({
  HeroImgOverlay: {
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '100vh',
    zIndex: -5,
    background: 'linear-gradient(45deg, rgba(0, 0, 0, 1) 0, rgba(0, 0, 0, 0) 60%)',
  },
  bgContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100vh',
    zIndex: -10,
    overflow: 'hidden',
  },
  bgImage: {
    opacity: 0.25,
    // zIndex: -20
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems:'center'
    // transform:'scale(1) translateX(-10%)',
    // transition:'transform 1s ease-in'
    // width:'100px'
  },
  flex1: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '13rem',
    // justifyContent:'space-between',
    // width:'100px'
  },
  vec1Style: {
    marginTop: '-9.5rem',
  },
  vec2Style: {
    // marginTop:'10rem'
  },
  hero: {
    // paddingTop: '6rem',
    width: '100%',
    display: 'flex',
    flex: '2 1 auto',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    gap: '2rem',
    marginBottom: '2.85rem',
    marginLeft: '20%',
    height: '100vh',
  },
  leftSection: {
    marginTop: '2rem',
    width: '35vw',
    paddingBottom: '5rem',
    display: 'flex',
    flexDirection: 'column',
  },

  heading: {
    fontSize: '4.2rem',
    margin: '0.5rem',
    textWrap: 'wrap',
    width: '100%',
    fontWeight: 500,
  },
  ptext: {
    fontSize: '1.35rem',
    lineHeight: '2rem',
    // marginTop: '1rem',
    // marginBottom: '1rem'
  },
  rightSection: {
    overflow: 'hidden',
    flexDirection: 'column',
    gap: '0.8rem',
    marginTop: '-2rem',
  },
  searchRightSection: {
    // overflow: 'hidden',
    // gap: '0.8rem',
    // marginTop: '1.5rem',
    // transform: 'scale(0.8)',
    // transformOrigin: 'top right',
    // transition: 'transform 2s ease-in-out',
  },
  searchRightSectionVisible: {
    // transform: 'scale(1)',
  },
  p: {
    marginBottom: '0.75rem',
    fontSize: '2rem',
    lineHeight: '1.75rem',
  },
  movies: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    gap: '.6rem',
  },
  searchMovies: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    // gap: '.6rem',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '0.5rem',
    marginTop: '0.5rem',
  },
  movieCard: {
    backgroundColor: '#D9D9D926',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    // padding: '0.8rem',
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    width: '25rem',
    borderStyle: 'solid',
    // borderColor: '#FFFFFF',
    // borderTopWidth: '1px',
    borderRadius: '.7rem',
    overflow: 'hidden',
    borderWidth: '0px',
    // borderBottomWidth: '0px',
    height: '7rem',
    marginBottom: '0.6rem',
    gap: '1rem',
    padding: '1rem 1.125rem',
    opacity: 1,
    cursor: 'pointer',
    transition: 'transform 0.15s ease-in',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  searchCard: {
    backgroundColor: '#D9D9D926',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    padding: '0.8rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '22vw',
    borderStyle: 'solid',
    borderColor: '#FFFFFF',
    borderTopWidth: '1px',
    overflow: 'hidden',
    borderWidth: '0.5px',
    height: '5.575rem',
    gap: '1rem',
    opacity: 1,
  },
  cardDescription: {
    paddingLeft: '1rem',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center'
    width: '100%',
  },
  movieTitle: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    fontWeight: 100,
    marginTop: 0,
    marginBottom: 0,
  },
  movieGenre: {
    fontWeight: 100,
  },
  movieYear: {
    color: 'rgb(107, 114, 128)',
    marginRight: '0.5rem',
    display: 'inline',
  },
}));

export default React.memo(HeroSection);
