import React from 'react';
import { Accordion, Box, Text } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import { IconPlus } from '@tabler/icons-react';

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

function Questions() {
    const useStyles = createStyles((theme) => ({
        AccordionControl: {
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80vw',
           border: '1px solid #00664A',
           padding: '0 ',
           '&:hover': {
            backgroundColor: 'transparent',
            color: theme.white,
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
            width: '80%',
            margin: '0.1rem auto',
            padding: '1rem',
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

    const items = questions.map((question) => (
        <Accordion.Item key={question.value} value={question.question} className={classes.AccordionItem}>
            <Accordion.Control className={classes.AccordionControl}>
                <Box className={classes.QuestionTextStyles} id="text part">
                    <Text style={{ margin: 'auto 1rem' }}>{question.value}</Text>
                    <Text>{question.question}</Text>
                </Box>
            </Accordion.Control>
            <Accordion.Panel className={classes.AnswerStyles}>
                {question.answer}
            </Accordion.Panel>
        </Accordion.Item>
    ));

    return (
        <Accordion
            transitionDuration={300}
            classNames={{ chevron: classes.Chevron, root: classes.Root }}
            chevron={<IconPlus className={classes.Icon} />}
        >
            {items}
        </Accordion>
    );
}

export default Questions;
