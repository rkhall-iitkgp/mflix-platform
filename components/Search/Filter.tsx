'use client';

import { useState } from 'react';
import { Grid } from '@mantine/core';
import Image from 'next/image';
import { createStyles } from '@mantine/styles';
import FilterIcon from '@/assets/icons/filtericon.svg';
import { TypeButton } from './FilterButtons/TypeButton';
import Data from '../../app/search/components/data';
import { YearButton } from './FilterButtons/YearButton';
import themeOptions from '../../utils/colors';

const useStyles = createStyles(() =>
//const child = getRef('child');

({
    filter: {
        //  fontFamily: 'Poppins',
        fontSize: '30px',
        fontWeight: 600,
        lineHeight: '45px',
        letterSpacing: '0em',
        textAlign: 'left',
        color: themeOptions.color.textColorNormal,
        padding: '8px',
        width: '100%',
    },

    header: {
        height: 'fit-content',
    },

    inner: {
        height: '84px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',

    },
    outer: {
        height: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        transform: 'translateY(0)', // Move down to its original position
        transition: 'transform 0.8s ease-out',

    },
    body: {
        display: 'flex',
        flexDirection: 'column',
    },

})
);

export default function Filter() {
    const { classes } = useStyles();
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled((prev) => !prev);
    };

    return (
        <header className={classes.header}>
            <div className={classes.body}>
                <div onClick={handleToggle} className={classes.inner}>
                    <Image src={FilterIcon} alt='' />
                    <div className={classes.filter}>Filter</div>
                </div>
                {isToggled &&
                    <div className={classes.outer}>
                        <Grid w="100%" justify="flexStart" align="stretch" overflow="hidden">
                            {Object.keys(Data).map((key, index) => ( // Iterate over the keys of Data
                                <Grid.Col key={index} span={3}>
                                    <TypeButton value={key} data={Data[key as keyof typeof Data]} />
                                </Grid.Col>
                            ))}
                            <Grid.Col span={3}>
                                <YearButton />
                            </Grid.Col>
                        </Grid>
                    </div>
                }

            </div>

        </header>
    );
}
