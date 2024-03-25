import { TiTick } from 'react-icons/ti';
import themeOptions from '@/utils/colors';

const CustomTickIcon = () => {
    return <TiTick style={{ color: 'black', backgroundColor: themeOptions.color.textColorNormal, fontSize: '1.5rem', borderRadius: '2rem' }} />;
};

export default CustomTickIcon;
