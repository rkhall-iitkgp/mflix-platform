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
        <Box style={{ marginTop: '6rem', display: 'flex', flexDirection: 'row', height: '80vh', backgroundColor: 'red' }} >
            <Box style={{ width: '30%', backgroundColor: 'blue' }}>
                <Box style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
                    <Text size="3.5rem" c={'white'} >Watch without limits.</Text>
                    <Text size="1.2rem" c={'white'} >Try our premium plans starting at just $5</Text>
                    <Button style={{ backgroundColor: '#7011B6', maxWidth: '8rem' }} >View All Plans</Button>
                    <Text size="0.6rem" c={'white'} >*Terms and Condition applied</Text>
                </Box>
            </Box>
        </Box>
    );
}

export default Pricing;