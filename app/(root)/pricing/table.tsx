import { Table, TableTd, TableTh, TableTr, Text, Box, Divider, Stack, Group } from '@mantine/core';
import { TiTick } from "react-icons/ti";
import CustomTickIcon from './customtickicon'; // 
import themeOptions from '@/utils/colors';
import React from 'react';


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
            <Text size="1.2rem" c={'white'} style={{ fontWeight: '400' }}>Explore our different plans to enjoy your watch experience</Text>
            <Table style={{ width: '40%', marginTop: '2rem', height: '40%' }}>
                <thead>
                    <TableTr >
                        <TableTh style={{ width: '30%', textAlign: 'left', color: themeOptions.color.textColorNormal, fontSize: '1.2rem' }}>What You will get</TableTh>
                        <TableTh style={{ textAlign: 'center', width: '20%', fontSize: '1.1rem' }}>Free</TableTh>
                        <TableTh style={{ textAlign: 'center', width: '20%', fontSize: '1.1rem' }}>Basic</TableTh>
                        <TableTh style={{ textAlign: 'center', width: '20%', fontSize: '1.1rem' }}>Premium</TableTh>
                        <TableTh style={{ textAlign: 'center', width: '20%', fontSize: '1.1rem' }}>Family</TableTh>
                    </TableTr>
                </thead>
                <tbody>
                    {subscriptionData.map((row, index) => (
                        <React.Fragment key={index}>
                            <TableTr >
                                <TableTd style={{ textAlign: 'left', fontSize: "1rem" }} >{row.feature}</TableTd>
                                <TableTd style={{ textAlign: 'center', }}><Text fz={themeOptions.fontSize.s}>{row.free}</Text></TableTd>
                                <TableTd style={{ textAlign: 'center', }}><Text fz={themeOptions.fontSize.s}>{row.basic}</Text></TableTd>
                                <TableTd style={{ textAlign: 'center', }}><Text fz={themeOptions.fontSize.s}>{row.premium}</Text></TableTd>
                                <TableTd style={{ textAlign: 'center', }}><Text fz={themeOptions.fontSize.s}>{row.family}</Text></TableTd>
                            </TableTr>
                        </React.Fragment>
                    ))}
                </tbody>
            </Table>
        </Box>
    );
};

export default SubscriptionTable;
