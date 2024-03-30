import ListMovies from '@/components/ListMovies';
import React from 'react';
import Trend from '@/assets/icons/trends.svg';
import Image from 'next/image';
import { createStyles } from '@mantine/styles';
import themeOptions from '@/utils/colors';

const Section = ({ title, image, movieData }: { title: string; image: string; movieData: any }) => {
  const useStyles = createStyles(() => ({
    SectionHeading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingLeft: 100,
      marginTop: 20,
    },
    titleStyles: {
      color: themeOptions.color.divider,
      fontSize: '3rem',
      lineHeight: '5.5rem',
      display: 'inline',
      zIndex: 5,
      paddingRight: 20,
    },
  }));
  const { classes } = useStyles();
  const { SectionHeading, titleStyles } = classes;
  return (
    <div>
      <div className={SectionHeading}>
        <span className={titleStyles}>{title}</span>
        <Image src={image} alt="icon" />
      </div>
      <div style={{ position: 'relative' }}>
        <ListMovies movieData={movieData} />
      </div>
    </div>
  );
};

export default Section;
