'use client'
import { useState } from 'react';
import { Container, Anchor, Group, Burger, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './filter.module.css'
import FilterIcon from './../../../../assets/icons/filtericon.svg'
import { TypeButton } from '../button/typebutton';
import { Grid, Skeleton } from '@mantine/core';
import Data from "../data"
import Image from 'next/image';
import { YearButton } from '../button/yearbutton';
const child = <Skeleton height={140} radius="md" animate={false} />;



export function Filter() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  return (
    <header className={classes.header}>
      <div onClick={handleToggle} className={classes.inner}>
        <Image src={FilterIcon} alt='' />
        <div className={classes.filter}>Filter</div>
      </div>
      {isToggled && <div className={classes.inner}>
        <Grid>
          {Object.keys(Data).map((key, index) => ( // Iterate over the keys of Data
            <Grid.Col key={index} span={{ base: 12, xs: 3 }}>
              <TypeButton value={key} data={Data[key as keyof typeof Data]} />
            </Grid.Col>
          ))}
          <Grid.Col span={{ base: 12, xs: 3 }}>
            <YearButton />
          </Grid.Col>
        </Grid>

      </div>
      }

    </header>
  );
}