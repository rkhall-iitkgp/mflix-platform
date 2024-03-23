'use client'
import React, { useState } from 'react';
import { SegmentedControl } from '@mantine/core';
import Chat from './components/chat';
import Settings from './components/settings';
import { Box } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import themeOptions from '@/utils/colors';
const useStyles = createStyles((theme, _params, getRef) => {
    //const child = getRef('child');

    return {
        body: {
            backgroundColor: "#0B0212",
            width: "25%",
            height: "100%"
        },
        header: {

        }


    };
});
const Page = () => {
    const { classes } = useStyles();
    const [selectedWord, setSelectedWord] = useState('code'); // Default selected value

    const handleWordSelection = (value: string) => {
        setSelectedWord(value);
        console.log(value);
    };

    return (
        <div className={classes.body}>
            <div style={{ display: 'flex' }}>
                <button
                    style={{ flex: 1, padding: '10px', backgroundColor: "#0B0212", color: '#ffffff', borderBottom: selectedWord === 'Chat' ? '2px solid #ffffff' : '1px solid #ffffff', border: "none", margin: 'none' }}
                    onClick={() => handleWordSelection('Chat')}
                >
                    Chat
                </button>
                <button
                    style={{ flex: 1, padding: '10px', backgroundColor: "#0B0212", borderBottom: selectedWord === 'Settings' ? '2px solid #ffffff' : '1px solid #ffffff', color: '#ffffff', border: "none", margin: 'none' }}
                    onClick={() => handleWordSelection('Settings')}
                >
                    Settings
                </button>
            </div>
            {selectedWord == 'Chat' && <Chat />}
            {selectedWord == 'Settings' && <Settings />}

        </div>


    );
}

export default Page;
