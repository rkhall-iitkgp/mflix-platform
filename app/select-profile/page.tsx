"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { rem } from '@mantine/core';
import { createStyles } from '@mantine/styles';
// import { IconEdit, IconCheck } from '@tabler/icons-react';
import avatarLogo1 from '@/assets/icons/profile1.svg'
import avatarLogo2 from '@/assets/icons/profile2.svg'
import avatarLogo3 from '@/assets/icons/profile3.svg'
import addMoreLogo from '@/assets/icons/add-more.svg'

import themeOptions from '@/assets/themes/colors';






const headingFZ = themeOptions.fontSize.l;
// const avatarLogo = '../../../assets/images/profileLogo.png';
// const avatarLogo = './profileLogo.png';

interface Profile {
    id: number;
    caption: string;
    link: string;
    image: string;
}
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
    }
];

const useStyles = createStyles(() => ({

    // outerStyle: {
    //     position: 'absolute',
    //     top: '60%',
    //     left: '50%',
    //     transform: 'translate(-50%, -80%)',
    //     // border:'solid black',
    //     // width: '60%',
    //     minWidth: 'calc(60% - 40px)',
    // },

    


    containerStyle: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // border: 'solid cyan'
    },

    headingStyle: {
        padding: '2vw',
        fontSize: '5vw',
        fontWeight: 'bold',
        textAlign: 'center',

    },

    hoverStyles: {
        border: 'white  solid', // Change outline color to white on hover
    },



    itemStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // marginBottom:'rem',

        // margin: '0 20px'
        border: 'solid transparent',
        // ':hover': {
        //     border: 'white  solid',
        //     opacity: 0.5,
        //     // boxShadow: '0 0 20vh rgba(0, 0, 0, 0.5)',
        // },


        transition: 'outline-color 0.3s', // Add transition for smooth effect
        outline: '2px solid transparent', // Initially transparent outline
    },


    avatarStyle: {
        // backgroundColor: '#140320', // Purple color
        // background: 'transparent !important',
        width: '10vw', // Increase size
        height: '10vw', // Increase size
        marginBottom: '1rem',
        color: 'blue',
        transition: 'border-color 0.3s', // Add transition for smooth effect
        border: '2px solid transparent', // Initially transparent outline
        ':hover': {
            // border: 'white  solid',
            opacity: 0.5,
            // boxShadow: '0 0 20vh rgba(0, 0, 0, 0.5)',
        },
    },

    // Define hover styles



    buttonStyle: {
        cursor: 'pointer',
        marginTop: '0.5rem', // Add margin between caption and buttons
        // right:'0px', 
        // position:'relative',
    },

    inputStyle: {
        width: '5vw', // Adjust width as needed
        maxWidth: '40vw', // Limit the maximum width
        margin: '0 2vw', // Add margin between the input field and icons
    }
}))

function SelectProfile() {
    const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
    const { classes } = useStyles();
    const profilesPerRow = 5; // Number of profiles to display in a row

    // Function to handle adding a new profile
    const handleAddProfile = () => {
        const newProfileId = profiles.length + 1;
        const newProfile: Profile = {
            id: newProfileId,
            caption: `Profile${newProfileId}`,
            link: '/',
            image: avatarLogo1
        };
        setProfiles([...profiles, newProfile]);
    };

    // Render profiles in rows with specified number of profiles per row
    const renderProfiles = () => {
        const profileRows = [];
        for (let i = 0; i < profiles.length; i += profilesPerRow) {
            profileRows.push(
                <div className={classes.containerStyle} key={i}>
                    {profiles.slice(i, i + profilesPerRow).map((profile, index) => (
                        <div key={index} className={classes.itemStyle}>
                            <Image
                                className={classes.avatarStyle}
                                src={profile.image}
                                alt={profile.caption}
                                onClick={() => window.location.href = profile.link}
                                style={{ cursor: 'pointer' }} // Add cursor style
                                width={150} // Specify width
                                height={150} // Specify height
                            />
                            <span style={{ textAlign: 'center' }}>{profile.caption}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return profileRows;
    };

    return (
        <div style={{ backgroundColor: '#140320', minHeight: '100vh', color: 'white',display:'flex', alignItems:'center', justifyContent:'space-around' }}>
            {/* <div className={classes.outerStyle}> */}
            <div>
                <div className={classes.headingStyle}>
                    Who's watching?
                </div>
                {renderProfiles()}
                {/* Image to add new profile */}
                <div className={classes.itemStyle} >
                    <Image
                        src={addMoreLogo}
                        alt="Add  Profile"
                        className={classes.avatarStyle}
                        style={{ cursor: 'pointer' }}
                        width={30} // Specify width
                        height={30} // Specify height
                        onClick={handleAddProfile}
                    />
                    <span style={{ textAlign: 'center' }}>Add New Profile</span>
                </div>
            </div>
        </div>
    );
}






export default SelectProfile;


// function SelectProfile() {
//     const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
//     const { classes } = useStyles();
//     const maxProfilesPerRow = 5; 

//     // Function to handle adding a new profile
//     const handleAddProfile = () => {
//         // if (profiles.length%5===0) 
//         const newProfileId = profiles.length + 1;
//         const newProfile: Profile = {
//             id: newProfileId,
//             caption: `Profile${newProfileId}`,
//             link: '/',
//             image: avatarLogo1
//         };
//         setProfiles([...profiles, newProfile]);

        
//     };

     

//     return (
//         <div style={{ backgroundColor: '#140320', minHeight: '100vh', color: 'white' }}>


//             <div className={classes.outerStyle}>


//                 <div className={classes.headingStyle}>
//                     Who's watching?
//                 </div>


//                 <div className={classes.containerStyle}>
//                     {profiles.map((profile, index) => (
//                         <div key={index} className={classes.itemStyle}>
//                             <Image
//                                 className={classes.avatarStyle}
//                                 src={profile.image}
//                                 alt={profile.caption}
//                                 onClick={() => window.location.href = profile.link}
//                                 style={{ cursor: 'pointer' }} // Add cursor style
//                             />

//                             <span style={{ textAlign: 'center' }}>{profile.caption}</span>
//                             {(index + 1) % 5 === 0 && <br />}
//                         </div>
//                     ))}

//                     {/* Image to add new profile */}
//                     <div className={classes.itemStyle} onClick={handleAddProfile}>
//                         <Image
//                             src={avatarLogo1}
//                             alt="Add Profile"
//                             className={classes.avatarStyle}
//                             style={{ cursor: 'pointer' }}
//                             width={150} // Specify width
//                             height={150} // Specify height
//                         />
//                         <span style={{ textAlign: 'center' }}>Add Profile</span>
//                     </div>

                    
                    
//                 </div>





//             </div>

//         </div>
//     );
// }