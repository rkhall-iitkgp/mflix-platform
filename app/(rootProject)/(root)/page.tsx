'use client';

import React, { useEffect, useState } from 'react';
import Trending from './components/Trending';
import HeroSection from '@/app/(rootProject)/(root)/components/HeroSection'
import Trend from '@/assets/icons/trends.svg';
import MyListIcon from '@/assets/icons/my-list.svg';
import AwardIcon from '@/assets/icons/award.svg';
import ListMovies from '@/components/ListMovies';
import Section from './components/Section';
import { createStyles } from '@mantine/styles';
import themeOptions from '@/utils/colors';
import useLoginStore from '@/Stores/LoginStore';
import useUserStore from '@/Stores/UserStore';

export default function Home() {
  const newState = useUserStore.getState();
  console.log("newState:" , newState);
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
      backgroundColor: 'linear-gradient(45, #00664A 40%, #00664A 60%, #00664A 100%)',
    },
  }));
  const { classes } = useStyle();
  const [TrendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [Award, setAward] = useState<any[]>([]);
  const [MyList, setMyList] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const userLoggedIn = checkLoginStatus();
    setIsLoggedIn(userLoggedIn);

    fetch(
      'https://971edtce1a.execute-api.ap-south-1.amazonaws.com' +
        '/search/fuzzy?query=&start=2015&end=2016&low=8&high=10&language=&country=&genre=&type=movie',
      { method: 'POST' }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        setTrendingMovies(data.results);
      });

    fetch( 'https://971edtce1a.execute-api.ap-south-1.amazonaws.com' + '/movies/awards', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        const newdata = data.results.filter((item: any) => item.awards.wins > 0);
        console.log('newdata', newdata);
        const newdatawithawards = newdata.map((item: any) => {
          return {
            ...item,
            award: item.awards.wins,
            text: item.awards.text,
          };
        });
        console.log('newdatawithawards', newdatawithawards);
        const sortedData = newdatawithawards.sort((a: any, b: any) => a.award - b.award);
        console.log('sortedData', sortedData);

        setAward(sortedData);
      });

    return () => {};
  }, []);

  const checkLoginStatus = () => {
    const user = localStorage.getItem('user');
    if(user) return true;
    return false;
  };

  return (
    <>
      <HeroSection />
      {/* <ListMovies /> */}
      <div>
        <div className={classes.background}></div>
        <div className={classes.backgroundOverlay}></div>
        {TrendingMovies.length > 0 && <Section title={'Trending'} image={Trend} movieData={TrendingMovies || []} />}
        <Section title={'Award Winning Films'} image={AwardIcon} movieData={Award || []} />
        {MyList.length> 0 && isLoggedIn && <Section title={'My List'} image={MyListIcon} movieData={MyList || []} />}
      </div>
    </>
  );
}
