import  Image from 'next/image';
import Heart from '@/assets/images/heart.svg';
import Poster from '@/assets/images/poster.jpeg';
import Imdb from '@/assets/images/imdb.png';
import Tomato from '@/assets/images/tomato.png';

const containerStyles = {
  marginRight: '40px',
  width: '250px',
  height: '480px',
  overflow: 'hidden',
};

const heartContainerStyles = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  flexDirection: 'row',
  position: 'absolute',
  width: '15rem',
  marginTop: '0.75rem',
};

const heartImageStyles = {
  alignSelf: 'flex-end',
  backgroundColor: '#F3F4F6',
  left: '48px',
  border: '2px solid',
  padding: '1px',
  borderRadius: '50%',
};

const posterStyles = {
  width: '20.75rem',
};

const countryStyles = {
  color: '#9CA3AF',
  fontWeight: 'bold',
  marginTop: '0.0625rem',
};

const titleStyles = {
  color: '#000',
  fontSize: '1.125rem',
  fontWeight: 'bold',
  marginTop: '0.0625rem',
};

const ratingContainerStyles = {
  textAlign: 'left',
  display: 'flex',
  justifyContent: 'space-between',
};

const ratingItemStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '0.0625rem',
};

const genreStyles = {
  marginTop: '0.0625rem',
  color: '#9CA3AF',
  fontWeight: 'bold',
};

export default function MovieCard() {
  return (
    <div style={containerStyles}>
      <div style={heartContainerStyles}>
        <Image src={Heart} width={30} height={30} alt='fav' style={heartImageStyles} />
      </div>
      <Image src={Poster} alt='poster' width={250} height={370} style={posterStyles} />
      <span style={countryStyles}>USA, 2016- Current</span>
      <h3 style={titleStyles}>Movie Title</h3>
      <div style={ratingContainerStyles}>
        <div style={ratingItemStyles}>
          <Image src={Imdb} width={35} height={17} alt='imdb' style={{ display: 'inline' }} />
          <span style={{ marginLeft: '0.5rem', marginBottom: '0' }}>8.6/10</span>
        </div>
        <div style={ratingItemStyles}>
          <Image src={Tomato} alt='tomato' height={17} width={16} style={{ marginRight: '0.5rem' }} />
          <span style={{ marginBottom: '0' }}>96%</span>
        </div>
      </div>
      <div style={genreStyles}>
        <span>Action, Adventure / Horror</span>
      </div>
    </div>
  );
}
