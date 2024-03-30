/* eslint-disable max-len */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import {
    TextInput,
    PasswordInput,
    Text,
    PaperProps,
    Button,
    Divider,
    Flex,
    Box,
    Accordion,
} from '@mantine/core';
import { GoPlus } from 'react-icons/go';
import { createStyles } from '@mantine/styles';
import Questions from './questions';
import Questions2 from './questions2';
import SubscriptionTables from './table';
import { List } from '@mantine/core';
import { SlArrowRight } from "react-icons/sl";
import useLoginStore from '@/Stores/LoginStore';
import { IconPoint, IconPointFilled } from '@tabler/icons-react';
import themeOptions from '@/utils/colors';


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
            border: `2.5px solid ${themeOptions.color.button}`,
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
            backgroundColor: themeOptions.color.button,
        },

        CardOuterBoxStyles: {
            width: '100%',
            height: '600px',
            display: 'flex',
            marginTop: '5%',
            justifyContent: 'space-evenly',
            alignItem: 'center',
            flexDirection: 'row',
            color: themeOptions.color.divider,

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
            background: "linear-gradient(45deg, #014331 5%, #0D8766 100%, #022B1F 10%)",
            border: '1.5px solid white',
            padding: '1rem',
            // backdropFilter:"blur(100px)",
            boxShadow: '8px 8px 25px rgba(255, 255, 255, 0)',
        },

        PlanCardStylesClicked: {
            // background: "linear-gradient(to left bottom, #36005f, #522e6e, #4d246e, #4b1572, #3e1959)",
            // backdropFilter: "blur(10px)", opacity: "0.7",
            height: '90%',
            width: '25%',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'left',
            flexDirection: 'column',
            borderRadius: '15px',
            // backgroundColor:"white",
            // background: "linear-gradient(45deg, rgba(43,10,53,1) 10%, rgba(143,60,205,1) 80%, rgba(43,10,53,1) 95%)",
            background: 'linear-gradient(45deg, #014331 5%, #0D8766 88%, #022B1F 10%)',
            border: '1.5px solid white',
            boxShadow: '10px 10px 25px rgba(150, 150, 255, 0.5)',

            // backdropFilter:"blur(100px)",
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
            border: `1.5px solid ${themeOptions.color.button}`,
            width: '90%',
            padding: '0.5rem',
        },
        PriceStyles: {
            display: 'flex', flexDirection: 'row', paddingLeft: '4%'
        },
        SubscriptionDetailsStyles: {
            display: 'flex', flexDirection: 'column', paddingLeft: '6%'
        },
        ArrowStyles: {
            // marginRight: '1.1rem'
            marginLeft: '1.1rem'
        },
        QuestionSectionStyles: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '3rem',
            fontFamily: 'poppins',
            justifyContent: 'center',
        },
        QuestionTextBoxStyles: {
            marginBottom: '2rem', textAlign: 'center', width: '100vw'
        }
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
    const handlePayment = async () => {
        const user = useLoginStore.getState(); // Get the user state using the custom hook
        const stripe = await loadStripe(
            "pk_test_51OwRpwSASkdZxsIqXKWoP1T43rb18l2uzbTTyRVir3EqBfEmPtYPdnAbdVJhYMS1J2tI6fcsL0ONXci5ASXFooH5000LfOfEKr"
        );
        if (user.email) {
            //const authToken = localStorage.getItem('authToken');

            // Make the API call with the authentication token in the headers
            const response = await fetch(`${process.env.URL}/payment/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Include any other required data in the request body
                    user: {
                        id: user._id,
                        email: user.email
                    },
                    product: {
                        renewalType: "MONTHLY",
                        tierId: "kjwnfkjnslk",

                    },
                    redirectURL: process.env.FRONTEND_URL,
                }),
            });

            // const data = await response.json();

            if (response.ok) {
                const session = await response.json();
                console.log("session id", session);
                const result = await stripe?.redirectToCheckout({
                    sessionId: session.session.id,
                });

                if (result?.error) {
                    console.log(result?.error, 'error with response');
                }
            } else {
                // Handle error response
                console.error('Error:');
            }
        } else {
            // User does not exist, handle this case
            // For demonstration purposes, I'm just logging a message here
            alert('User does not exist. Cannot process payment.');
        }
    }
    const subscriptionTablesRef = useRef(null);



    const { classes } = useStyles();
    return (
        <>
            <SubscriptionTables ref={subscriptionTablesRef} cardPlan={cardPlan} />
            <Box className={classes.OuterBoxStyles}>
                <Box className={classes.PlanBoxStyles} ref={containerRef}>
                    {['Monthly', 'Quarterly', 'Annually'].map((label, index) => (
                        <Box
                            key={`planInner${index}`}
                            onClick={() => handlePlanInner(index)}
                            style={{ cursor: 'pointer' }}
                            className={
                                planInner[index] ? classes.PlanInnerBoxStylesClicked : classes.PlanInnerBoxStyles
                            }
                        >
                            <Text style={{ fontSize: '1.5rem', textAlign: 'center' }}>{label}</Text>
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
                            style={{ cursor: 'pointer' }}
                            key={`cardPlan${index}`}
                            onClick={() => handleCardPlan(index)}
                            className={cardPlan[index] ? classes.PlanCardStylesClicked : classes.PlanCardStyles}
                        >
                            <Box className={classes.PlanNameStyles}>
                                <Text style={{ fontSize: '1.8rem', textAlign: 'center' }} size="xl" fw={700}>
                                    {name}
                                </Text>
                            </Box>
                            <Box className={classes.PriceStyles}>
                                <h1>${price}/</h1>
                                <h3 style={{ marginTop: '2rem' }} >{planInner[0] ? 'month' : planInner[1] ? 'quarter' : 'year'}</h3>
                            </Box>
                            <Box className={classes.SubscriptionDetailsStyles}>

                                <Text style={{ fontSize: '120%', alignItems: 'center', display: 'flex', margin: '0.5rem' }}><IconPointFilled></IconPointFilled>{name === 'Basic' ? 'Access to Free Movies only' : name === 'Premium' ? 'Access to All movies' : 'Access to All Movies'} </Text>
                                <Text style={{ fontSize: '120%', alignItems: 'center', display: 'flex', margin: '0.5rem' }}><IconPointFilled></IconPointFilled>{name === 'Basic' ? 'Streaming quality: 720p' : name === 'Premium' ? 'Streaming quality: 1080p HD' : 'Streaming quality : 2140p 4K'} </Text>
                                <Text style={{ fontSize: '120%', alignItems: 'center', display: 'flex', margin: '0.5rem' }}><IconPointFilled></IconPointFilled>{name === 'Basic' ? 'Party watch not available' : name === 'Premium' ? 'Can Binge Watch with Friends' : 'Can Binge Watch with Friends'} </Text>

                            </Box>
                        </Box>
                    ))}
                </Box>
                <Button style={{ color: 'white', background: themeOptions.color.button, height: '3.6rem', width: '50%', borderRadius: '1.1rem', fontSize: '1.3rem', }}>
                    Continue with Plan <SlArrowRight className={classes.ArrowStyles}></SlArrowRight>
                </Button>
            </Box>
            <Box
                id="questions section"

                className={classes.QuestionSectionStyles}
            >
                <Box className={classes.QuestionTextBoxStyles}>
                    <Text style={{ fontSize: '2rem' }}>Questions?</Text>
                    <Text style={{}}>we got answers.</Text>
                    <Questions2 />
                </Box>
            </Box>
        </>
    );
}
