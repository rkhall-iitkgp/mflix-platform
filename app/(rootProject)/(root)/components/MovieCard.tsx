import Image from 'next/image';
import Heart from '@/assets/images/heart.svg';
import favHeart from '@/assets/images/fav-heart.svg';
import Poster from '@/assets/images/poster.png';
import Imdb from '@/assets/images/imdb.png';
import Tomato from '@/assets/images/tomato.png';
import { createStyles } from '@mantine/styles';
import { useState } from 'react';
import themeOptions from '@/assets/themes/colors';


const useStyles = createStyles(() => ({
  containerStyles: {
    marginRight: '3rem',
    width: '220px',
    height: '420px',
    overflow: 'hidden',
  },

  heartContainerStyles: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    position: 'absolute',
    width: '13rem',
    marginTop: '0.75rem',
  },

  // heartImageStyles: {
  //   fill: 'red',
  //   alignSelf: 'flex-end',
  //   backgroundColor: '#F3F4F6',
  //   padding: '0.2rem',
  //   left: '40px',
  //   border: '2px solid',
  //   borderRadius: '50%',
  //   zIndex: 1,
  //   cursor: 'pointer',
  // },

  posterStyles: {
    width: '20.75rem',
    transform: 'rotate(180deg)'
  },

  countryStyles: {
    color: '#9CA3AF',
    fontWeight: 'bold',
    marginTop: '0.0625rem',
  },

  titleStyles: {
    color: themeOptions.color.divider,
    fontSize: '1.125rem',
    fontWeight: 'bold',
    marginTop: '0.0625rem',
    marginBottom: '0rem'
  },

  ratingContainerStyles: {
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'space-between',
  },

  ratingItemStyles: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '0.0625rem',
  },

  genreStyles: {
    marginTop: '0.0625rem',
    color: themeOptions.color.divider,
    fontWeight: 'bold',
  },

  img: {
    display: 'inline'
  },

  rating: {
    marginLeft: '0.5rem',
    marginBottom: '0'
  },

  tomatoScore: {
    marginBottom: '0'
  },

  tomatoImg: {
    marginRight: '0.5rem'
  }
}))

export default function MovieCard() {
  const { classes } = useStyles();
  const [favourite, setFavourite] = useState(true);

  return (
    <div className={classes.containerStyles}>

      <Image src={Poster} alt='poster' width={220} height={310} className={classes.posterStyles} />
      <span className={classes.countryStyles}>USA, 2016- Current</span>
      <h3 className={classes.titleStyles}>Movie Title</h3>
      <div className={classes.ratingContainerStyles}>
        <div className={classes.ratingItemStyles}>
          <Image src={Imdb} width={35} height={17} alt='imdb' className={classes.img} />
          <span className={classes.rating}>8.6/10</span>
        </div>
        <div className={classes.ratingItemStyles}>
          <Image src={Tomato} alt='tomato' height={17} width={16} className={classes.tomatoImg} />
          <span className={classes.tomatoScore}>96%</span>
        </div>
      </div >
      <div className={classes.genreStyles}>
        <span>Action, Adventure / Horror</span>
      </div>
    </div >
  );
}