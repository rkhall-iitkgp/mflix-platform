'use client'
// Import required modules
import React, { useState } from 'react';
import Image from 'next/image';
import { createStyles } from '@mantine/styles';

// Import icons
import avatarLogo1 from '@/assets/icons/profile1.svg';
import avatarLogo2 from '@/assets/icons/profile2.svg';
import avatarLogo3 from '@/assets/icons/profile3.svg';
import addMoreLogo from '@/assets/icons/add-more.svg';

// Define heading font size
const headingFZ = '5vw';

// Define profile interface
interface Profile {
    id: number;
    caption: string;
    link: string;
    image: string;
}

// Initial profiles
const initialProfiles: Profile[] = [
    {
        id: 1,
        caption: 'Profile1',
        link: '/',
        image: avatarLogo1,
    },
    {
        id: 2,
        caption: 'Profile2',
        link: '/',
        image: avatarLogo2,
    },
    {
        id: 3,
        caption: 'Profile3',
        link: '/',
        image: avatarLogo3,
    },
    {
        id: 4,
        caption: 'Add New',
        link: 'null',
        image: addMoreLogo,
    },
];

// Define component styles
const useStyles = createStyles(() => ({
    containerStyle: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    headingStyle: {
        padding: '2vw',
        fontSize: headingFZ,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    itemStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: 'solid transparent',
        transition: 'outline-color 0.3s',
        outline: '2px solid transparent',
    },
    avatarStyle: {
        width: '10vw',
        height: '10vw',
        marginBottom: '1rem',
        transition: 'border-color 0.3s',
        border: '2px solid transparent',
        ':hover': {
            opacity: 0.5,
        },
    },
}));

// Define functional component
const SelectProfile: React.FC = () => {
    // State for profiles
    const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
    // Get component styles
    const { classes } = useStyles();
    // Number of profiles per row
    const profilesPerRow = 5;

    // Function to handle profile click
    const handleProfileClick = (link?: string) => {
        if (link === 'null') {
            handleAddProfile();
        } else if (link) {
            window.location.href = link;
        }
    };

    // Function to handle adding a new profile
    const handleAddProfile = () => {
        const newProfileId = profiles.length + 1;
        const newProfile: Profile = {
            id: newProfileId,
            caption: `Profile${newProfileId}`,
            link: '/',
            image: avatarLogo1, // Example image, replace with actual path
        };

        setProfiles([...profiles.slice(0, profiles.length - 1), newProfile, profiles[profiles.length - 1]]);
    };

    // Function to render profiles
    const renderProfiles = () => {
        const profileRows = [];
        for (let i = 0; i < profiles.length; i += profilesPerRow) {
            profileRows.push(
                <div className={classes.containerStyle} key={i}>
                    {profiles.slice(i, i + profilesPerRow).map((profile, index) => (
                        <div key={index} className={classes.itemStyle} onClick={() => handleProfileClick(profile.link)}>
                            <Image className={classes.avatarStyle} src={profile.image} alt={profile.caption} width={150} height={150} />
                            <span style={{ textAlign: 'center' }}>{profile.caption}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return profileRows;
    };

    // Render component
    return (
        <div style={{ backgroundColor: '#140320', minHeight: '100vh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <div>
                <div className={classes.headingStyle}>
                    Who's watching?
                </div>
                {renderProfiles()}
            </div>
        </div>
    );
};

// Export component
export default SelectProfile;
