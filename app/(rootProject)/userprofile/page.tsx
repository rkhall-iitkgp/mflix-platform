// 'use client'

// import React, { useState } from 'react';
// import { createStyles } from '@mantine/styles';
// import Image from 'next/image';
// import { Drawer } from '@mantine/core';

// import profileIcon from '@/assets/icons/profile.svg';
// import tabletIcon from '@/assets/icons/tablet.svg';
// import laptopIcon from '@/assets/icons/laptop.svg';
// import editIcon from '@/assets/icons/editProfile.svg';
// import saveIcon from '@/assets/icons/save.svg';

// type UserInfo = {
//     name: string;
//     email: string;
//     phoneNo: string;
//     dob: string;
//     plan: string;
// }

// const initialUserInfo: UserInfo = {
//     name: "John Doe",
//     email: "john@example.com",
//     phoneNo: "1234567890",
//     dob: "01/01/1990",
//     plan: "Basic"
// };

// type UserProfile = {
//     profileName: string;
//     profileId: number;
//     avatarUrl: string;
// };

// const userProfiles: UserProfile[] = [
//     {
//         profileName: "Profile1",
//         profileId: 1,
//         avatarUrl: profileIcon,
//     },
//     {
//         profileName: "Profile2",
//         profileId: 2,
//         avatarUrl: profileIcon,
//     },
//     {
//         profileName: "Profile3",
//         profileId: 3,
//         avatarUrl: profileIcon,
//     },
// ];

// type UserSignedInInfo = {
//     deviceId: number;
//     deviceName: string;
//     iconUrl: string;
// };

// const userSignedInInfos: UserSignedInInfo[] = [
//     {
//         deviceId: 123,
//         deviceName: "Desktop",
//         iconUrl: laptopIcon,
//     },
//     {
//         deviceId: 456,
//         deviceName: "Mobile",
//         iconUrl: laptopIcon,
//     },
//     {
//         deviceId: 789,
//         deviceName: "Tablet",
//         iconUrl: tabletIcon,
//     }
// ];

// const useStyles = createStyles(() => ({
//     containerStyle: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '100vh',
//         width: '100vw',
//         // marginTop: 1000
//         // border :'solid white 2px'

//     },
//     // drawerStyle: {
//     //     // offsetPath: 'padding-box',
//     //     offset: 10
//     // },
//     childStyle: {
//         width: '60%',
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         // border: '1px solid #ccc',
//         margin: '10px',
//         padding: '2vw',
//         textAlign: 'center',
//         // height:'80vh'
//     },
//     flexContainer: {
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         border: '3px solid white',
//         borderRadius: '8px',
//         width: '100%',
//         padding: '2vw',
//         // gap:'2rem',
//         marginLeft: '3vw',
//         marginRight: '3vw',
//     },
//     profileContainer: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     profileItem: {
//         display: 'flex',
//         margin: '0.5vw',
//         // padding: '2vw',
//         // marginLeft: '1vw',
//         // marginRight: '1vw',
//         // borderBottom: 'white 1px solid',
//         justifyContent: 'flex-start',
//         width: '100%',
//         gap: '3vw',

//     },

//     userInfoItem: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         paddingLeft: '0',
//         paddingRight: '0',
//         paddingTop: '1vw',
//         paddingBottom: '1vw',
//         borderBottom: 'white solid 1px'
//     },
//     userInfoInput: {
//         border: 'none',
//         backgroundColor: 'transparent',
//         width: '40%',
//         textAlign: 'right',
//     },

//     editableInput: {
//         borderBottom: '1px solid white',
//     },
// }));

// const UserProfile = () => {
//     const { classes } = useStyles();
//     const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
//     const [editMode, setEditMode] = useState<boolean>(false);
//     const [nameError, setNameError] = useState<string>('');
//     const [phoneError, setPhoneError] = useState<string>('');
//     const [lastValidValues, setLastValidValues] = useState<UserInfo>(initialUserInfo);

//     const handleEditClick = () => {
//         setEditMode(!editMode);
//     };

//     const handleSaveClick = () => {
//         let nameValid = true;
//         let phoneValid = true;

//         if (!userInfo.name.trim()) {
//             setNameError('Name cannot be empty');
//             nameValid = false;
//         } else {
//             setNameError('');
//         }

//         if (!/^\d{10}$/.test(userInfo.phoneNo)) {
//             setPhoneError('Phone number must be 10 digits long and contain only numbers');
//             phoneValid = false;
//         } else {
//             setPhoneError('');
//         }

//         if (nameValid && phoneValid) {
//             setEditMode(false);
//             setLastValidValues({ ...userInfo }); // Update lastValidValues when input is valid
//         } else {
//             console.log('Input error');
//             setUserInfo(lastValidValues); // Revert to last valid values on invalid input
//         }
//     };

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>, key: keyof UserInfo) => {
//         const { value } = event.target;
//         setUserInfo({ ...userInfo, [key]: value });

//         if (key === 'name') {
//             setNameError('');
//         } else if (key === 'phoneNo') {
//             setPhoneError('');
//         }
//     };

//     const handleFieldFocus = (key: keyof UserInfo) => {
//         setLastValidValues({ ...userInfo });
//     };

//     const [opened, setOpened] = useState(true);
//     return (
//         <>
//             <Drawer
//                 position="left"
//                 size="xs"
//                 // offset={10}
//                 opened={opened}
//                 onClose={() => setOpened(false)}
//                 withCloseButton={false}
//                 overlayProps={{ backgroundOpacity: 0 }}
//                 style={{ backgroundColor: 'red' }}
//             // className={classes.drawerStyle}

//             > {/* Drawer content */}
//                 <h1 style={{ color: 'black' }}>Drawer Content</h1>
//                 <p>This is your drawer content.</p>
//             </Drawer>
//             <div className={classes.containerStyle}>
//                 <div className={classes.childStyle} style={{ flexDirection: 'column', alignItems: 'center' }}>

//                     <h1 style={{ color: 'white', marginBottom: '4vh' }}>User Profile</h1>
//                     <div style={{ width: '20vh', height: '20vh', borderRadius: '50%', overflow: 'hidden', border: '2px solid white' }}>
//                         <Image src="" alt="Profile" width={150} height={150} />
//                     </div>

//                 </div>
//                 <div className={classes.childStyle}>
//                     <div className={classes.flexContainer}>
//                         <div className={classes.userInfoItem}>
//                             <h2 style={{ color: '#7011B6' }}>User Information</h2>
//                             {editMode ? (
//                                 <Image src={saveIcon} alt="Save" width={40} height={40} onClick={handleSaveClick} />
//                             ) : (
//                                 <Image src={editIcon} alt="Edit" width={40} height={40} onClick={handleEditClick} />
//                             )}
//                         </div>
//                         {Object.entries(userInfo).map(([key, value], index) => (
//                             <div key={index} className={classes.userInfoItem} style={{ borderBottom: index === Object.entries(userInfo).length - 1 ? 'none' : 'white solid 1px' }}>
//                                 <div>{key}</div>
//                                 {editMode && (key === 'name' || key === 'phoneNo') ? (
//                                     <>
//                                         {key === 'name' && nameError && <div style={{ color: 'red', alignContent: 'right' }}>{nameError}</div>}
//                                         {key === 'phoneNo' && phoneError && <div style={{ color: 'red' }}>{phoneError}</div>}
//                                         <input
//                                             type="text"
//                                             value={value}
//                                             onChange={(event) => handleChange(event, key)}
//                                             onFocus={() => handleFieldFocus(key)}
//                                             className={`${classes.userInfoInput} ${editMode && (key === 'name' || key === 'phoneNo') ? classes.editableInput : ''}`}
//                                         />
//                                     </>
//                                 ) : (
//                                     <div>{value}</div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className={classes.childStyle}>
//                     {/* Inner div for user profiles */}
//                     <div className={classes.flexContainer}>
//                         <h2 style={{ color: '#7011B6', textAlign: 'left' }}>Your Profiles</h2>
//                         <div className={classes.profileContainer}>
//                             {userProfiles.map((profile, index) => (
//                                 <div key={index} className={classes.profileItem}>
//                                     <Image src={profile.avatarUrl} alt="prfl" width={50} height={50} />
//                                     <div>{profile.profileName}</div>
//                                     {/* <div>ID: {profile.profileId}</div> */}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     {/* Inner div for user signed-in info */}
//                     <div className={classes.flexContainer}>
//                         <h2 style={{ color: '#7011B6', textAlign: 'left' }}>User Signed-in Info</h2>
//                         <div className={classes.profileContainer}>
//                             {userSignedInInfos.map((info, index) => (
//                                 <div key={index} className={classes.profileItem}>
//                                     <Image src={info.iconUrl} alt="prfl" width={50} height={50} />
//                                     <><div>Device ID: {info.deviceId}</div>
//                                         <div> {info.deviceName}</div></>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default UserProfile;
'use client';
import { AppShell, Box, Burger, Container, Divider, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';
import Navbar from '../(root)/components/Navbar';
import UserDetails from './userdetails';
import { Button } from '@mantine/core';
import { FaHistory } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { MdOutlinePlaylistAdd } from 'react-icons/md';
import themeOptions from '@/utils/colors';
import { FaRegHeart } from 'react-icons/fa';
import { GoPencil } from 'react-icons/go';
import { CiPower } from 'react-icons/ci';
import { useState } from 'react';
import History from './history';
import Favorites from './favourites';
import WatchList from './watchlist';
import useLoginStore from '@/Stores/LoginStore';
import searchMsApiUrls from '../api/searchMsApi';
import { useRouter } from 'next/navigation';

export default function UserProfile() {
  const [opened, { toggle }] = useDisclosure();
  const [page, setPage] = useState(1);

  //
  const router = useRouter();

  const handleLogout = async () => {
    const base_url = searchMsApiUrls();

    const state = useLoginStore.getState();
    const values = {
      email: state.email,
    };
    let res = await fetch(`${base_url}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        ...values,
      }),
    });

    let jsonData = await res.json();
    if (!res.ok) {
      console.log(jsonData);
    } else {
      console.log(jsonData);
      console.log('logout successful');
      localStorage.clear();
      useLoginStore.getState().clearState();
      console.log(useLoginStore.getState().clearState());
      router.push('/login');
    }
  };
  return (
    <AppShell
      header={{ height: 90 }}
      navbar={{ width: '18%', breakpoint: 'sm', collapsed: { mobile: !opened } }}
      aside={{ width: 0, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
      padding="md"
      withBorder={false}
    >
      <AppShell.Header style={{ backgroundColor: 'black' }}>
        {/* <Group h="100%" px="md">
                    <MantineLogo size={30} />
                </Group> */}
        <Group h="100%" px="md">
          <Navbar />
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            style={{ color: 'white', marginTop: '2rem' }}
          />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar
        style={{
          backgroundColor: themeOptions.color.button,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box
          style={{ display: 'flex', flexDirection: 'column', padding: '20px', paddingRight: '0' }}
        >
          <Button
            variant="filled"
            style={{
              height: '2.8rem',
              backgroundColor: page == 1 ? '#29113B' : themeOptions.color.button,
              borderTopLeftRadius: page == 1 ? '1.5rem' : null,
              borderBottomLeftRadius: page == 1 ? '1.5rem' : null,
              marginLeft: page == 1 ? '8%' : null,
              paddingRight: page == 1 ? '17%' : null,
              fontSize: themeOptions.fontSize.s,
            }}
            onClick={() => {
              setPage(1);
            }}
          >
            {' '}
            <CgProfile
              color="white"
              style={{ marginRight: '0.5rem', fontSize: themeOptions.fontSize.s }}
            />
            Profile
          </Button>
          <Button
            variant="filled"
            style={{
              height: '2.8rem',
              backgroundColor: page == 2 ? '#29113B' : themeOptions.color.button,
              borderTopLeftRadius: page == 2 ? '1.5rem' : null,
              borderBottomLeftRadius: page == 2 ? '1.5rem' : null,
              marginLeft: page == 2 ? '8%' : null,
              paddingRight: page == 2 ? '17%' : null,
              fontSize: themeOptions.fontSize.s,
            }}
            onClick={() => {
              setPage(2);
            }}
          >
            {' '}
            <FaHistory
              color="white"
              style={{ marginRight: '0.4rem', fontSize: themeOptions.fontSize.s }}
            />
            History
          </Button>
          <Button
            variant="filled"
            style={{
              height: '2.8rem',
              backgroundColor: page == 3 ? '#29113B' : themeOptions.color.button,
              borderTopLeftRadius: page == 3 ? '1.5rem' : null,
              borderBottomLeftRadius: page == 3 ? '1.5rem' : null,
              marginLeft: page == 3 ? '8%' : null,
              paddingRight: page == 3 ? '17%' : null,
              fontSize: themeOptions.fontSize.s,
            }}
            onClick={() => {
              setPage(3);
            }}
          >
            {' '}
            <FaRegHeart
              color="white"
              fontSize={themeOptions.fontSize.s}
              style={{ marginRight: '0.4rem', fontSize: themeOptions.fontSize.s }}
            />
            Favorites
          </Button>
          <Button
            variant="filled"
            style={{
              height: '2.8rem',
              backgroundColor: page == 4 ? '#29113B' : themeOptions.color.button,
              borderTopLeftRadius: page == 4 ? '1.5rem' : null,
              borderBottomLeftRadius: page == 4 ? '1.5rem' : null,
              marginLeft: page == 4 ? '8%' : null,
              paddingRight: page == 4 ? '17%' : null,
              fontSize: themeOptions.fontSize.s,
            }}
            onClick={() => {
              setPage(4);
            }}
          >
            {' '}
            <MdOutlinePlaylistAdd
              color="white"
              fontSize={themeOptions.fontSize.s}
              style={{ marginRight: '0.4rem', fontSize: themeOptions.fontSize.s }}
            />{' '}
            Watchlist
          </Button>
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <Divider style={{ width: '70%', margin: 'auto' }}></Divider>
          <Button
            variant="filled"
            style={{
              height: '2.8rem',
              backgroundColor: themeOptions.color.button,
              fontSize: themeOptions.fontSize.s,
            }}
          >
            <GoPencil style={{ marginRight: '0.5rem', fontSize: themeOptions.fontSize.s }} />
            <a href="/resetpassword" style={{ color: 'inherit', textDecoration: 'none' }}>
              Reset Password
            </a>{' '}
          </Button>
          <Button
            variant="filled"
            style={{
              height: '2.8rem',
              backgroundColor: themeOptions.color.button,
              fontSize: themeOptions.fontSize.s,
            }}
            onClick={() => {
              handleLogout();
            }}
          >
            <CiPower style={{ marginRight: '0.5rem', fontSize: themeOptions.fontSize.s }} />
            Log out
          </Button>
        </Box>
      </AppShell.Navbar>
      <AppShell.Main>
        <Box style={{ height: '100%', width: '100%', marginTop: '-1.2rem' }}>
          {page === 1 ? (
            <UserDetails />
          ) : page === 2 ? (
            <History />
          ) : page === 3 ? (
            <Favorites />
          ) : page === 4 ? (
            <WatchList />
          ) : null}
          {/* {page === 1 ? <UserDetails></UserDetails> : (page === 2 ? <History></History> : null)} */}
        </Box>
      </AppShell.Main>
      {/* <AppShell.Aside p="md">Aside</AppShell.Aside> */}
      {/* <AppShell.Footer p="md">Footer</AppShell.Footer> */}
    </AppShell>
  );
}
