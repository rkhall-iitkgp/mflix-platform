import { Table, Text, Box, Divider } from '@mantine/core';
import { TiTick } from "react-icons/ti";
import CustomTickIcon from './customtickicon'; // 
import themeOptions from '@/utils/colors';



const SubscriptionTable = () => {
    const subscriptionData = [
        {
            feature: 'Access to all movies',
            free: '---',
            basic: <CustomTickIcon />,
            premium: <CustomTickIcon />,
            family: <CustomTickIcon />,
        },
        {
            feature: 'Streaming quality',
            free: <span style={{ color: themeOptions.color.textColorNormal }}>480p</span>,
            basic: <span style={{ color: themeOptions.color.textColorNormal }}>720p</span>,
            premium: <span style={{ color: themeOptions.color.textColorNormal }}>1080p</span>,
            family: <span style={{ color: themeOptions.color.textColorNormal }}>2160p(4K)</span>,
        },
        {
            feature: 'Party Watch',
            free: '---',
            basic: '---',
            premium: <CustomTickIcon />,
            family: <CustomTickIcon />,
        },
        // Add more features here
    ];

    return (
        <Box style={{ marginTop: '1rem', backgroundColor: 'black', height: '25rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
            <Text size="2.8rem" c={'white'} p={'1rem'} style={{ fontWeight: '600', paddingTop: '3rem' }}>Feel the difference</Text>
            <Text size="1.5rem" c={'white'} style={{ fontWeight: '400' }}>Explore our different plans to enjoy your watch experience</Text>
            <Table style={{ width: '50%' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', color: themeOptions.color.textColorNormal }}>What You will get</th>
                        <th style={{ textAlign: 'center' }}>Free</th>
                        <th style={{ textAlign: 'center' }}>Basic</th>
                        <th style={{ textAlign: 'center' }}>Premium</th>
                        <th style={{ textAlign: 'center' }}>Family</th>
                    </tr>
                    <tr>
                        <td colSpan={5}><Divider /></td>
                    </tr>
                    {/* {index < subscriptionData.length - 1 && (
                    )} */}
                </thead>
                <tbody>
                    {subscriptionData.map((row, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: 'left' }}>{row.feature}</td>
                            <td style={{ textAlign: 'center' }}><Text>{row.free}</Text></td>
                            <td style={{ textAlign: 'center' }}><Text>{row.basic}</Text></td>
                            <td style={{ textAlign: 'center' }}><Text>{row.premium}</Text></td>
                            <td style={{ textAlign: 'center' }}><Text>{row.family}</Text></td>
                        </tr>

                    ))}
                </tbody>
            </Table>


        </Box>
    );
};

export default SubscriptionTable;
