'use client';
import SearchBar from '@/app/(rootProject)/(root)/components/SearchBar';
import Image from 'next/image';
import React from 'react';
import { gsap } from 'gsap';
import { useState, useEffect, useRef } from 'react';
import BgImage from '@/assets/images/bg-home.jpeg';
import { createStyles } from '@mantine/styles';
import Poster from '@/assets/images/poster1.jpg';
import Vector1 from '@/assets/images/vect-1.svg';
import Vector2 from '@/assets/images/vect-2.svg';
import { memo } from 'react';
import { ScrollToPlugin } from 'gsap/all';
import { useMediaQuery } from '@mantine/hooks';
import { RxCross2 } from "react-icons/rx";
import { em } from '@mantine/core';
import searchMsApiUrls from '../../api/searchMsApi';
import themeOptions from '@/utils/colors';
gsap.registerPlugin(ScrollToPlugin);
const HeroSection = () => {

  console.log('rendered');
  const { classes, cx } = useStyles();
  const [input, setInput] = React.useState('' as string);
  const [showSearchSection, setShowSearchSection] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const flexRef = useRef(null);
  const isSmallScreen = useMediaQuery('(max-width: 1200px)');
  console.log(flexRef);
  const [searches, setSearches] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await (await fetch(
        `${searchMsApiUrls()}/user/history/6601d20081bc9671ef4364ee`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )).json();
      console.log(res,'Ankan');
      setHistory(res);
    }
    fetchData();
  }, []);

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
    const fetchData = async () => {
      const res = await (await fetch(
        `${searchMsApiUrls()}/search/autocomplete?query=${input}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )).json();
      console.log(res,'Saha');
      setSearches(res.result);
    }
    fetchData();
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
      <div className={cx(classes.hero)} style={{ gap: `${isTyping ? '0rem' : '4rem'}` }}>
        <div
          className={classes.leftSection}
          style={{ marginLeft: `${isTyping ? '0rem' : '0rem'}` }}
        >
          <h1 className={classes.heading} style={{ fontSize: isSmallScreen ? '3rem' : '3.5rem' }}>
            Cool <br /> Animated Text
          </h1>
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
        {history?.length > 0 && (
          <div className={classes.rightSection} style={{ display: `${input ? 'none' : 'flex'}` }}>
            <p className={classes.p}>Recent Watch History:</p>
            <div className={classes.movies} style={{ width: isSmallScreen ? '18rem' : '25rem' }}>
              {history?.slice(-3).reverse().map((data, index) => (
                <MovieCard props={data} key={index} />
              ))}
            </div>
          </div>
        )}
        <div
          className={classes.searchContainer}
          id="flex"
          ref={flexRef}
          style={{ display: `${!input ? 'none' : 'flex'}` }}
        >
          <div className={classes.flex} id="flex">
            <div className={classes.flex1}>
              <Image src={Vector1} alt="vector" id="vec1" />
              <Image src={Vector2} alt="vector" id="vec2" />
            </div>
            <div
              className={cx(
                classes.searchRightSection,
                showSearchSection && classes.searchRightSectionVisible
              )}
            >
              <div className={classes.searchMovies}>
              {searches?.map((data, index) => (
                <SearchResultCard props={data} key={index} />
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MovieCard = ({ props }) => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.movieCard)}>
      <Image src={Poster} alt="poster" style={{ height: '5.25rem', width: '3.7rem' }} />
      <div className={classes.cardDescription}>
        <h2 className={classes.movieTitle}>{props.movie.title}</h2>
        <div className={classes.movieGenre}>{props.movie.genres.join(', ')}</div>
        <p className={classes.movieYear}>{props.movie.year}</p>
      </div>
    </div>
  );
};

const SearchResultCard = ({props}) => {
  const { classes, cx } = useStyles();
  return (
    <div className={cx(classes.searchCard)}>
      <div className={classes.cardDescription}>
        <h2 className={classes.movieTitle}>{props.title}</h2>
      </div>
    </div>
  );
};

const useStyles = createStyles(() => ({
  searchText: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    marginTop: '0.5rem',
    marginBottom: '1rem',
  },
  HeroImgOverlay: {
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '100vh',
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
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '3.4%',
    minWidth: '30%',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flex1: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  vec1Style: {
    marginTop: '-9.5rem',
  },
  vec2Style: {
    // marginTop:'10rem'
  },
  hero: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    gap: '2rem',
    height: '92vh',
  },
  leftSection: {
    marginTop: '2rem',
    width: '50%',
    paddingBottom: '5rem',
    display: 'flex',
    flexDirection: 'column',
    minWidth: `370px`,
    paddingLeft: '2rem',
  },

  heading: {
    margin: '0.5rem',
    textWrap: 'wrap',
    width: '100%',
    fontWeight: 500,
  },
  ptext: {
    fontSize: '1.35rem',
    lineHeight: '2rem',
  },
  rightSection: {
    overflow: 'hidden',
    flexDirection: 'column',
    gap: '0.8rem',
    marginTop: '-2rem',
    minWidth: '30%',
  },
  searchRightSection: {
    transform: 'translateX(-1px)',
  },
  searchRightSectionVisible: {},
  p: {
    marginBottom: '0.75rem',
    fontSize: '2rem',
    lineHeight: '1.75rem',
    position: 'absolute',
    top: '10%',
  },
  movies: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '14%',
    overflow: 'hidden',
    gap: '.6rem',
    transition: '0.5s ease',
  },
  searchMovies: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '0.5rem',
    marginTop: '0.5rem',
  },
  movieCard: {
    backgroundColor: '#D9D9D926',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    flexDirection: 'row',
    borderStyle: 'solid',
    borderRadius: '.7rem',
    overflow: 'hidden',
    borderWidth: '0px',
    height: '7rem',
    marginBottom: '0.6rem',
    gap: '1rem',
    padding: '1rem 1.125rem',
    opacity: 1,
    cursor: 'pointer',
    transition: 'transform 0.15s ease-in',
    span: {
      display: 'none',
    },
    '&:hover': {
      transform: 'scale(1.02)',
      span: {
        display: 'block',
      },
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
    gap:'0.5rem',
  },
  movieYear: {
    color:themeOptions.color.largeBox,
    marginRight: '0.5rem',
    marginTop:'0',
    display: 'inline',
  },
}));

export default React.memo(HeroSection);
