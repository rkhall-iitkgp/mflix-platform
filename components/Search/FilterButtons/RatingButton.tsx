'use client';

import { useState, useEffect } from 'react';
import { UnstyledButton, Menu, Group } from '@mantine/core';
// import images from './images';

import { createStyles } from '@mantine/styles';
import themeOptions from '../../../utils/colors';

const useStyles = createStyles(() =>
//const child = getRef('child');

({
    control: {
        boxSizing: 'border-box',
        borderRadius: 'var(--mantine-radius-md)', // Use radius from themeOptions
        border: `1px solid ${themeOptions.color.insideTextColor}`, // Use divider color from themeOptions
        backgroundColor: themeOptions.color.button, // Use largeBox color from themeOptions
        width: '90%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '2px',
        paddingBottom: '2px',
        paddingRight: '8px',
        paddingLeft: '10px',
        // transition: 'backgroundColor 150ms ease',
    },
    type: {
        fontSize: '18px', // Use font size from themeOptions
        fontWeight: 400, // Use font weight from themeOptions
        lineHeight: '30px',
        letterSpacing: '0em',
        textAlign: 'left',
        color: themeOptions.color.divider, // Use textColorNormal color from themeOptions
    },

    visible: {
        opacity: '1',
        transform: 'translateY(0)', // Move down to its original position
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out', /* Adjust timing and easing as needed */
    },
    hidden: {
        opacity: '0',
        transform: 'translateY(-10px)', // Move up slightly when hidden
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out', /* Adjust timing and easing as needed */
        pointerEvents: 'none', /* Prevent interaction while hidden */
    },
})
);

// interface TypeButtonProps {
//     data: ItemType[];
// }
export function RatingButton() {
    const { classes } = useStyles();
    const [opened, setOpened] = useState(false);
    const [selected, setSelected] = useState('');
    const [visible, setVisible] = useState(false);
    const [firstNumber, setFirstNumber] = useState('');
    const [secondNumber, setSecondNumber] = useState('');

    const handleFirstInputChange = (event: any) => {
        setFirstNumber(event.target.value);
    };

    const handleSecondInputChange = (event: any) => {
        setSecondNumber(event.target.value);
    };
    const handleInputChange = (event: any) => {
        setSelected(event.target.value);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 50); // Adjust the delay as needed
        return () => clearTimeout(timer); // Clear timeout on component unmount
    }, [opened]);

    return (
        <Menu
            onOpen={() => setOpened(true)}
            radius="md"
            width="target"
            withinPortal
        >
            <Menu.Target>
                <div className={`${classes.control} ${visible ? classes.visible : classes.hidden}`}>
                    <UnstyledButton className={classes.control}>
                        <Group gap="xs">
                            {/* <Image src={selected.image} width={22} height={22} /> */}
                            <div style={{ display: 'flex', alignItems: 'start' }}>
                                <span style={{ fontSize: '18px', fontWeight: '400', lineHeight: '30px', letterSpacing: '0em', textAlign: 'left', color: '#ffffff' }}>Rating:</span>
                                <div style={{ display: 'flex', gap: '5%', paddingLeft: '20px', paddingTop: '6px' }}>
                                    <input
                                        style={{ width: '50%', height: '20px', fontSize: '18px', fontWeight: '400', lineHeight: '30px', letterSpacing: '0em', textAlign: 'left', color: '#00664A', backgroundColor: themeOptions.color.button, outline: 'none', borderRadius: '5px', }}
                                        type="number"
                                        min={0}
                                        max={10}
                                        placeholder=""
                                        value={firstNumber}
                                        onChange={handleFirstInputChange}
                                    />
                                    <input
                                        style={{ width: '50%', height: '20px', fontSize: '18px', fontWeight: '400', lineHeight: '30px', letterSpacing: '0em', textAlign: 'left', color: '#00664A', backgroundColor: themeOptions.color.button, outline: 'none', borderRadius: '5px' }}
                                        type="number"
                                        min={0}
                                        max={10}
                                        placeholder=""
                                        value={secondNumber}
                                        onChange={handleSecondInputChange}
                                    />
                                </div>
                            </div>

                        </Group>
                    </UnstyledButton>
                </div>

            </Menu.Target>
        </Menu>
    );
}
