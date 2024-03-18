import SearchBar from '@/components/SearchBar'
import Image from 'next/image'
import React from 'react'
import BgImage from '@/assets/images/bg-home.jpeg'
import { createStyles } from '@mantine/styles'

export default function HeroSection() {
    const {classes} = useStyles()
    return (
        <>
            <div className={classes.bgContainer}>
                <Image src={BgImage} alt='Background Image' layout='fill' objectFit='cover' className={classes.bgImage} />
            </div>
            <div className={classes.hero}>
                <div className={classes.leftSection}>
                    <h1 className={classes.heading}>Cool Animated Text</h1>
                    <SearchBar />
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni est dolores iure natus laboriosam fugit laudantium facilis. Molestiae consectetur explicabo quibusdam esse iusto atque iste quos qui, officiis obcaecati voluptatibus!</p>
                </div>


                <div className={classes.rightSection}>
                    <p className={classes.p}>Recent Searches:</p>
                    <div className={classes.movies}>
                        <div className={classes.movieCard}>
                            <Image src="" alt="poster" />
                            <div className={classes.cardDescription}>
                                <h2 className={classes.movieTitle}>{"movie.title"}</h2>
                                <div className={classes.movieGenre}>{"movie.genre"}</div>
                                <span className={classes.movieYear}>Year</span>
                            </div>
                        </div>
                        <div className={classes.movieCard}>
                            <Image src="" alt="poster" />
                            <div className={classes.cardDescription}>
                                <h2 className={classes.movieTitle}>{"movie.title"}</h2>
                                <div className={classes.movieGenre}>{"movie.genre"}</div>
                                <span className={classes.movieYear}>Year</span>
                            </div>
                        </div>
                        <div className={classes.movieCard}>
                            <Image src="" alt="poster" />
                            <div className={classes.cardDescription}>
                                <h2 className={classes.movieTitle}>{"movie.title"}</h2>
                                <div className={classes.movieGenre}>{"movie.genre"}</div>
                                <span className={classes.movieYear}>Year</span>
                            </div>
                        </div>
                        <div className={classes.movieCard}>
                            <Image src="" alt="poster" />
                            <div className={classes.cardDescription}>
                                <h2 className={classes.movieTitle}>{"movie.title"}</h2>
                                <div className={classes.movieGenre}>{"movie.genre"}</div>
                                <span className={classes.movieYear}>Year</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

const useStyles = createStyles(() => ({
    bgContainer: {
        position: 'absolute',
        width: '100%',
        height: '100vh',
        zIndex: -30,
        overflow: 'hidden'
    },
    bgImage: {
        opacity: 0.25,
        zIndex: -20
    },
    hero: {
        paddingTop: '6rem',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        overflow: 'hidden'
    },
    leftSection: {
        paddingLeft: '10rem',
        marginRight: '10rem',
        paddingRight: '5rem',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        display: 'flex',
        flexDirection: 'column'
    },
    heading: {
        fontSize: '3rem',
        margin: '0.5rem',
        textWrap: 'wrap'
    },
    rightSection: {
        width: '70%',
        marginRight: '10rem',
        overflow: 'hidden'
    },
    p: {
        marginBottom: '0.75rem',
        fontSize: '1.125rem',
        lineHeight: '1.75rem'
    },
    movies: {
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#FFFFFF',
        borderRadius: '0.5rem',
        overflow: 'hidden'
    },
    movieCard: {
        backgroundColor: '#D9D9D926',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderStyle: 'solid',
        borderColor: '#FFFFFF',
        borderTopWidth: '1px',
        borderBottomWidth: '1px'
    },
    cardDescription: {
        display: 'flex',
        flexDirection: 'column'
    },
    movieTitle: {
        fontSize: '1.25rem',
        lineHeight: '1.75rem',
        fontWeight: 100,
    },
    movieGenre: {
        fontWeight: 100
    },
    movieYear: {
        color: 'rgb(107, 114, 128)',
        marginRight: '0.5rem',
        display: 'inline'
    }
}))