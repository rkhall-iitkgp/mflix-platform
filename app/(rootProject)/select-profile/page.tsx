'use client'
// Import required modules
import React, { useState , useEffect } from 'react';
import Image from 'next/image';
import { createStyles } from '@mantine/styles';
import { useMediaQuery } from '@mantine/hooks';
import useLoginStore from '@/Stores/LoginStore';
import searchMsApiUrls from '@/app/(rootProject)/api/searchMsApi';

// Import icons
import avatarLogo1 from '@/assets/icons/profile1.svg';
import avatarLogo2 from '@/assets/icons/profile2.svg';
import avatarLogo3 from '@/assets/icons/profile3.svg';
import addMoreLogo from '@/assets/icons/add-more.svg';
import themeOptions from '@/assets/themes/colors';

// Define heading font size
const headingFZ = '5vw';
const url = searchMsApiUrls();
const [length,setLength] = useState(1)

// {
//     "success": true,
//     "message": "New user profile created successfully",
//     "userProfile": {
//         "name": "Adarsh",
//         "_id": "6607f7d06e6818da985e8294",
//         "moviesWatched": [],
//         "watchList": [],
//         "favoriteMovies": [],
//         "savedFilters": [],
//         "searchHistory": [],
//         "__v": 0
//     }
// }

const AddProfile = async()=>{
    try{
        const response = await fetch(`${url}/user/create`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include", 
            body: JSON.stringify({ "userName":`Profile${length}` })
        })
        console.log(response);    
    }catch(error){
        console.log("Unable to connect:",error);
    } 
}

// Define profile interface
interface Profile {
    id: number;
    caption: string;
    link: string;
    image: string;
}

const ImageArray = [avatarLogo1,avatarLogo2,avatarLogo3];
 
// Define functional component
const SelectProfile: React.FC = () => {
    //Getting user data from backend
    const state = useLoginStore.getState();
    const array = state.userProfiles;
    setLength(array.length+1);

    //changing type of profile
    const transformedArray = array.map((item, index) => ({
        id: item._id || `${index}`,
        caption: item.name || `Profile ${index+1}`,
        link: '/',
        image: ImageArray[Math.floor(Math.random()*3)],
    }));
    transformedArray.push({
        id: transformedArray.length + 1,
        caption: 'Add New',
        link: 'null',
        image: addMoreLogo,
    });

    // State for profiles
    const [profiles, setProfiles] = useState<Profile[]>(transformedArray);
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
        let newProfileData = AddProfile();
        const newProfileId = newProfileData.userProfile._id || profiles.length + 1;
        const newProfile: Profile = {
            id: newProfileId,
            caption: `Profile`,
            link: '/',
            image: ImageArray[Math.floor(Math.random()*3)], 
        };
        
        setProfiles([...profiles.slice(0, profiles.length - 1), newProfile, profiles[profiles.length - 1]]);
        console.log(profiles)
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
                            <span style={{ textAlign: 'center', fontSize:'2vw' }}>{profile.caption}</span>
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

// Define component styles
const useStyles = createStyles(() => ({
    containerStyle: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        minWidth :'70vw',
    },
    headingStyle: {
        padding: '2vw',
        fontSize: themeOptions.fontSize.xl,
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
        width:   '15vw',
        height:   '15vw',
        marginBottom: '1rem',
        transition: 'border-color 0.3s',
        border: '2px solid transparent',
        ':hover': {
            opacity: 0.5,
        },
    },
}));


// Export component
export default SelectProfile;
