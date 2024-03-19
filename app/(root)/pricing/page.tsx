import {
    TextInput,
    PasswordInput,
    Text,
    PaperProps,
    Button,
    Divider,
    Flex, Box
} from '@mantine/core';
import themeOptions from '../../../assets/themes/colors'

const Pricing = () => {
    return (
        <Box>
            <Box style={{ marginTop: '6rem', display: 'flex', flexDirection: 'row', height: '80vh' }} >
                <Box style={{
                    height: '100%',
                    backgroundImage: "url('gradient.png')",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '30%'
                }}>
                    <Box style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem', marginTop: '8rem', marginLeft: '4rem' }}>
                        <Text style={{ color: 'white', fontSize: '3.5rem', fontWeight: 'bold', lineHeight: '4.0rem', maxWidth: '30rem' }} >Watch without limits.</Text>
                        <Text style={{ color: themeOptions.color.textColorNormal, fontSize: '1.6rem', width: '80%' }} >Try our premium plans starting at just $5</Text>
                        <Button style={{ backgroundColor: '#7011B6', maxWidth: '8rem' }} >View All Plans</Button>
                        <Text size="0.6rem" c={'white'} >*Terms and Condition applied</Text>
                    </Box>
                </Box>
                <Box style={{
                    width: '70%', backgroundColor: 'black', height: '100%',
                    backgroundImage: "url('pricing.png'),url('gradient.png')",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}>
                </Box>
            </Box>
            <Box style={{ marginTop: '1rem', backgroundColor: 'red', height: '20rem' }} >

            </Box>
        </Box>

    );
}

export default Pricing;