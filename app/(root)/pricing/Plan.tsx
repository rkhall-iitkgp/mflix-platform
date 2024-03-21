/* eslint-disable max-len */
'use client';

import React, { useState } from 'react';

import {
    TextInput,
    PasswordInput,
    Text,
    PaperProps,
    Button,
    Divider,
    Flex,
    Box,
} from '@mantine/core';
import { GoPlus } from 'react-icons/go';
import { createStyles } from '@mantine/styles';
import SubscriptionTables from './table';
import { List } from '@mantine/core';
import { SlArrowRight } from "react-icons/sl";


export default function Plan() {
    const useStyles = createStyles(() => ({
        OuterBoxStyles: {
            fontFamily: 'Poppins, cursive', // Applying Poppins font
            // backgroundImage: "url('background.png')",
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            marginTop: '4%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textWrap: 'wrap',
        },

        PlanBoxStyles: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            border: '2.5px solid #7012b6',
            width: '40%',
            height: '10%',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            marginTop: '1rem',

        },

        PlanInnerBoxStyles: {
            height: '100%',
            width: '100%',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

        },

        PlanInnerBoxStylesClicked: {
            height: '100%',
            width: '100%',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#7012b6',
        },

        CardOuterBoxStyles: {
            width: '100%',
            height: '600px',
            display: 'flex',
            marginTop: '5%',
            justifyContent: 'space-evenly',
            alignItem: 'center',
            flexDirection: 'row',
            color: 'white',

        },

        PlanCardStyles: {
            height: '85%',
            width: '25%',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'left',
            flexDirection: 'column',
            borderRadius: '15px',
            // backgroundColor:"white",
            // background: "linear-gradient(45deg, rgba(43,10,53,1) 10%, rgba(143,60,205,1) 80%, rgba(43,10,53,1) 95%)",
            border: '1.5px solid white',
            // backdropFilter:"blur(100px)",
            // boxShadow: '1rem 1rem white'
        },

        PlanCardStylesClicked: {
            background: "linear-gradient(45deg, rgba(43,10,53,1) 10%, rgba(143,60,205,1) 80%, rgba(43,10,53,1) 95%)",
            backdropFilter: "blur(10px)", opacity: "0.7",
            height: '85%',
            width: '25%',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'left',
            flexDirection: 'column',
            borderRadius: '15px',
            // backgroundColor:"white",
            // background: "linear-gradient(45deg, rgba(43,10,53,1) 10%, rgba(143,60,205,1) 80%, rgba(43,10,53,1) 95%)",
            border: '1.5px solid white',
            boxShadow: '0.8rem 0.8rem 0.4rem #512072'

            // backdropFilter:"blur(100px)",
        },

        PlanNameStyles: {
            paddingLeft: '1rem',
        },

        FormStyles: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
        },

        ErrorStyles: {
            color: 'red',
            fontSize: '0.9rem',
            marginTop: '5px',
            minHeight: '1.2rem',
            width: '70%',
        },
        QuestionStyles: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            border: '1.5px solid #7012b6',
            width: '90%',
            padding: '0.5rem',
        },
    }));



    const [planInner, setPlanInner] = useState([true, false, false]);
    const [cardPlan, setCardPlan] = useState([false, true, false]);
    const [isAccordion, setIsAccordion] = useState(false);

    const handleToggleAccordion = () => {
        setIsAccordion(!isAccordion);
    };
    const handlePlanInner = (index: number) => {
        const updatedPlanInner = Array(3).fill(false);
        updatedPlanInner[index] = true;
        setPlanInner(updatedPlanInner);
    };

    const handleCardPlan = (index: number) => {
        const updatedCardPlan = Array(3).fill(false);
        updatedCardPlan[index] = true;
        setCardPlan(updatedCardPlan);
    };

    const { classes } = useStyles();
    return (
        <>
            <SubscriptionTables cardPlan={cardPlan} />
            <Box className={classes.OuterBoxStyles}>
                <Box className={classes.PlanBoxStyles}>
                    {['Monthly', 'Quarterly', 'Annually'].map((label, index) => (
                        <Box
                            key={`planInner${index}`}
                            onClick={() => handlePlanInner(index)}
                            className={
                                planInner[index] ? classes.PlanInnerBoxStylesClicked : classes.PlanInnerBoxStyles
                            }
                        >
                            <Text style={{ fontSize: '1.5rem' }}>{label}</Text>
                        </Box>
                    ))}
                </Box>

                <Box className={classes.CardOuterBoxStyles}>
                    {[
                        ['Basic', 100],
                        ['Premium', 150],
                        ['Family', 200],
                    ].map(([name, price], index) => (
                        <Box
                            key={`cardPlan${index}`}
                            onClick={() => handleCardPlan(index)}
                            className={cardPlan[index] ? classes.PlanCardStylesClicked : classes.PlanCardStyles}
                        >
                            <Box className={classes.PlanNameStyles}>
                                <Text style={{ fontSize: '1.8rem' }} size="xl" fw={700}>
                                    {name}
                                </Text>
                            </Box>
                            <Box style={{ display: 'flex', flexDirection: 'row', paddingLeft: '4%' }}>
                                <h1>${price}/</h1>
                                <h3 style={{ marginTop: '2rem' }} >{planInner[0] ? 'month' : planInner[1] ? 'quarter' : 'year'}</h3>
                            </Box>
                            <Box style={{ display: 'flex', flexDirection: 'column', paddingLeft: '6%' }}>
                                <Text style={{ fontSize: '120%' }}>. Lorem ipsum dolor sit amet</Text>
                                <Text style={{ fontSize: '120%' }}>. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                                <Text style={{ fontSize: '120%' }} >
                                    . quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute{' '}
                                </Text>
                                <Text style={{ fontSize: '120%' }} >. cillum dolore eu fugiat nulla pariatur</Text>
                                {/* <List size="xl" style={{ paddingLeft: '1.5rem' }}>
                                    <List.Item style={{ maxWidth: '90%' }} >Lorem ipsum dolor sit amet</List.Item>
                                    <List.Item style={{ maxWidth: '90%' }}>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</List.Item>
                                    <List.Item style={{ maxWidth: '90%' }}>quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat. Duis aute</List.Item>
                                    <List.Item style={{ maxWidth: '90%' }}>cillum dolore eu fugiat nulla pariatu</List.Item>
                                </List> */}
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Button style={{ color: 'white', background: '#5e2787', height: '3rem', width: '50%', borderRadius: '1.1rem', fontSize: '1.3rem' }}>
                    Continue with Plan <SlArrowRight style={{ marginRight: '1.3rem' }}></SlArrowRight>
                </Button>
            </Box>
            <Box
                id="questions section"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '3rem',
                    fontFamily: 'poppins',
                    justifyContent: 'center',
                }}
            >
                <Box style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <Text style={{ fontSize: '2rem' }}>Questions?</Text>
                    <Text style={{}}>we got answers.</Text>
                </Box>
                <Box
                    id="question-answer"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Box
                        id="question"
                        style={{ display: 'flex', width: '80%', margin: '1rem auto' }}
                        onClick={handleToggleAccordion}
                    >
                        <Box className={classes.QuestionStyles} id="text part">
                            <Text style={{ margin: 'auto 1.5rem' }}>01</Text>
                            <Text style={{}}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. veniama. Lorem ipsum dolor
                                sit, amet consectetur{' '}
                            </Text>
                        </Box>

                        <Box style={{ minWidth: '5%' }} id="icon part">
                            <GoPlus
                                style={{
                                    color: 'white',
                                    backgroundColor: '#7012b6',
                                    fontSize: '1.5rem',
                                    height: '100%',
                                    width: '100%',
                                }}
                            />
                        </Box>
                    </Box>
                    <Box
                        id="answer"
                        style={{
                            display: `${isAccordion ? 'block' : 'none'}`,
                            width: '80%',
                            margin: '1rem auto',
                        }}
                    >
                        <Text>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis, impedit libero
                            explicabo autem similique beatae facilis magni ipsam molestias neque voluptates,
                            assumenda at numquam pariatur quasi eos! Non, sint odio!
                        </Text>
                    </Box>
                </Box>
                <Box
                    id="question-answer"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Box
                        id="question"
                        style={{ display: 'flex', width: '80%', margin: '1rem auto' }}
                        onClick={handleToggleAccordion}
                    >
                        <Box className={classes.QuestionStyles} id="text part">
                            <Text style={{ margin: 'auto 1.5rem' }}>01</Text>
                            <Text style={{}}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. veniama. Lorem ipsum dolor
                                sit, amet consectetur{' '}
                            </Text>
                        </Box>

                        <Box style={{ minWidth: '5%' }} id="icon part">
                            <GoPlus
                                style={{
                                    color: 'white',
                                    backgroundColor: '#7012b6',
                                    fontSize: '1.5rem',
                                    height: '100%',
                                    width: '100%',
                                }}
                            />
                        </Box>
                    </Box>
                    <Box
                        id="answer"
                        style={{
                            display: `${isAccordion ? 'block' : 'none'}`,
                            width: '80%',
                            margin: '1rem auto',
                        }}
                    >
                        <Text>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis, impedit libero
                            explicabo autem similique beatae facilis magni ipsam molestias neque voluptates,
                            assumenda at numquam pariatur quasi eos! Non, sint odio!
                        </Text>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
