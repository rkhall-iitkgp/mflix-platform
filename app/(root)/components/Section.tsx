import ListMovies from '@/components/ListMovies';
import React from 'react';
import Trend from '@/assets/icons/trends.svg';
import Image from 'next/image';
import { createStyles } from '@mantine/styles';

const Section = ({ title, image }: { title: string; image: string }) => {
  const useStyles = createStyles(() => ({
    SectionHeading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingLeft: 100,
      marginTop: 20,
    },
    titleStyles: {
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
      <ListMovies />
    </div>
  );
};

export default Section;
