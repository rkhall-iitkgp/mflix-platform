'use client';

import React from 'react';
import Trending from './components/Trending';
import HeroSection from './components/HeroSection';
import Trend from '@/assets/icons/trends.svg';
import MyList from '@/assets/icons/my-list.svg';
import Award from '@/assets/icons/award.svg';
import ListMovies from '@/components/ListMovies';
import Section from './components/Section';

export default function Home() {
  const titles = ['Trending', 'Award Winning Films', 'My List'];
  const images = [Trend, Award, MyList];
  const trendingData = titles.map((title, index) => ({
    title: title,
    image: images[index],
  }));
  return (
    <>
      <HeroSection />
      {/* <ListMovies /> */}
      {trendingData.map(({ title, image }) => (
        <Section title={title} image={image} />
      ))}
    </>
  );
}
