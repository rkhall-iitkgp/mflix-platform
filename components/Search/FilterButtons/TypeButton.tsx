import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { UnstyledButton, Menu, Group, MantineProvider } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { createStyles } from '@mantine/styles';
import themeOptions from '../../../utils/colors';

const useStyles = createStyles(() => ({
    menuitem: {
        backgroundColor: '#000 !important', // Use smallBox color from themeOptions
        textTransform: 'capitalize',
        marginBottom: "0.2rem"
    },
    menuitemSelected: {
        backgroundColor: `${themeOptions.color.smallBox} !important`, // Use textColorNormal color from themeOptions
        textTransform: 'capitalize',
        marginBottom: "0.2rem"
    },
    control: {
        boxSizing: 'border-box',
        borderRadius: 'var(--mantine-radius-md)', // Use radius from themeOptions
        border: `1px solid ${themeOptions.color.insideTextColor}`, // Use divider color from themeOptions
        backgroundColor: '#140320', // Use largeBox color from themeOptions
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '2px',
        paddingBottom: '2px',
        paddingRight: '8px',
        paddingLeft: '10px',
        // transition: 'backgroundColor 150ms ease',

        transition: 'opacity 1s easeout', // Adding transition for opacity change
        opacity: 1, // Initial opacity
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
        maxWidth: "100%",
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        margin: 0
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
    dropdown: {
        maxHeight: "50vh",
        overflow: "auto"
    }
}));

export function TypeButton({ value, data, selectedArray, setSelectedArray }: { value: string, data: string[], selectedArray: string[], setSelectedArray: Dispatch<SetStateAction<string[]>>}) {
    const [opened, setOpened] = useState(false);
    const [selected, setSelected] = useState(new Array(data.length).fill(false));
    const [visible, setVisible] = useState(false);
    const { classes } = useStyles();

    useEffect(() => {
        setSelectedArray(data.filter((_, i) => selected[i]))
    }, [selected])
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 50); // Delay in milliseconds
        return () => clearTimeout(timer); // Clear timeout on component unmount
    }, [opened]);
    const items = data.map((item, ind) => (
        <Menu.Item
            color='#fff'
            onClick={() => setSelected(selected.map((val, i) => i === ind ? !val : val))}
            key={item}
            className={selected[ind] ? classes.menuitemSelected : classes.menuitem}
        // style={{ textTransform: 'capitalize', backgroundColor: !selected[ind] ? `${themeOptions.color.smallBox} !important` : '#000 !important' }}
        >
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
            shadow="md"
            closeOnItemClick={false}
        >
            <Menu.Target >
                <div className={` ${classes.control} ${visible ? classes.visible : classes.hidden} `}>
                    <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
                        <Group gap="xs" justify="space-between" style={{width: "90%"}} >
                            <p className={classes.type}>{selectedArray.length > 0 ? selectedArray.join(",") : value}</p>
                        </Group>
                        <IconChevronDown color={themeOptions.color.smallBox} size="1rem" className={classes.icon} stroke={1.5} />
                    </UnstyledButton>
                </div>
            </Menu.Target>
            <MantineProvider defaultColorScheme="dark">
                <Menu.Dropdown className={classes.dropdown} >{items}</Menu.Dropdown>
            </MantineProvider>
        </Menu>
    );
}
