'use client';

import React, { useEffect, useState } from 'react';
import Trending from './components/Trending';
import HeroSection from './components/HeroSection';
import Trend from '@/assets/icons/trends.svg';
import MyListIcon from '@/assets/icons/my-list.svg';
import AwardIcon from '@/assets/icons/award.svg';
import ListMovies from '@/components/ListMovies';
import Section from './components/Section';
import { createStyles } from '@mantine/styles';
import themeOptions from '@/utils/colors';

export default function Home() {
  const useStyle = createStyles(() => ({
    background: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: -1,
      backgroundColor: themeOptions.color.background,
    },
    backgroundOverlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 0,
      backgroundColor: 'linear-gradient(45, #580099 40%, #9441D0 60%, #580099 100%)',
    },
  }));
  const { classes } = useStyle();
  const [TrendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [Award, setAward] = useState<any[]>([]);
  const [MyList, setMyList] = useState<any[]>([]);
  useEffect(() => {
    fetch(
      'https://971edtce1a.execute-api.ap-south-1.amazonaws.com/search/fuzzy?query=&start=2015&end=2016&low=8&high=10&language=&country=&genre=&type=',
      { method: 'POST' }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        setTrendingMovies(data.results);
      });

    return () => {};
  }, []);

  return (
    <>
      <HeroSection />
      {/* <ListMovies /> */}
      <div>
        <div className={classes.background}></div>
        <div className={classes.backgroundOverlay}></div>
        <Section title={'Trending'} image={Trend} movieData={TrendingMovies || []} />
        <Section title={'Award Winniing Films'} image={AwardIcon} movieData={Award || []} />
        <Section title={'My List'} image={MyListIcon} movieData={MyList || []} />
      </div>
    </>
  );
}
