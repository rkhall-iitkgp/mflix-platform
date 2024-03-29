'use client';

import { useState } from 'react';
import { Grid } from '@mantine/core';
import Image from 'next/image';
import { createStyles } from '@mantine/styles';
import FilterIcon from '@/assets/icons/filtericon.svg';
import { TypeButton } from './FilterButtons/TypeButton';
import Data from '@/app/(rootProject)/(root)/search/components/data';
import { YearButton } from './FilterButtons/YearButton';
import themeOptions from '../../utils/colors';

const useStyles = createStyles(() =>
//const child = getRef('child');

({
    filter: {
        //  fontFamily: 'Poppins',
        fontSize: '20px',
        fontWeight: 600,
        lineHeight: '30px',
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
        // height: '80px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        width: 'fit-content',

    },
    outer: {
        position: 'absolute',
        top: '100%',
        left:0,
        width: '100%',
        background: 'rgba(0, 0, 0, 0.8)',
        height: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        transform: 'translateY(0)', // Move down to its original position
        transition: 'transform 0.5s ease-out, backround 0.5 ease-out',
        zIndex: 200,
        padding: '10px',

    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
    },
    FilterIcon: {
        width: '24px',
        height: '24px',
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
                    <Image src={FilterIcon} className={classes.FilterIcon} alt='' />
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
