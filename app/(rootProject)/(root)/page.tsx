'use client';

import React from 'react';
import Trending from './components/Trending';
import HeroSection from './components/HeroSection';
import Trend from '@/assets/icons/trends.svg';
import MyList from '@/assets/icons/my-list.svg';
import Award from '@/assets/icons/award.svg';
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
  const titles = ['Trending', 'Award Winning Films', 'My List'];
  const images = [Trend, Award, MyList];
  const trendingData = titles.map((title, index) => ({
    title: title,
    image: images[index],
  }));
  const { classes } = useStyle();
  return (
    <>
      <HeroSection />
      {/* <ListMovies /> */}
      <div>
        <div className={classes.background}></div>
        <div className={classes.backgroundOverlay}></div>
        {trendingData.map(({ title, image }) => (
          <Section title={title} image={image} />
        ))}
      </div>
    </>
  );
}