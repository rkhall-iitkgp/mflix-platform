import Image from 'next/image';
import Heart from '@/assets/images/heart.svg';
import Poster from '@/assets/images/poster.jpeg';
import Imdb from '@/assets/images/imdb.png';
import Tomato from '@/assets/images/tomato.png';
import { createStyles } from '@mantine/styles';


const useStyles = createStyles(() => ({
    containerStyles: {
        marginRight: '40px',
        width: '250px',
        height: '480px',
        overflow: 'hidden',
    },

    heartContainerStyles: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        width: '15rem',
        marginTop: '0.75rem',
    },

    heartImageStyles: {
        alignSelf: 'flex-end',
        backgroundColor: '#F3F4F6',
        left: '48px',
        border: '2px solid',
        padding: '1px',
        borderRadius: '50%',
    },

    posterStyles: {
        width: '20.75rem',
    },

    countryStyles: {
        color: '#9CA3AF',
        fontWeight: 'bold',
        marginTop: '0.0625rem',
    },

    titleStyles: {
        color: '#000',
        fontSize: '1.125rem',
        fontWeight: 'bold',
        marginTop: '0.0625rem',
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
        color: '#9CA3AF',
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
    const { classes } = useStyles()
    return (
        <div className={classes.containerStyles}>
            <div className={classes.heartContainerStyles}>
                <Image src={Heart} width={30} height={30} alt='fav' className={classes.heartImageStyles} />
            </div>
            <Image src={Poster} alt='poster' width={250} height={370} className={classes.posterStyles} />
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
