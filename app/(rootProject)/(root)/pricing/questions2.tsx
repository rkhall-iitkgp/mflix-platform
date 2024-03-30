import React, { useState } from 'react';
import { Box, Text } from '@mantine/core';
import { GoPlus, GoX } from 'react-icons/go';
import { createStyles } from '@mantine/styles';
import plus from '@/assets/icons/plus.svg';
import Image from 'next/image';
const questions = [
  {
      value: '01',
      question: 'How are you doing? I hope you are doing well',
      answer: 'Actually, I am not just doing well, I am doing great! Also, I got a new job, I am so happy.',
  },
  {
      value: '02',
      question: 'Now tell me, what is your salary?',
      answer: 'I am sorry, I cannot tell you that. It is confidential.',
  },
];
const Questions2 = () => {
  const [accordionStates, setAccordionStates] = useState(Array(questions.length).fill(false)); // Assuming 2 questions initially

  const handleToggleAccordion = (index: number): void => {
    setAccordionStates(prevStates => {
      const newAccordionStates = prevStates.map((state, i) => i === index ? !state : false);
      return newAccordionStates;
    });
  };
  

    const useStyles = createStyles((theme) => ({
      AccordionControl: {
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '80vw',
        //  border: '1px solid #00664A',
        borderBottom: '1px solid black',
         background:'rgba(45 ,45 ,45 , 0.8)',
         padding: '0 ',
         
          '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgb(45 ,45 ,45 )',
        },
      },
      QuestionTextStyles: {
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          border: '1.5px solid #00664A',
          width: '95%',
          padding: '1rem',
          color: theme.white,
          backgroundColor: 'transparent',
      },
      AnswerStyles: {
        textAlign: 'center',
          width: '80%',
          margin: '0.1rem auto',
          padding: '1rem',
          transition : 'transform 0.3s ease-in-out',
      },
      Chevron: {
        '[data-open]': {
          transform: 'rotate(45deg)',
        },
        transition: 'transform 0.3s ease',
        marginRight: '-1rem',
      },
  
      Icon: {
          width: '2rem',
          height: '2rem',
          margin: 'auto 0rem auto -2.5rem',
          padding: '0.5rem',
          color: theme.white,
      },
      Root: {
          backgroundColor: theme.black,
      },
      AccordionItem: {
        
         
         
      },
  }));

  const { classes } = useStyles();

  return (
    <>
      {accordionStates.map((isAccordion, index) => (
        <Box
          key={index}
          id={`question-answer-${index}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            margin:'0.3rem auto',
          }}
        >
          <Box
            id={`question-${index}`}
            style={{ display: 'flex', width: '80%', margin: '1rem auto 0 auto', borderRadius:'0.3rem' }}
            onClick={() => handleToggleAccordion(index)}
          >
            <Box className={classes.AccordionControl} id={`text-part-${index}`}>
              <Text style={{ margin: 'auto 1.5rem' }}>{questions[index].value}</Text>
              <Text style={{}}>{questions[index].question}</Text>
            </Box>

            <Box style={{ minWidth: '5%' }} id={`icon-part-${index}`}>
              <GoPlus
                style={{
                  color: 'white',
                  backgroundColor: '#00664A',
                  borderRadius:'.1rem',
                  padding:'1rem',
                  fontSize: '1.5rem',
                  height: '100%',
                  width: '100%',
                  cursor: 'pointer',
                  display: isAccordion ? 'none' : 'block',
                }}
              />
              <GoX
                style={{
                  color: 'white',
                  backgroundColor: '#00664A',
                  fontSize: '1rem',
                  borderRadius:'.1rem',
                  padding:'1rem',
                  height: '100%',
                  width: '100%',
                  cursor: 'pointer',
                  display: isAccordion ? 'block' : 'none',
                }}
              />
            </Box>
          </Box>
          <Box id={`answer-${index}`} style={{ display: isAccordion ? 'block' : 'none', width: '80%', margin: '0 auto 1rem auto' , background:'#2d2d2d',borderRadius:'0.2rem' , padding:'1rem' }}>
            <Text style={{padding:'0.4rem'}}>{questions[index].answer} 
           </Text>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Questions2;
