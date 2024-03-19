"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { rem } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import { IconEdit, IconCheck } from '@tabler/icons-react';
import avatarLogo from '@/assets/icons/profile.svg'

import themeOptions from '@/assets/themes/colors';






const headingFZ = themeOptions.fontSize.l;
// const avatarLogo = '../../../assets/images/profileLogo.png';
// const avatarLogo = './profileLogo.png';


const initialProfiles = [
    {
        id: 1,
        caption: 'Profile1',
        link: '/',
        image: '/path/to/profile1-image.jpg'
    },
    {
        id: 2,
        caption: 'Profile2',
        link: '/',
        image: '/path/to/profile2-image.jpg'
    },
    {
        id: 3,
        caption: 'Kids',
        link: '/',
        image: '/path/to/kids-image.jpg'
    }
];

const useStyles = createStyles(() => ({

    outerStyle: {
        position: 'absolute',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, -80%)',
        // border:'solid black',
        // width: '60%',
        minWidth: 'calc(60% - 40px)',
    },


    containerStyle: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // border: 'solid cyan'
    },

    headingStyle: {
        padding: '2vw',
        fontSize: headingFZ,
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
        width: '13vw', // Increase size
        height: '13vw', // Increase size
        marginBottom: '1rem',
        color: 'blue',
        transition: 'border-color 0.3s', // Add transition for smooth effect
        border: '2px solid transparent', // Initially transparent outline
        ':hover': {
            border: 'white  solid',
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
    const [profiles, setProfiles] = useState(initialProfiles);
    const [editingId, setEditingId] = useState(null);
    const [editedCaption, setEditedCaption] = useState('');

    // Function to handle editing mode
    const handleEditClick = (id: any, caption: any) => {
        setEditingId(id);
        setEditedCaption(caption);
    };

    // Function to handle saving edited caption
    const handleSaveClick = (id: any) => {
        const updatedProfiles = profiles.map(profile =>
            profile.id === id ? { ...profile, caption: editedCaption } : profile
        );
        setProfiles(updatedProfiles);
        setEditingId(null);
    };

    const {classes} = useStyles()
    return (
        <div style={{ backgroundColor: '#140320', minHeight: '100vh', color: 'white' }}>


            <div className={classes.outerStyle}>


                <div className={classes.headingStyle}>
                    Who's watching?
                </div>


                <div className={classes.containerStyle}>
                    {profiles.map((profile, index) => (
                        <div key={index} className={classes.itemStyle}>
                            <Image
                                className={classes.avatarStyle}
                                src={avatarLogo}
                                alt={profile.caption}
                                onClick={() => window.location.href = profile.link}
                                style={{ cursor: 'pointer' }} // Add cursor style
                            />

                            <span style={{ textAlign: 'center' }}>{profile.caption}</span>
                            
                        </div>
                    ))}
                </div>





            </div>

        </div>
    );
}

export default SelectProfile;


{/* <div className='allProfiles' className={classes.containerStyle}>
    <div style={itemStyle}>
        <Avatar style={avatarStyle} src={null} color="#9441D0 " component={Link} href="/" />
        <span>Profile1</span>
    </div>
    <div style={itemStyle}>
        <Avatar style={avatarStyle} src={null} color="#9441D0" component={Link} href="/" />
        <span>Profile2</span>
    </div>
    <div style={itemStyle}>
        <Avatar style={avatarStyle} src={null} color="#9441D0" component={Link} href="/" />
        <span>Kids</span>
    </div> */}



{/* <Avatar src={null} alt="no image here" />
<Avatar src={null} alt="no image here" /> */}


// &#128100