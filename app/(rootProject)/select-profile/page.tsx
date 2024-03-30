'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { createStyles } from '@mantine/styles';
import { useLogger, useMediaQuery } from '@mantine/hooks';
import useLoginStore from '@/Stores/LoginStore';
import searchMsApiUrls from '@/app/(rootProject)/api/searchMsApi';
import useUserStore from '@/Stores/UserStore';

import avatarLogo1 from '@/assets/icons/profile1.svg';
import avatarLogo2 from '@/assets/icons/profile2.svg';
import avatarLogo3 from '@/assets/icons/profile3.svg';
import addMoreLogo from '@/assets/icons/add-more.svg';
import themeOptions from '@/assets/themes/colors';
import { useRouter } from 'next/navigation';


const headingFZ = '5vw';
const url = searchMsApiUrls();

interface Profile {
  id: number;
  caption: string;
  link: string;
  image: string;
  index: number;
}

// interface newProfile {
//     activeUsr: string;
// }

const ImageArray = [avatarLogo1, avatarLogo2, avatarLogo3];

const SelectProfile: React.FC = () => {
  const [currentProfile, setCurrentProfile] = useState([]);
  const [changedType, setChangedType] = useState([]);
  const state = useUserStore.getState();
  const router = useRouter();

  useEffect(() => {
    const getActiveUsers = async () => {
      const base_url = searchMsApiUrls();
      const user_id = state._id;

      //   console.log(base_url);
      let res = await fetch(`${base_url}/user/details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      let jsonData = await res.json();
      //   console.log('Hello', res.ok);
      if (!res.ok) {
        console.log(jsonData);
      } else {
        console.log(jsonData);
        setCurrentProfile(jsonData.account.userProfiles);
      }
      console.log('userprofiles', jsonData.account.userProfiles);
    };
    getActiveUsers();
  }, []);   

  useEffect(() => {
    ConvertType();
  }, [currentProfile]);

  const [length, setLength] = useState(0);

  const AddProfile = async () => {
    try {
      const response = await fetch(`${url}/user/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ userName: `Profile ${currentProfile.length + 1}` }),
      });
      console.log(response);
      return await response.json();
    } catch (error) {
      console.log('Unable to connect:', error);
      return { ok: false };
    }
  };

  const ConvertType = () => {
    console.log('currentProfile', currentProfile);
    const transformedArray = currentProfile.map((item, index) => {
      console.log(item, index);
      return {
        id: item._id || `${index}`,
        caption: item.name || `Profile ${index + 1}`,
        link: '/',
        image: ImageArray[0],
        index:index,
      };
    });
    transformedArray.push({
      id: transformedArray.length + 1,
      caption: 'Add New',
      link: 'null',
      image: addMoreLogo,
      index: -1,
    });
    console.log('transforemedArray:', transformedArray);
    setChangedType(transformedArray);
    if(transformedArray.length == 6){
        transformedArray.pop();
    }
  };

  const { classes } = useStyles();
  const profilesPerRow = 5;
  const newProfile = {
    _id: "",
    name: "",
    index: 0,
  }

  const handleProfileClick = (profile:any) => {
    if (profile.link === 'null') {
      handleAddProfile();
    } else if (profile.link) {
        newProfile._id = profile.id
        newProfile.name = profile.name
        newProfile.index = profile.index 
        state.updateUser(
            newProfile,
        );
        console.log(newProfile);
        router.push('/');
    }
  };

  const handleAddProfile = async () => {
    if (currentProfile.length >= 5) {
        console.log('Maximum number of profiles reached');
        return;
    }

    let newProfileData = await AddProfile();
    if (!newProfileData.success) {
      console.log('addProfile error');
      return;
    }
    console.log('New profile data', newProfileData);
    setCurrentProfile(newProfileData.account.userProfiles);
  };

  const renderProfiles = () => {
    const profileRows = [];
    for (let i = 0; i < changedType.length; i += profilesPerRow) {
      profileRows.push(
        <div className={classes.containerStyle} key={i}>
          {changedType.slice(i, i + profilesPerRow).map((profile, index) => (
            <div
              key={index}
              className={classes.itemStyle}
              onClick={() => handleProfileClick(profile)}
            >
              <Image
                className={classes.avatarStyle}
                src={profile.image}
                alt={profile.caption}
                width={150}
                height={150}
              />
              <span style={{ textAlign: 'center', fontSize: '2vw' }}>{profile.caption}</span>
            </div>
          ))}
        </div>
      );
    }
    return profileRows;
  };

  return (
    <div
      style={{
        backgroundColor: '#140320',
        minHeight: '100vh',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <div>
        <div className={classes.headingStyle}>Who's watching?</div>
        {renderProfiles()}
      </div>
    </div>
  );
};

const useStyles = createStyles(() => ({
  containerStyle: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    minWidth: '70vw',
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

export default SelectProfile;
