'use client'

import React, { useState } from 'react';
import { createStyles } from '@mantine/styles';
import Image from 'next/image';


import profileIcon from '@/assets/icons/profile.svg';
import tabletIcon from '@/assets/icons/tablet.svg';
import laptopIcon from '@/assets/icons/laptop.svg';
import editIcon from '@/assets/icons/editProfile.svg';
import saveIcon from '@/assets/icons/save.svg';


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
        avatarUrl:  profileIcon,
    },
    {
        profileName: "Profile3",
        profileId: 3,
        avatarUrl : profileIcon,
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100vw',
        // border :'solid white 2px'

    },
    childStyle: {
        width: '60%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // border: '1px solid #ccc',
        margin: '10px',
        padding: '2vw',
        textAlign: 'center',
        // height:'80vh'
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        border: '3px solid white',
        borderRadius:'8px',
        width: '100%',
        padding:'2vw',
        // gap:'2rem',
        marginLeft:'3vw',
        marginRight:'3vw',
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    profileItem: {
        display: 'flex',
        margin: '0.5vw',
        // padding: '2vw',
        // marginLeft: '1vw',
        // marginRight: '1vw',
        // borderBottom: 'white 1px solid',
        justifyContent: 'flex-start',
        width: '100%',
        gap:'3vw',

    },

  
    userInfoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '0',
        paddingRight: '0',
        paddingTop:'1vw',
        paddingBottom:'1vw',
        borderBottom:'white solid 1px'
    },
    userInfoInput: {
        border: 'none',
        backgroundColor: 'transparent',
        width: '40%',
        textAlign: 'right',
    },

    editableInput: {
        borderBottom: '1px solid white',
    },
}));

const UserProfile = () => {
    const { classes } = useStyles();
    const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [nameError, setNameError] = useState<string>('');
    const [phoneError, setPhoneError] = useState<string>('');
    const [lastValidValues, setLastValidValues] = useState<UserInfo>(initialUserInfo);

    const handleEditClick = () => {
        setEditMode(!editMode);
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
        <div className={classes.containerStyle}>
            
            <div className={classes.childStyle} style={{flexDirection:'column', alignItems:'center'}}>
                
                    <h1 style={{ color: 'white', marginBottom: '4vh' }}>User Profile</h1>
                    <div style={{ width: '20vh', height: '20vh', borderRadius: '50%', overflow: 'hidden', border: '2px solid white' }}>
                        <Image src="" alt="Profile" width={150} height={150} />
                    </div>
                
            </div>
            <div className={classes.childStyle}>
                <div className={classes.flexContainer}>
                    <div className={classes.userInfoItem}>
                        <h2 style={{ color: '#7011B6' }}>User Information</h2>
                        {editMode ? (
                            <Image src={saveIcon} alt="Save" width={40} height={40} onClick={handleSaveClick} />
                        ) : (
                            <Image src={editIcon} alt="Edit" width={40} height={40} onClick={handleEditClick} />
                        )}
                    </div>
                    {Object.entries(userInfo).map(([key, value], index) => (
                        <div key={index} className={classes.userInfoItem} style={{ borderBottom: index === Object.entries(userInfo).length - 1 ? 'none' : 'white solid 1px' }}>
                            <div>{key}</div>
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
                                <div>{value}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

           


            <div className={classes.childStyle}>
                {/* Inner div for user profiles */}
                <div className={classes.flexContainer}>
                    <h2 style={{ color: '#7011B6', textAlign:'left' }}>Your Profiles</h2>
                    <div className={classes.profileContainer}>
                        {userProfiles.map((profile, index) => (
                            <div key={index} className={classes.profileItem}>
                                <Image  src={profile.avatarUrl} alt="prfl" width={50} height={50} />
                                <div>{profile.profileName}</div>
                                {/* <div>ID: {profile.profileId}</div> */}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Inner div for user signed-in info */}
                <div className={classes.flexContainer}>
                    <h2 style={{ color: '#7011B6', textAlign: 'left' }}>User Signed-in Info</h2>
                    <div className={classes.profileContainer}>
                        {userSignedInInfos.map((info, index) => (
                            <div key={index} className={classes.profileItem}>
                                <Image src={info.iconUrl} alt="prfl" width={50} height={50} />
                                <><div>Device ID: {info.deviceId}</div>
                                    <div> {info.deviceName}</div></>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
