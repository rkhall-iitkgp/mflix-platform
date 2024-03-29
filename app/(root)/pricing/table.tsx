import { Table, TableTd, TableTh, TableTr, Text, Box, Divider, Stack, Group } from '@mantine/core';
import { TiTick } from "react-icons/ti";
import CustomTickIcon from './customtickicon'; // 
import themeOptions from '@/utils/colors';
import React, { useRef } from 'react';
import { createStyles } from '@mantine/styles';



const SubscriptionTable = ({ cardPlan }: any) => {
    const useStyles = createStyles(() => ({
        OuterBoxStyles: {
            marginTop: '1rem', backgroundColor: 'black', height: '25rem', display: 'flex', flexDirection: 'column', alignItems: 'center'
        },
        TableStyles: {
            width: '60% !important', marginTop: '3rem', height: '60% !important'
        },
        SpanStyles: {
            color: themeOptions.color.textColorNormal
        },
        TableThFirstStyles: {
            width: '30%', textAlign: 'left', color: themeOptions.color.textColorNormal, fontSize: '1.2rem'
        },
        TableThRestStyles: {
            textAlign: 'center', width: '15%', fontSize: '1.1rem '
        },
        FeatureStyles: {
            textAlign: 'left', fontSize: "1.1rem"
        },
        FreePlanStyles: {
            textAlign: 'center'
        },
        BasicPlanStyles: {
            textAlign: 'center', background: cardPlan[0] === false ? 'none' : 'linear-gradient(0deg, rgba(112, 17, 182, 0.15), rgba(112, 17, 182, 0.15)), linear-gradient(321.23deg, rgba(112, 17, 182, 0.2) 5.98%, rgba(0, 0, 0, 0) 66.28%)'

        },
        PremiumPlanStyles: {
            textAlign: 'center', background: cardPlan[1] === false ? 'none' : 'linear-gradient(0deg, rgba(112, 17, 182, 0.15), rgba(112, 17, 182, 0.15)), linear-gradient(321.23deg, rgba(112, 17, 182, 0.2) 5.98%, rgba(0, 0, 0, 0) 66.28%)'

        },
        FamilyPlanStyles: {
            textAlign: 'center', background: cardPlan[2] === false ? 'none' : 'linear-gradient(0deg, rgba(112, 17, 182, 0.15), rgba(112, 17, 182, 0.15)), linear-gradient(321.23deg, rgba(112, 17, 182, 0.2) 5.98%, rgba(0, 0, 0, 0) 66.28%)'

        }
    }));
    const { classes } = useStyles();
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
        <Box style={{ marginTop: '1rem', backgroundColor: 'black', height: '25rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }} id='pricing'>
            <Text size="2.8rem" c={'white'} p={'1rem'} style={{ fontWeight: '600', paddingTop: '3rem' }}>Feel the difference</Text>
            <Text size="1.2rem" c={'white'} style={{ fontWeight: '400' }}>Explore our different plans to enjoy your watch experience</Text>
            <Table classNames={{
                table: classes.TableStyles
            }}  >
                <thead>
                    <TableTr >
                        <TableTh className={classes.TableThFirstStyles}>What You will get</TableTh>
                        <TableTh className={classes.TableThRestStyles}>Free</TableTh>
                        <TableTh className={classes.TableThRestStyles}>Basic</TableTh>
                        <TableTh className={classes.TableThRestStyles}>Premium</TableTh>
                        <TableTh className={classes.TableThRestStyles}>Family</TableTh>
                    </TableTr>
                </thead>
                <tbody>
                    {subscriptionData.map((row, index) => (
                        <React.Fragment key={index}>
                            <TableTr >
                                <TableTd className={classes.FeatureStyles} >{row.feature}</TableTd>
                                <TableTd className={classes.FreePlanStyles} ><Text fz={themeOptions.fontSize.s}>{row.free}</Text></TableTd>
                                <TableTd className={classes.BasicPlanStyles}><Text fz={themeOptions.fontSize.s}>{row.basic}</Text></TableTd>
                                <TableTd className={classes.PremiumPlanStyles} ><Text fz={themeOptions.fontSize.s}>{row.premium}</Text></TableTd>
                                <TableTd className={classes.FamilyPlanStyles}  ><Text fz={themeOptions.fontSize.s}>{row.family}</Text></TableTd>
                            </TableTr>
                        </React.Fragment>
                    ))}
                </tbody>
            </Table>
        </Box>
    );
};

export default SubscriptionTable;