'use client';

import { useState } from 'react';
import { Button, Grid, Rating } from '@mantine/core';
import Image from 'next/image';
import { createStyles } from '@mantine/styles';
import FilterIcon from '@/assets/icons/filtericon.svg';
import { TypeButton } from './FilterButtons/TypeButton';
import Data from '@/app/(rootProject)/(root)/search/components/data'
import { YearButton } from './FilterButtons/YearButton';
import themeOptions from '../../utils/colors';
import { RatingButton } from './FilterButtons/RatingButton';
import Createicon from '@/assets/create.svg'
import Deleteicon from '@/assets/delete.svg'
import Listicon from '@/assets/list.svg'
import { languages, types, countries, genres } from './filterOptions';
import { useSearchParams } from 'next/navigation';
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
        left: 0,
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
    button: {
        backgroundColor: themeOptions.color.smallBox,
        color: '#fff',
        padding: '0 10px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        "&:hover": {
            opacity: 0.7
        }
    }
})
);

export default function Filter({ fetchData }: { fetchData(searchTerm: string, filters: any): Promise<void> }) {
    const { classes } = useStyles();
    const [isToggled, setIsToggled] = useState(false);
    const searchParams = useSearchParams();
    const search = searchParams.get('query');

    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedRatings, setSelectedRatings] = useState<string[]>([]);

    const fetchResults = async () => {
        const body = {
            languages: selectedLanguages,
            countries: selectedCountries,
            genres: selectedGenres,
            type: selectedTypes.length === 1 ? selectedTypes[0] : "",
            rating: {
                low: selectedRatings.map(rating => parseInt(rating.substring(0, 1)))[0],
                high: 10
            }
        };
        await fetchData(search, body);
    }

    const handleToggle = async () => {
        setIsToggled((prev) => !prev);
        return await fetch("hey")
    };
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleDelete = (filter: any) => {
        // Handle delete action for the selected filter
        console.log('Delete filter:', filter);
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
                            {/* {Object.keys(Data).map((key, index) => ( // Iterate over the keys of Data
                                <Grid.Col key={index} span={3}>
                                    <TypeButton value={key} data={Data[key as keyof typeof Data]} />
                                </Grid.Col>
                            ))} */}
                            <Grid.Col span={3}>
                                <TypeButton value='Language' data={Data["Language"]} selectedArray={selectedLanguages} setSelectedArray={setSelectedLanguages} />
                            </Grid.Col>
                            <Grid.Col span={3}>
                                <TypeButton value='Type' data={Data["Type"]} selectedArray={selectedTypes} setSelectedArray={setSelectedTypes} />
                            </Grid.Col>
                            <Grid.Col span={3}>
                                <TypeButton value='Country' data={Data["Country"]} selectedArray={selectedCountries} setSelectedArray={setSelectedCountries} />
                            </Grid.Col>
                            <Grid.Col span={3}>
                                <TypeButton value='Genre' data={Data["Genre"]} selectedArray={selectedGenres} setSelectedArray={setSelectedGenres} />
                            </Grid.Col>
                            <Grid.Col span={3}>
                                <TypeButton value='Rating' data={Data["Rating"]} selectedArray={selectedRatings} setSelectedArray={setSelectedRatings} />
                            </Grid.Col>


                            {/* <Grid.Col span={3}>
                                <RatingButton />
                            </Grid.Col> */}
                            {/* <Grid.Col span={3}>
                                <YearButton />
                            </Grid.Col> */}
                            <Grid.Col span={3}>
                            </Grid.Col>
                            <Grid.Col span={3}>
                            </Grid.Col>
                            <Grid.Col span={3} style={{ display: 'flex', justifyContent: "flex-end", alignItems: "center", gap: '6px' }}>
                                <button className={classes.button} onClick={() => fetchResults()} >Apply</button>
                                <Image src={Createicon} alt="" />
                                <Image src={Listicon} alt="" onClick={toggleDropdown} />
                                {showDropdown && (
                                    <div style={{ position: 'absolute', top: '100%', right: 0, backgroundColor: '#333', zIndex: 999, borderRadius: '5px', padding: '5px' }}>
                                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                            <li>
                                                Filter 1
                                                <Image src={Deleteicon} alt="Delete" style={{ paddingTop: '10px', paddingLeft: '4px' }} onClick={() => handleDelete('Filter 1')} />
                                            </li>
                                            <li>
                                                Filter 2
                                                <Image src={Deleteicon} alt="Delete" style={{ paddingTop: '10px', paddingLeft: '4px' }} onClick={() => handleDelete('Filter 2')} />
                                            </li>
                                            {/* Add more filters as needed */}
                                        </ul>
                                    </div>
                                )}
                            </Grid.Col>
                        </Grid>
                    </div>
                }

            </div>

        </header>
    );
}
