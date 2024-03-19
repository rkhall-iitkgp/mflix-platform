import SearchBar from '@/app/(root)/components/SearchBar'
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import BgImage from '@/assets/images/bg-home.jpeg'
import { createStyles } from '@mantine/styles'
import Poster from '@/assets/images/poster.jpeg'
import Vector1 from '@/assets/images/vect-1.svg'
import Vector2 from '@/assets/images/vect-2.svg'

export default function HeroSection() {
    const { classes, cx } = useStyles();
    const [input, setInput] = React.useState('' as string);

    const [isTyping, setIsTyping] = useState(false);
    const handleTyping = (typing) => {
        setIsTyping(typing);
    };
    return (
        <>
            <div className={classes.bgContainer}>
                <Image src={BgImage} alt='Background Image' layout='fill' objectFit='cover' className={classes.bgImage} />
            </div>
            <div></div>
            <div className={classes.hero} style={{justifyContent:`${input ? 'center':'space-evenly'}`,gap:`${input ? '0rem':'2rem'}`}}>
                <div className={classes.leftSection}>
                    <h1 className={classes.heading}>Cool Animated Text</h1>
                    <SearchBar onTyping={handleTyping} input={input} setInput={setInput} />
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni est dolores iure natus laboriosam fugit laudantium facilis. Molestiae consectetur explicabo quibusdam esse iusto atque iste quos qui, officiis obcaecati voluptatibus!</p>
                </div>
                {!input && <div className={classes.rightSection}>
                    <p className={classes.p}>Recent Searches:</p>
                    <div className={classes.movies}>
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
                    </div>
                </div>}
                {input &&
                    <div className={classes.flex1}>
                        <Image src={Vector1} alt='vector' className={classes.vec1Style}/>
                        <Image src={Vector2} alt='vector' className={classes.vec2Style}/>
                    </div>}
                {input && <div className={classes.searchRightSection}>
                    <div className={classes.searchMovies}>
                        <SearchResultCard />
                        <SearchResultCard />
                        <SearchResultCard />
                        <SearchResultCard />
                        <SearchResultCard />
                    </div>
                </div>}
            </div>
        </>
    )
}

const MovieCard = () => {
    const { classes, cx } = useStyles()
    return (
        <div className={cx(classes.movieCard)}>
            <Image src={Poster} alt="poster" style={{ height: '5.25rem', width: '3.7rem' }} />
            <div className={classes.cardDescription}>
                <h2 className={classes.movieTitle}>{"movie.title"}</h2>
                <div className={classes.movieGenre}>{"movie.genre"}</div>
                <span className={classes.movieYear}>Year</span>
            </div>
        </div>
    )
}
const SearchResultCard = () => {
    const { classes, cx } = useStyles()
    return (
        <div className={cx(classes.searchCard)}>
            <div className={classes.cardDescription}>
                <h2 className={classes.movieTitle}>{"movie.title"}</h2>
                <div className={classes.flex}>
                    <div className={classes.movieGenre}>{"movie.genre"}</div>
                    <span className={classes.movieYear}>Year</span>
                </div>
            </div>
        </div>
    )
}

const useStyles = createStyles(() => ({
    bgContainer: {
        position: 'fixed',
        top: 0,
        width: '100%',
        height: '100vh',
        zIndex: -30,
        overflow: 'hidden'
    },
    bgImage: {
        opacity: 0.25,
        zIndex: -20
    },
    flex:{
        display:'flex',
        justifyContent:'space-between',
        // width:'100px'
    },
    flex1:{
        display:'flex',
        flexDirection:'column',
        marginTop:'12rem'
        // justifyContent:'space-between',
        // width:'100px'
    },
    vec1Style:{
        marginTop:'-10rem'
    },
    vec2Style:{
        // marginTop:'10rem'
    },
    hero: {
        // paddingTop: '6rem',
        display: 'flex',
        flex: '2 1 auto',
        // justifyContent: 'space-evenly',
        alignItems: 'center',
        overflow: 'hidden',
        gap: '2rem'
    },
    leftSection: {
        width: '35rem',
        paddingBottom: '5rem',
        display: 'flex',
        flexDirection: 'column',
    },

    heading: {
        fontSize: '4.2rem',
        margin: '0.5rem',
        textWrap: 'wrap',
        width: '100%',
        fontWeight: 500
    },
    ptext: {
        fontSize: '1.35rem',
        lineHeight: '2rem',
        // marginTop: '1rem',
        // marginBottom: '1rem'
    },
    rightSection: {
        overflow: 'hidden',
        gap: '0.8rem',
    },
    searchRightSection: {
        overflow: 'hidden',
        gap: '0.8rem',
        marginTop:'1.5rem'
    },
    p: {
        marginBottom: '0.75rem',
        fontSize: '2rem',
        lineHeight: '1.75rem'
    },
    movies: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        gap: '.6rem'
    },
    searchMovies: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        // gap: '.6rem',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '0.5rem'
    },
    movieCard: {
        backgroundColor: '#D9D9D926',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        // padding: '0.8rem',
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'flex-start',
        width: '25rem',
        borderStyle: 'solid',
        // borderColor: '#FFFFFF',
        // borderTopWidth: '1px',
        borderRadius: '.7rem',
        overflow: 'hidden',
        borderWidth: '0px',
        // borderBottomWidth: '0px',
        height: '7rem',
        marginBottom: '0.6rem',
        gap: '1rem',
        padding: '1rem 1.125rem',
        opacity: 1,
    },
    searchCard: {
        backgroundColor: '#D9D9D926',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        padding: '0.8rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '25rem',
        borderStyle: 'solid',
        borderColor: '#FFFFFF',
        borderTopWidth: '1px',
        // borderRadius: '.7rem',
        overflow: 'hidden',
        borderWidth: '0.5px',
        // borderBottomWidth: '0px',
        height: '5.575rem',
        // marginBottom: '0.6rem',
        gap: '1rem',
        // padding: '1rem 1.125rem',
        opacity: 1,
    },
    cardDescription: {
        paddingLeft: '1rem',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center'
        width:'100%'
    },
    movieTitle: {
        fontSize: '1.25rem',
        lineHeight: '1.75rem',
        fontWeight: 100,
        marginTop: 0,
        marginBottom: 0
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