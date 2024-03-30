'use client'
// Import required modules
import React, { useState ,useEffect } from 'react';
import Image from 'next/image';
import { createStyles } from '@mantine/styles';
import useLoginStore from '@/Stores/LoginStore';

// Import icons
import avatarLogo1 from '@/assets/icons/profile1.svg';
import avatarLogo2 from '@/assets/icons/profile2.svg';
import avatarLogo3 from '@/assets/icons/profile3.svg';
import addMoreLogo from '@/assets/icons/add-more.svg';
import themeOptions from '@/utils/colors';

//User profile
// {
//     "_id": "66071dcf871b365691e6f506",
//     "name": "Adarsh Tadiparthi",
//     "email": "adarshtadiparthi30@gmail.com",
//     "dob": "2005-07-30T00:00:00.000Z",
//     "phone": 9390004880,
//     "payments": [],
//     "userProfiles": [
//         {
//             "_id": "66071dcf871b365691e6f507",
//             "name": "Adarsh Tadiparthi",
//             "moviesWatched": [],
//             "watchList": [],
//             "favoriteMovies": [],
//             "savedFilters": [],
//             "searchHistory": [],
//             "__v": 0
//         }
//     ],
//     "activeLogins": [
//         "66071dd0871b365691e6f50a",
//         "66071e17871b365691e6f51f"
//     ],
//     "subscriptionTier": {
//         "bill": "",
//         "tier": {
//             "description": "",
//             "maxResolution": 0,
//             "name": "",
//             "partyWatch": false,
//             "price": 0,
//             "tier": "",
//             "__v": 0,
//             "_id": ""
//         }
//     },
//     "__v": 0
// }


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

const ImagesArray = [avatarLogo1,avatarLogo2,avatarLogo3];

// Define component styles
const useStyles = createStyles(() => ({
    containerStyle: {
        display: 'flex',

        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth :'70vw',
        maxWidth:'80vw',
        margin:'0 auto',
    },
    headingStyle: {
        margin: '2vw',
        fontSize : themeOptions.fontSize.xl,
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
        width: '15vw',
        height: '15vw',
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
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const state = useLoginStore.getState();

    useEffect(() => {
        setProfiles(state.userProfiles);
    }, []);
    // Get component styles
    const { classes } = useStyles();
    // Number of profiles per row
    const profilesPerRow = 5;
    //Get user data

    console.log(state.userProfiles);

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
    if (profiles.length < 5) {
        const newProfileId = profiles.length + 1;
        const newProfile: Profile = {
            id: newProfileId,
            caption: `Profile${newProfileId - 1}`,
            link: '/',
            image: ImagesArray[Math.floor(Math.random() * 3)], 
        };

        setProfiles([...profiles.slice(0, profiles.length - 1), newProfile, profiles[profiles.length - 1]]);
    }
    else if(profiles.length == 5) {
        const newProfileId = profiles.length + 1;
        const newProfile: Profile = {
            id: newProfileId,
            caption: `Profile${newProfileId - 1}`,
            link: '/',
            image: ImagesArray[Math.floor(Math.random() * 3)], 
        };
        const updatedInitialProfiles = profiles.slice(0, -1);
        setProfiles([...updatedInitialProfiles , newProfile]);
    }
};


// Function to render profiles
const renderProfiles = () => {
    const profileRows = [];
    
    for (let i = 0; i < profiles.length; i += profilesPerRow) {
        profileRows.push(
            <div className={classes.containerStyle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }} key={i}>
                {profiles.slice(i, i + profilesPerRow).map((profile, index) => (
                    <div key={index} className={classes.itemStyle} onClick={() => handleProfileClick(profile.link)}>
                        <Image className={classes.avatarStyle} src={profile.image} alt={profile.caption} />
                        <span style={{ textAlign: 'center', fontSize: themeOptions.fontSize.l }}>{profile.caption}</span>
                    </div>
                ))}
            </div>
        );
    }
    return profileRows;
};
    
    // Render component
    return (
        <div style={{ backgroundColor: themeOptions.color.background, minHeight: '100vh', color: themeOptions.color.divider,padding:'10rem 0'}}>
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
