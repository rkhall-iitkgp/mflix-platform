'use client'
import { useState } from 'react';
import FilterIcon from './../../../../assets/icons/filtericon.svg'
import { TypeButton } from '../button/typebutton';
import { Grid, Skeleton } from '@mantine/core';
import Data from "../data"
import Image from 'next/image';
import { YearButton } from '../button/yearbutton';
const child = <Skeleton height={140} radius="md" animate={false} />;
import { createStyles } from '@mantine/styles';
import themeOptions from './../../../../utils/colors'
const useStyles = createStyles((theme, _params, getRef) => {
  //const child = getRef('child');

  return {
    filter: {
      //  fontFamily: 'Poppins',
      fontSize: '30px',
      fontWeight: 600,
      lineHeight: '45px',
      letterSpacing: '0em',
      textAlign: 'left',
      color: themeOptions.color.textColorNormal,
      backgroundColor: '#140320',
      padding: '8px',
      width: "100%",
    },

    header: {
      height: 'fit-content',
      marginBottom: '120px',
      backgroundColor: '#140320',
      padding: "30px 10px"
    },


    inner: {
      height: '84px',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '40px',
      // marginBottom: '20px',
      cursor: "pointer"

    },
    outer: {
      height: 'fit-content',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '40px',
      // marginBottom: '20px',
      cursor: "pointer",
      transform: "translateY(0)", // Move down to its original position
      transition: "transform 0.8s ease-out",

    },
    body: {
      display: "flex",
      flexDirection: "column"
    }



  };
});



export function Filter() {
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
        {isToggled && <div className={classes.outer}>
          <Grid w={"100%"} justify="flexStart" align="stretch" overflow="hidden">
            {Object.keys(Data).map((key, index) => ( // Iterate over the keys of Data
              <Grid.Col key={index} span={3} >
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