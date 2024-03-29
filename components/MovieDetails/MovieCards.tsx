import Image from 'next/image';
import Link from 'next/link';
import Heart from '@/assets/icons/heart.svg';
import Poster from '@/assets/icons/poster.jpeg';
import Imdb from '@/assets/icons/imdb.png';
import Tomato from '@/assets/icons/tomato.png';
import { createStyles } from '@mantine/styles';
import { useHover } from '@mantine/hooks';
import themeOptions from '@/utils/colors';

const useStyles = createStyles(() => ({
  containerStyles: {
    marginRight: '40px',
    width: '250px',
    height: '500px',
    overflow: 'hidden',
    margin: 0,
    borderRadius: '2px',
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

  posterStyles: {},

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
    margin: 0,
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
    display: 'inline',
  },

  rating: {
    color: themeOptions.color.divider,
    marginLeft: '0.5rem',
    marginBottom: '0',
  },

  tomatoScore: {
    color: themeOptions.color.divider,
    marginBottom: '0',
  },

  tomatoImg: {
    marginRight: '0.5rem',
  },
  Hovered: {
    boxShadow: '0 0 10px 0 rgba(256, 256, 256, 0.2)',
    transform: 'scale(1.05)',
    transition: 'all 0.5s',
  },
}));




export default function MovieCard({ data }: { data: any }) {
  console.log(data);
  const { classes, cx } = useStyles();
  const { hovered, ref } = useHover();
  return (
    <Link href={`/movies/${data._id}`} style={{textDecoration:'none'}}>
      <div className={cx(classes.containerStyles, hovered && classes.Hovered)} ref={ref}>
        {/* <div className={classes.heartContainerStyles}>
          <Image src={Heart} width={30} height={30} alt="fav" className={classes.heartImageStyles} />
        </div> */}
        <Image
          src={data?.poster || '/background.png'}
          alt="poster"
          width={250}
          height={370}
          className={classes.posterStyles}
        />
        <div style={{ padding: '10px' }}>
          <span className={classes.countryStyles}>
            {data?.countries[0]},{data?.released?.substr(0, 4) || 2023}
          </span>
          <h3 className={classes.titleStyles}>{data?.title}</h3>
          <div className={classes.ratingContainerStyles}>
            <div className={classes.ratingItemStyles}>
              <Image src={Imdb} width={35} height={17} alt="imdb" className={classes.img} />
              <span className={classes.rating}>{data?.imdb.rating}/10</span>
            </div>
            <div className={classes.ratingItemStyles}>
              <Image src={Tomato} alt="tomato" height={17} width={16} className={classes.tomatoImg} />
              <span className={classes.tomatoScore}>{data?.tomatoes?.viewer.rating}/5</span>
            </div>
          </div>
          <div className={classes.genreStyles}>
            {data?.genres?.map((genre: any, i: number) => (
              <>
                <span>{genre}</span>
                {i !== data?.genres.length - 1 && <span>, </span>}
              </>
            ))}
          </div>
        </div>
        </div>
    </Link>
  );
}
