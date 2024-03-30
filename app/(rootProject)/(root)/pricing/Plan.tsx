/* eslint-disable max-len */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import Mixpanel from '@/components/Mixpanel';
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
            border: '2.5px solid #00664A',
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
            backgroundColor: '#00664A',
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
            background: "linear-gradient(45deg, rgba(43,10,53,1) 5%, rgba(143,60,205,0.7) 100%, rgba(43,10,53,1) 10%)",
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
            background: 'linear-gradient(45deg, rgba(43,10,53,1) 5%, rgba(143,60,205,0.7) 88%, rgba(43,10,53,1) 10%)',
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
            border: '1.5px solid #00664A',
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
    const [selected, setSelected] = useState(1);
    const [time, setTime] = useState(0);
    const [isAccordion, setIsAccordion] = useState(false);
    const [pricing, setPricing] = useState<any>([{}])
    const [renewal, setRenewal] = useState(["MONTHLY", "QUATERLY", "ANNUALLY"]);
    const [multiplier, setMultiplier] = useState([1, 4, 12]);

    const [details, setDetails] = useState([
        ['Basic', 0],
        ['Premium', 0],
        ['Family', 0,]
    ]);
    const handleToggleAccordion = () => {
        setIsAccordion(!isAccordion);
    };
    const handlePlanInner = (index: number) => {
        const updatedPlanInner = Array(3).fill(false);
        updatedPlanInner[index] = true;
        setPlanInner(updatedPlanInner);
        setTime(index);
        console.log(index);
    };

    const handleCardPlan = (index: number) => {
        const updatedCardPlan = Array(3).fill(false);
        updatedCardPlan[index] = true;
        setCardPlan(updatedCardPlan);
        setSelected(index);
        console.log(pricing[3 - index]._id)
        console.log(index);
    };

    const getPlanDetails = async () => {
        console.log(process.env.URL)
        let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/details`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        let jsonData = await res.json();
        if (!res.ok) {
            console.log(jsonData);
        } else {
            console.log(jsonData);
            setPricing(jsonData);
            const data = [
                ['Basic', jsonData[3].price],
                ['Premium', jsonData[2].price],
                ['Family', jsonData[1].price],
            ]
            setDetails(data)
            console.log(data);
        }

    }
    useEffect(() => {
        getPlanDetails();
    }, []);



    const handlePayment = async () => {
        const user = useLoginStore.getState(); // Get the user state using the custom hook
        const stripe = await loadStripe(
            "pk_test_51OwRpwSASkdZxsIqXKWoP1T43rb18l2uzbTTyRVir3EqBfEmPtYPdnAbdVJhYMS1J2tI6fcsL0ONXci5ASXFooH5000LfOfEKr"
        );
        if (user.email) {
            //const authToken = localStorage.getItem('authToken');

            // Make the API call with the authentication token in the headers
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/create-checkout-session`, {
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
                        renewalType: renewal[time],
                        tierId: pricing[3 - selected]._id,
                    },
                    redirectURL: process.env.NEXT_PUBLIC_BACKEND_URL,
                }),
                credentials: 'include',
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
                if (user._id) Mixpanel.identify(user?._id)
                Mixpanel.track("New Payment", {
                    renewalType: renewal[time],
                    tierId: pricing[3 - selected]._id,
                    $email: user.email,
                    PaymentMethod: "Credit Card",
                });

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
                {/* <Box className={classes.PlanBoxStyles} ref={containerRef}> */}
                <Box className={classes.PlanBoxStyles}>
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
                    {details.map(([name, price], index) => (
                        <Box
                            style={{ cursor: 'pointer' }}
                            key={`cardPlan${index}`}
                            onClick={() => handleCardPlan(index)}
                            className={cardPlan[index] ? classes.PlanCardStylesClicked : classes.PlanCardStyles}
                        >
                            {/* <Box className={classes.PlanNameStyles}> */}
                            <Box >
                                <Text style={{ fontSize: '1.8rem', textAlign: 'center' }} size="xl" fw={700}>
                                    {name}
                                </Text>
                            </Box>
                            <Box className={classes.PriceStyles}>
                                <h1>${(price as number) * multiplier[time]}/</h1>
                                <h3 style={{ marginTop: '2rem' }} >{planInner[0] ? 'month' : planInner[1] ? 'quarter' : 'year'}</h3>
                            </Box>
                            <Box className={classes.SubscriptionDetailsStyles}>

                                <Text style={{ fontSize: '120%', alignItems: 'center', display: 'flex', margin: '0.5rem' }}><IconPointFilled></IconPointFilled>{String(name) === 'Basic' ? 'Access to Free Movies only' : String(name) === 'Premium' ? 'Access to All movies' : 'Access to All Movies'} </Text>
                                <Text style={{ fontSize: '120%', alignItems: 'center', display: 'flex', margin: '0.5rem' }}><IconPointFilled></IconPointFilled>{String(name) === 'Basic' ? 'Streaming quality: 720p' : String(name) === 'Premium' ? 'Streaming quality: 1080p HD' : 'Streaming quality : 2140p 4K'} </Text>
                                <Text style={{ fontSize: '120%', alignItems: 'center', display: 'flex', margin: '0.5rem' }}><IconPointFilled></IconPointFilled>{String(name) === 'Basic' ? 'Party watch not available' : String(name) === 'Premium' ? 'Can Binge Watch with Friends' : 'Can Binge Watch with Friends'} </Text>

                            </Box>
                        </Box>
                    ))}
                </Box>
                <Button style={{ color: 'white', background: '#00664A', height: '3.6rem', width: '50%', borderRadius: '1.1rem', fontSize: '1.3rem', }} onClick={() => { handlePayment() }}>
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
