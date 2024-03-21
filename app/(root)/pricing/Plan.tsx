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
      marginTop: '8%',
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
    },

    PlanCardStylesClicked: {
      background:
        'linear-gradient(45deg, rgba(43,10,53,1) 10%, rgba(143,60,205,1) 80%, rgba(43,10,53,1) 95%)',
      backdropFilter: 'blur(10px)',
      opacity: '0.7',
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

  const { classes } = useStyles();

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

  return (
    <>
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
              <Text>{label}</Text>
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
                <Text size="xl" fw={700}>
                  {name}
                </Text>
              </Box>
              <Box style={{ display: 'flex', flexDirection: 'row', paddingLeft: '4%' }}>
                <h3>${price}/</h3>
                <h5>{planInner[0] ? 'month' : planInner[1] ? 'quarter' : 'year'}</h5>
              </Box>
              <Box style={{ display: 'flex', flexDirection: 'column', paddingLeft: '3%' }}>
                <Text>. Lorem ipsum dolor sit amet</Text>
                <Text>. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                <Text>
                  . quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute{' '}
                </Text>
                <Text>. cillum dolore eu fugiat nulla pariatur</Text>
              </Box>
            </Box>
          ))}
        </Box>
        <Button style={{ color: 'white', background: '#5e2787', height: '3rem', width: '30%' }}>
          Continue with Plan
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
