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
        minHeight: '60vh',
        width: '100vw',
    },
    childStyle: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        border: '1px solid #ccc',
        margin: '10px',
        padding: '10px',
        textAlign: 'center',
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        border: '1px solid yellow',
        width: '100%',
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    profileItem: {
        display: 'flex',
        margin: '0.5vw',
        padding: '5px',
        marginLeft: '1vw',
        marginRight: '1vw',
        borderBottom: 'white 1px solid',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    userInfoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '5px',
    },
    userInfoInput: {
        border: 'none',
        backgroundColor: 'transparent',
        width: '50%',
        textAlign: 'right',
    },
}));

const UserProfile = () => {
    const { classes } = useStyles();
    const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
    const [editMode, setEditMode] = useState<boolean>(false);

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    const handleSaveClick = () => {
        // Check for name and mobile number validity before saving
        if (!userInfo.name.trim()) {
            console.error('Name cannot be empty');
            return;
        }

        if (!/^\d{10}$/.test(userInfo.phoneNo)) {
            console.error('Phone number must be 10 digits long and contain only numbers');
            return;
        }

        // If all checks pass, exit edit mode and save changes
        setEditMode(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, key: keyof UserInfo) => {
        const { value } = event.target;
        setUserInfo({ ...userInfo, [key]: value });
    };



    return (
        <div className={classes.containerStyle}>

            <div className={classes.childStyle}>
                <div className={classes.flexContainer}>
                    <div className={classes.userInfoItem}>
                        <h2>User Info</h2>
                        {editMode ? (
                            <Image src={saveIcon} alt="Save" width={40} height={40} onClick={handleSaveClick} />
                        ) : (
                            <Image src={editIcon} alt="Edit" width={40} height={40} onClick={handleEditClick} />
                        )}
                    </div>
                    {Object.entries(userInfo).map(([key, value], index) => (
                        <div key={index} className={classes.userInfoItem}>
                            <div>{key}</div>
                            <input
                                type="text"
                                value={value}
                                onChange={(event) => handleChange(event, key)}
                                className={classes.userInfoInput}
                                disabled={!editMode}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* Second child div */}


            <div className={classes.childStyle}>
                {/* Inner div for user profiles */}
                <div className={classes.flexContainer}>
                    <h2>User Profiles</h2>
                    <div className={classes.profileContainer}>
                        {userProfiles.map((profile, index) => (
                            <div key={index} className={classes.profileItem}>
                                <Image  src={profile.avatarUrl} alt="prfl" width={50} height={50} />
                                <div>Name: {profile.profileName}</div>
                                {/* <div>ID: {profile.profileId}</div> */}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Inner div for user signed-in info */}
                <div className={classes.flexContainer}>
                    <h2>User Signed-in Info</h2>
                    <div className={classes.profileContainer}>
                        {userSignedInInfos.map((info, index) => (
                            <div key={index} className={classes.profileItem}>
                                <Image src={info.iconUrl} alt="prfl" width={50} height={50} />
                                <><div>Device ID: {info.deviceId}</div>
                                    <div>Device Name: {info.deviceName}</div></>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
