import { useState } from 'react';
import { UnstyledButton, Menu, Image, Group } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import themeOptions from './../../../../utils/colors'
import { createStyles } from '@mantine/styles';
import { useEffect } from 'react';

const useStyles = createStyles((theme, _params, getRef) => {

    return {
        control: {
            boxSizing: 'border-box',
            borderRadius: 'var(--mantine-radius-md)', // Use radius from themeOptions
            border: `1px solid ${themeOptions.color.insideTextColor}`, // Use divider color from themeOptions
            backgroundColor: '#140320', // Use largeBox color from themeOptions
            width: '90%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: "2px",
            paddingBottom: "2px",
            paddingRight: '8px',
            paddingLeft: '10px',
            // transition: 'backgroundColor 150ms ease',

            transition: 'opacity 1s easeout', // Adding transition for opacity change
            opacity: 1// Initial opacity
        },
        controlHidden: {
            opacity: 0, // Opacity when hidden
        },
        icon: {
            transition: 'transform 150ms ease',
            transform: 'rotate(0deg)',
            color: themeOptions.color.insideTextColor, // Use smallBox color from themeOptionsOptions
            '&[data-expanded]': {
                transform: 'rotate(180deg)',
            },
        },
        type: {
            fontSize: '18px', // Use font size from themeOptions
            fontWeight: 400, // Use font weight from themeOptions
            lineHeight: '30px',
            letterSpacing: '0em',
            textAlign: 'left',
            color: themeOptions.color.divider, // Use textColorNormal color from themeOptions
        },
        type2: {
            fontSize: '18px', // Use font size from themeOptions
            fontWeight: 400, // Use font weight from themeOptions
            lineHeight: '30px',
            letterSpacing: '0em',
            textAlign: 'left',
            color: themeOptions.color.textColorNormal, // Use textColorNormal color from themeOptions
        },
        visible: {
            opacity: "1",
            transition: "opacity 0.3s ease-out", /* Adjust timing and easing as needed */
        },
        hidden: {
            opacity: "0",
            transition: "opacity 0.3s ease-out", /* Adjust timing and easing as needed */
            pointerEvents: "none" /* Prevent interaction while hidden */
        }
    };
});

export function TypeButton({ value, data }: { value: string, data: string[] }) {
    const [opened, setOpened] = useState(false);
    const [selected, setSelected] = useState(data[0]);
    const [visible, setVisible] = useState(false);
    const { classes } = useStyles();
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 300); // Delay in milliseconds
        return () => clearTimeout(timer); // Clear timeout on component unmount
    }, [opened]);
    const items = data.map((item) => (
        <Menu.Item onClick={() => setSelected(item)} key={item}>
            {item}
        </Menu.Item>
    ));

    return (
        <Menu
            onOpen={() => setOpened(true)}
            onClose={() => setOpened(false)}
            radius="md"
            width="target"
            withinPortal
        >
            <Menu.Target>
                <div className={` ${classes.control} ${visible ? classes.visible : classes.hidden} `}>
                    <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
                        <Group gap="xs">
                            <span className={classes.type}>{value}:</span>
                            <span className={classes.type2}>{selected}</span>
                        </Group>
                        <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
                    </UnstyledButton>
                </div>
            </Menu.Target>
            <Menu.Dropdown>{items}</Menu.Dropdown>
        </Menu>
    );
}
