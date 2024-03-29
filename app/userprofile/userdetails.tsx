'use client'

import React, { useState } from 'react';
import { createStyles } from '@mantine/styles';
import Image from 'next/image';
import { Button, Drawer } from '@mantine/core';
import { FaCamera } from "react-icons/fa";


import profileIcon from '@/assets/icons/profile.svg';
import tabletIcon from '@/assets/icons/tablet.svg';
import laptopIcon from '@/assets/icons/laptop.svg';
import editIcon from '@/assets/icons/editProfile.svg';
import saveIcon from '@/assets/icons/save.svg';
import themeOptions from '@/utils/colors';
import { MdDelete } from "react-icons/md";

type UserInfo = {
    name: string;
    email: string;
    phoneNo: string;
    dob: string;
    plan: string;
}

const initialUserInfo: UserInfo = {
    name: "John Doe",
    email: "john@example.com",
    phoneNo: "1234567890",
    dob: "01/01/1990",
    plan: "Basic"
};

type UserProfile = {
    profileName: string;
    profileId: number;
    avatarUrl: string;
};

const userProfiles: UserProfile[] = [
    {
        profileName: "Profile1",
        profileId: 1,
        avatarUrl: profileIcon,
    },
    {
        profileName: "Profile2",
        profileId: 2,
        avatarUrl: profileIcon,
    },
    {
        profileName: "Profile3",
        profileId: 3,
        avatarUrl: profileIcon,
    },
];

type UserSignedInInfo = {
    deviceId: number;
    deviceName: string;
    iconUrl: string;
};

const userSignedInInfos: UserSignedInInfo[] = [
    {
        deviceId: 123,
        deviceName: "Desktop",
        iconUrl: laptopIcon,
    },
    {
        deviceId: 456,
        deviceName: "Mobile",
        iconUrl: laptopIcon,
    },
    {
        deviceId: 789,
        deviceName: "Tablet",
        iconUrl: tabletIcon,
    }
];

const useStyles = createStyles(() => ({
    containerStyle: {
        backgroundColor: "red",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: '100%',
        width: '100%',
        // backgroundColor: 'red'
        // marginTop: 1000
        // border :'solid white 2px'

    },
    // drawerStyle: {
    //     // offsetPath: 'padding-box',
    //     offset: 10
    // },
    childStyle: {
        backgroundColor: 'green',
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // border: '1px solid #ccc',
        padding: '2vw',
        textAlign: 'center',
        // height:'80vh'
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        border: '0.1rem solid white',
        borderRadius: '0.8em',
        width: '100%',
        padding: '2vw',
        // gap:'2rem',
        marginLeft: '3vw',
        marginRight: '3vw',
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    profileItem: {
        display: 'flex',
        margin: '0.5vw',
        flexDirection: 'row',
        // padding: '2vw',
        // marginLeft: '1vw',
        // marginRight: '1vw',
        // borderBottom: 'white 1px solid',
        justifyContent: 'space-between',
        width: '100%',
        gap: '1vw',

    },


    userInfoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '0',
        paddingRight: '0',
        paddingTop: '1vw',
        paddingBottom: '1vw',
        borderBottom: 'white solid 1px'
    },
    userInfoInput: {
        border: 'none',
        backgroundColor: 'transparent',
        width: '40%',
        textAlign: 'right',
        color: 'white'
    },

    editableInput: {
        borderBottom: '1px solid white',
    },
}));

const UserDetails = ({ opened }: any) => {
    const { classes } = useStyles();
    const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [nameError, setNameError] = useState<string>('');
    const [phoneError, setPhoneError] = useState<string>('');
    const [lastValidValues, setLastValidValues] = useState<UserInfo>(initialUserInfo);
    const [manageProfile, setManageProfile] = useState(0);
    const [manageDevice, setManageDevice] = useState(0);

    const handleEditClick = () => {
        setEditMode(!editMode);
    };
    const toggleManageProfile = () => {
        setManageProfile(prevState => (prevState === 0 ? 1 : 0));
    };
    const toggleManageDevice = () => {
        setManageDevice(prevState => (prevState === 0 ? 1 : 0));
    };

    const handleSaveClick = () => {
        let nameValid = true;
        let phoneValid = true;

        if (!userInfo.name.trim()) {
            setNameError('Name cannot be empty');
            nameValid = false;
        } else {
            setNameError('');
        }

        if (!/^\d{10}$/.test(userInfo.phoneNo)) {
            setPhoneError('Phone number must be 10 digits long and contain only numbers');
            phoneValid = false;
        } else {
            setPhoneError('');
        }

        if (nameValid && phoneValid) {
            setEditMode(false);
            setLastValidValues({ ...userInfo }); // Update lastValidValues when input is valid
        } else {
            console.log('Input error');
            setUserInfo(lastValidValues); // Revert to last valid values on invalid input
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, key: keyof UserInfo) => {
        const { value } = event.target;
        setUserInfo({ ...userInfo, [key]: value });

        if (key === 'name') {
            setNameError('');
        } else if (key === 'phoneNo') {
            setPhoneError('');
        }
    };

    const handleFieldFocus = (key: keyof UserInfo) => {
        setLastValidValues({ ...userInfo });
    };
    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'space-between' }} >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{ color: 'white' }}>User Profile</h1>
                <div style={{ height: '20vh', width: '20vh', borderRadius: '50%', overflow: 'hidden', border: '0.2rem solid white', position: 'relative' }}>
                    <Image src="" alt="Profile" width={150} height={150} /> {/* Replace src with actual image URL */}

                    {/* Camera Icon */}

                </div>
                <div style={{ position: 'relative', left: '45%', transform: 'translate(-50%, -50%)', marginTop: '-10%' }}>
                    <div style={{ backgroundColor: themeOptions.color.button, borderRadius: '50%', height: '3rem', width: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaCamera style={{ color: 'white' }} />
                    </div>
                </div>
            </div>
            <div style={{
                width: '70%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                // border: '1px solid #ccc',
                padding: '2vw',
                textAlign: 'center',
            }}> {/* child style*/}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    border: '0.1rem solid white',
                    borderRadius: '0.8rem',
                    width: '100%',
                    padding: '2vw',
                    // gap:'2rem',
                }} > {/* flex container*/}
                    <div style={{
                        height: '4rem',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }} > {/* user info item*/}
                        <h2 style={{ color: '#7011B6' }}>User Information</h2>
                        {editMode ? (
                            <Image src={saveIcon} alt="Save" width={40} height={40} onClick={handleSaveClick} />
                        ) : (
                            <Image src={editIcon} alt="Edit" width={40} height={40} onClick={handleEditClick} />
                        )}
                    </div>
                    {Object.entries(userInfo).map(([key, value], index) => (
                        <div key={index} className={classes.userInfoItem} style={{ borderBottom: index === Object.entries(userInfo).length - 1 ? 'none' : 'white solid 1px' }}>
                            <div style={{ color: 'white', fontWeight: 'bold' }}>{key}:</div>
                            {editMode && (key === 'name' || key === 'phoneNo') ? (
                                <>
                                    {key === 'name' && nameError && <div style={{ color: 'red', alignContent: 'right' }}>{nameError}</div>}
                                    {key === 'phoneNo' && phoneError && <div style={{ color: 'red' }}>{phoneError}</div>}
                                    <input

                                        type="text"
                                        value={value}
                                        onChange={(event) => handleChange(event, key)}
                                        onFocus={() => handleFieldFocus(key)}
                                        className={`${classes.userInfoInput} ${editMode && (key === 'name' || key === 'phoneNo') ? classes.editableInput : ''}`}
                                    />
                                </>
                            ) : (
                                <div style={{ color: 'white' }}>{value}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>




            <div style={{
                width: '72%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                // border: '1px solid #ccc',
                textAlign: 'center',
            }} >{/*child style*/}

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '0.1rem solid white',
                    borderRadius: '0.8rem',
                    width: '100%',

                    // gap:'2rem',
                    marginLeft: '3vw',
                    marginRight: '3vw',
                    height: '25rem'


                }}>{/*flex container*/}
                    <div style={{ display: 'flex', flexDirection: 'column', borderRadius: '0.8rem ', paddingLeft: '4%', paddingRight: '4%' }}>
                        <h2 style={{ color: '#7011B6', textAlign: 'left' }}>Your Profiles</h2>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>{/*profile container*/}
                            {userProfiles.map((profile, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    marginTop: '0.3vw',
                                    marginBottom: '0.3vw',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    paddingBottom: '0.5vw',
                                    gap: '2vw',
                                    borderBottom: '0.1rem white solid',

                                }}>{/*profile item*/}
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '2vw' }}>
                                        <Image src={profile.avatarUrl} alt="prfl" width={50} height={50} />
                                        <div style={{ color: 'white', paddingTop: '0.5rem' }}>{profile.profileName}</div>
                                    </div>
                                    <div style={{ paddingRight: '1vw' }}>
                                        {manageProfile ? <MdDelete style={{ color: 'white', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => { console.log('clicker') }} /> : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button style={{ borderRadius: '0.8rem', color: 'white', height: '10%', width: '100%', backgroundColor: themeOptions.color.button, cursor: 'pointer' }} onClick={() => { toggleManageProfile() }}>Manage Profile</button>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '0.1rem solid white',
                    borderRadius: '0.8rem',
                    width: '100%',
                    // gap:'2rem',
                    marginLeft: '3vw',
                    marginRight: '3vw',
                    height: '25rem'
                }}>{/*flex container*/}
                    <div >
                        <div style={{
                            paddingRight: '1vw',
                            paddingLeft: '1vw',
                        }}>
                            <h2 style={{ color: '#7011B6', textAlign: 'left' }}>User Signed-in Info</h2>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            paddingRight: '1vw',
                            paddingLeft: '1vw',
                        }}>{/*profile container*/}
                            {userSignedInInfos.map((info, index) => (
                                <div key={index} className={classes.profileItem}>{/*profile item*/}
                                    <><div style={{ color: 'white' }}>Device ID: {info.deviceId}</div>
                                        <div style={{ color: 'white' }}> {info.deviceName}</div>
                                        <div style={{ paddingRight: '1vw' }}>
                                            {manageDevice ? <MdDelete style={{ color: 'white', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => { console.log('clicker') }} /> : null}
                                        </div>
                                    </>

                                </div>

                            ))}
                        </div>
                    </div>
                    <button style={{ borderRadius: '0.8rem', color: 'white', height: '10%', width: '100%', backgroundColor: themeOptions.color.button, cursor: 'pointer' }} onClick={() => { toggleManageDevice() }}>Manage Devices</button>
                </div>
            </div>
        </div>

    );
}

export default UserDetails;
