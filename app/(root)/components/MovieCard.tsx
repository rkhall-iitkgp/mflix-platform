import Image from 'next/image';
import Heart from '@/assets/images/heart.svg';
import favHeart from '@/assets/images/fav-heart.svg';
import Poster from '@/assets/images/poster.png';
import Imdb from '@/assets/images/imdb.png';
import Tomato from '@/assets/images/tomato.png';
import { createStyles } from '@mantine/styles';
import { useState } from 'react';


const useStyles = createStyles(() => ({
    containerStyles: {
        position: 'relative',
        width: '220px',
        marginRight: '3rem',
        height: '310px',
        overflow: 'visible',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        '&:hover': {
            // boxShadow: '-1px 1px 20px 10px rgba(209,209,209,0.5)',
            transform: 'scale(1.05)',
            // height: '430px',
            // marginTop: '.5rem',
            // marginBottom: '2rem',
            // zIndex: 10,
            // position: 'relativ',
        },
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

    heartImageStyles: {
        fill: 'red',
        alignSelf: 'flex-end',
        backgroundColor: '#F3F4F6',
        padding: '0.2rem',
        left: '40px',
        border: '2px solid',
        borderRadius: '50%',
        zIndex: 1,
        cursor: 'pointer',
    },

    posterStyles: {
        width: '13.75rem',
        cursor: 'pointer',
        // transform: 'rotate(180deg)'
        zIndex: 1
    },

    countryStyles: {
        color: '#9CA3AF',
        fontWeight: 'bold',
        marginTop: '0.0625rem',
    },

    titleStyles: {
        color: '#fff',
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
        color: '#fff',
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
    },
    movieInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        // height: 'max-content',
        padding: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#fff',
        transition: 'background-color 0.3s ease, opacity 0.3s ease',
        opacity: 0,
    },
    movieInfoContainerVisible: {
        opacity: 1,
    },
    card:
    {
        position: 'absolute',
        boxShadow: '-1px 1px 10px 3px rgba(209,209,209,0.5)',
        '&:hover': {
            height: '27rem',
            boxShadow: '-1px 1px 20px 5px rgba(209,209,209,0.75)',
        },
    },
    hovered: {
        // height: '27rem',
        padding: '0.5rem',
        position: 'absolute',
        zIndex: 500,
        background: 'black',
        top: '19.375rem',
    }
}))

export default function MovieCard() {
    const { classes } = useStyles();
    const [isHovered, setIsHovered] = useState(false);
    const [favourite, setFavourite] = useState(true);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            className={classes.containerStyles}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div style={{
            }} className={classes.card}>
                <div className={classes.heartContainerStyles}>
                    <Image
                        src={favourite ? Heart : favHeart}
                        width={35}
                        height={35}
                        alt='fav'
                        className={classes.heartImageStyles}
                        onClick={() => setFavourite(!favourite)}
                    />
                </div>
                <Image
                    src={Poster}
                    alt='poster'
                    width={220}
                    height={310}
                    className={classes.posterStyles}
                />
                {/* {true && ( */}
                {isHovered && (
                    <div style={{

                    }} className={classes.hovered}>
                        <span className={classes.countryStyles}>USA, 2016- Current</span>
                        <h3 className={classes.titleStyles}>Movie Title</h3>
                        <div className={classes.ratingContainerStyles}>
                            <div className={classes.ratingItemStyles}>
                                <Image
                                    src={Imdb}
                                    width={35}
                                    height={17}
                                    alt='imdb'
                                    className={classes.img}
                                />
                                <span className={classes.rating}>8.6/10</span>
                            </div>
                            <div className={classes.ratingItemStyles}>
                                <Image
                                    src={Tomato}
                                    alt='tomato'
                                    height={17}
                                    width={16}
                                    className={classes.tomatoImg}
                                />
                                <span className={classes.tomatoScore}>96%</span>
                            </div>
                        </div>
                        <div className={classes.genreStyles}>
                            <span>Action, Adventure / Horror</span>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}