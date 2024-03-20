"use client"

import {
    TextInput,
    PasswordInput,
    Text,
    PaperProps,
    Button,
    Divider,
    Flex, Box
} from '@mantine/core';
import themeOptions from '@/utils/colors';
import { Accordion } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import classes from './Demo.module.css';

const groceries = [
    {
        emoji: '🍎',
        value: 'Apples',
        description:
            'Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.',
    },
    {
        emoji: '🍌',
        value: 'Bananas',
        description:
            'Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.',
    },
    {
        emoji: '🥦',
        value: 'Broccoli',
        description:
            'Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.',
    },
];


function Demo() {
    const items = groceries.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
            <Accordion.Control icon={item.emoji} disabled={item.value === 'Bananas'}>
                {item.value}
            </Accordion.Control>
            <Accordion.Panel>{item.description}</Accordion.Panel>
        </Accordion.Item>
    ));
}
const Questions = () => {
    return (
        <Box style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

            <Text style={{ color: 'white', fontSize: themeOptions.fontSize.l, fontWeight: 'bold' }} >Questions ?</Text>
            <Text style={{ fontSize: themeOptions.fontSize.s }} >We got answers.</Text>
            <Accordion
                defaultValue="Apples"
                classNames={{ chevron: classes.chevron }}
                chevron={<IconPlus className={classes.icon} />}
            >
                {items}
            </Accordion>
        </Box>
    );
}

export default Questions;