'use client';

import Link from 'next/link';
import React from 'react';
import { createStyles } from '@mantine/styles';
import themeOptions from '@/utils/colors';
import { FaSearch } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { ActionIcon, Divider, Menu, Button } from '@mantine/core';
import { IoCloseOutline } from 'react-icons/io5';
import NavSearch from '@/app/(rootProject)/(root)/components/NavSearch';
import { usePathname } from 'next/navigation';
import searchMsApiUrls from '../../api/searchMsApi';
import { IoIosArrowDown } from "react-icons/io";
import IconUserCircle from "@/assets/icons/profile.svg"
import { useHover, useMediaQuery } from '@mantine/hooks';
import {
  IconSettings,
  IconLogout,
} from '@tabler/icons-react';

import useLoginStore from '@/Stores/LoginStore';



export default function Navbar() {
  const path = usePathname();
  const [input, setInput] = React.useState('');
  const isSmallScreen = useMediaQuery('(max-width: 1300px)');
  const [isTyping, setIsTyping] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { hovered: categoryHovered, ref: categoryRef } = useHover();
  const { hovered: dropdownHovered, ref: dropdownRef } = useHover();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const searchBoxRef = useRef<HTMLDivElement>(null);
  const state = useLoginStore.getState();
  const [profiles, setProfiles] = useState<any[]>(state.userProfiles);
  // setProfiles(state.userProfiles);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleCloseClick = () => {
    setIsSearchOpen(false); // Close the search box
  };

  const checkLoginStatus = () => {
    const user = localStorage.getItem('user');
    return !!user;
    // return true;
  };

  useEffect(() => {
    setIsLoggedIn(checkLoginStatus()); // Update isLoggedIn state when component mounts
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const handleLogOut = async () => {
    const values = {
      flag: 1,
    };
    const base_url = searchMsApiUrls();
    const token = sessionStorage.getItem('accessToken');
    await fetch(`${base_url}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...values,
      }),
    }).then(async (res) => {
      let jsonData = await res.json();
      if (!res.ok) {
        console.log(jsonData);
      } else {
        sessionStorage.removeItem('accessToken');
        console.log('Logout successful');
      }
    });
  };

  const useStyles = createStyles(() => ({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '10vh',
      // padding: '1rem',
      paddingLeft: '2rem',
      paddingRight: '2rem',
      paddingTop: '0rem',
      width: '100%',
      color: 'white',
      backgroundColor: themeOptions.color.black,
      position: 'fixed',
      transition: 'top 0.3s ease-in-out',
      // marginBottom:'500px',
    },
    search: {
      height: '20px',
      width: '50px',
      marginTop: '5px',
      '&:hover': {
        color: 'gray',
        cursor: 'pointer',
      },
    },
    icon: {
      width: '2rem',
      height: '1rem',
      color: themeOptions.color.divider,
      marginRight: '0.5rem',
    },
    logo: {
      height: '2rem',
      marginLeft: '1rem',
      marginRight: '3rem',
    },
    logoDiv: {
      display: 'flex',
      alignItems: 'center',
      padding: '1rem',
    },
    activeLink: {
      fontWeight: 'bold',
    },
    links: {
      display: 'flex',
      padding: '1rem',
      marginLeft: '1rem',
      marginRight: '1rem',
      marginTop: '2rem',
      listStyle: 'none',
    },
    link: {
      padding: '1rem',
      marginLeft: '1.5rem',
      marginRight: '1.5rem',
      textDecoration: 'none',
      fontSize: '1.25rem',
      color: 'white',
      '&:hover': {
        color: 'rgb(156, 163, 175)',
      },
      alignItems: 'center',
    },
    premium: {
      marginRight: '1.5rem',
      height: '2.3rem',
      width: '7rem',
      display: 'flex',
      transition: '0.3s',
      alignItems: 'center',
      '&:hover': {
        background: themeOptions.color.button,
        cursor: 'pointer',
      },
      border: '2px solid',
      borderRadius: '8px',
      borderColor: themeOptions.color.smallBox,
      color: themeOptions.color.smallBox,
    },
    link2: {
      textDecoration: 'none',
      fontSize: '1.25rem',
      marginLeft: '0.8rem',
      // marginTop:'3rem',
      color: themeOptions.color.divider,
    },
    visible: {
      top: 0,
    },
    hidden: {
      top: '-4rem',
    },
    dropdown: {
      display: categoryHovered || dropdownHovered ? 'flex' : 'none',
      position: 'absolute',
      background: themeOptions.color.categories,
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      height: '20rem',
      width: '40rem',
      cursor: 'default',
      top: '100%',
      zIndex: 1000,
      marginLeft: '-15rem',
      justifyContent: 'space-around',
    },
    genre: {
      fontSize: '1.25rem',
      padding: '0',
      display: 'flex',
      height: '3.5rem',
      width: '8rem',
      span: {
        marginTop: '0.3rem',
        fontSize: '1.2rem',
        marginLeft: '0.5rem',
        transition: '0.2s ease'
      },
      '&:hover': {
        color: 'rgb(156, 163, 175)',
        cursor: 'pointer',
        span: {
          rotate: '180deg',
          marginBottom: '1.6rem',
        }
      },
    },
    inside: {
      display: 'grid',
      // gap: '1rem',
      textDecoration: 'none',
      color: 'white',
    },
    category: {
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      overflow: 'hidden',
      width: '18rem',
      listStyle: 'none',
      alignItems: 'left',
      p: {
        margin: '0.3rem',
        paddingLeft: '0.6rem',
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        paddingRight: '0.3rem',
        // width: '9rem',
        // paddingInline:'1rem',
        transition: '0.1s ease',
        '&:hover': {
          background: 'white',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          a: {
            color: 'black',
          },
        },
      },
      a: {
        color: themeOptions.color.normalTextColor,
        opacity: '0.75',
        textDecoration: 'none',
      },
    },
    navsearch: {
      marginLeft: isSmallScreen ? '-1rem' : '-31rem',
      marginTop: isSmallScreen ? '-10px' : '-70px',
      width: '30rem',
      height: '20px',
      position: 'absolute',
    },
    profile: {
      fontSize: '1.25rem',
      padding: '0',
      display: 'flex',
      height: '3.5rem',
      marginLeft: '1rem',
      marginRight: '-2rem',
      width: '8rem',
      '&:hover': {
        color: 'rgb(156, 163, 175)',
        cursor: 'pointer',
      },
    },
    profdown: {
      display: categoryHovered || dropdownHovered ? 'block' : 'none',
      position: 'absolute',
      background: themeOptions.color.categories,
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      cursor: 'default',
      top: '100%',
      zIndex: 1000,
      marginLeft: '-1rem',
      listStyle: 'none',
      justifyContent: 'space-around',
      p: {
        textDecoration: 'none',
      }
    }

  }));

  const { classes } = useStyles();

  return (
    <nav>
      <div
        className={`${classes.container} ${visible ? classes.visible : classes.hidden}`}
        style={{ zIndex: '220' }}
      >
        {/* Logo */}
        <div className={classes.logoDiv}>
          <img src="/logo.svg" alt="Logo" className={classes.logo} />
        </div>

        {/* Links */}
        <ul className={classes.links}>
          <li>
            {path !== '/' && (
              <div>
                {isSearchOpen ? (
                  <>
                    <div>
                      <ActionIcon size={30} variant="transparent" onClick={handleCloseClick} style={{ marginRight: '5px' }}>
                        <IoCloseOutline color={themeOptions.color.divider} size={30} />
                      </ActionIcon>
                      <div
                        style={{
                          marginLeft: isSmallScreen ? '-11rem' : '-31rem',
                          marginTop: isSmallScreen ? '-20px' : '-70px',
                          width: '30rem',
                          height: '20px',
                          position: 'absolute',
                          zIndex: '40',
                        }}
                      >
                        <NavSearch />
                      </div>
                    </div>
                  </>
                ) : (
                  <FaSearch className={classes.search} onClick={handleSearchClick} />
                )}
              </div>
            )}
          </li>
          <li>
            <Link href="/" className={`${classes.link} ${path === '/' ? classes.activeLink : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <div className={classes.genre} ref={dropdownRef}>
              Categories
              <span><IoIosArrowDown /></span>
              <div className={classes.dropdown} ref={categoryRef}>
                <div className={classes.inside}>
                  <p style={{ margin: '1rem', marginTop: '0', marginLeft: '0.5rem' }}>Genres</p>
                  <div className={classes.category}>
                    <p><Link href="#">Drama</Link></p>
                    <p><Link href="#">Comedy</Link></p>
                    <p><Link href="#">Romance</Link></p>
                    <p><Link href="#">Crime</Link></p>
                    <p><Link href="#">Thriller</Link></p>
                    <p><Link href="#">Action</Link></p>
                    <p><Link href="#">Adventure</Link></p>
                    <p><Link href="#">Documentary</Link></p>
                    <p><Link href="#">Horror</Link></p>
                  </div>
                </div>
                <div className={classes.inside}>
                  <p style={{ margin: '1rem', marginTop: '0', marginLeft: '0.5rem' }}>Languages</p>
                  <div className={classes.category}>
                    <p><Link href="#">English</Link></p>
                    <p><Link href="#">Hindi</Link></p>
                    <p><Link href="#">French</Link></p>
                    <p><Link href="#">Spanish</Link></p>
                    <p><Link href="#">German</Link></p>
                    <p><Link href="#">Italian</Link></p>
                    <p><Link href="#">Japanese</Link></p>
                    <p><Link href="#">Russian</Link></p>
                    <p><Link href="#">Mandarin</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            {!isLoggedIn ? (
              <Link href="/login" className={`${classes.link} ${path === '/login' ? classes.activeLink : ''}`}>
                Login
              </Link>
            ) : (
              <Menu trigger="hover" openDelay={100} closeDelay={50} >
                <Menu.Target>
                  <Button bg={'none'} size={'20'} style={{ fontWeight: '400' }}>Profile</Button>
                </Menu.Target>

                <Menu.Dropdown bg={themeOptions.color.categories} style={{ borderRadius: '1rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                  {profiles.map((profile, index) => (
                    <Menu.Item
                      key={index}
                      leftSection={<IconUserCircle style={{ width: '2rem', height: '2rem' }} />}
                    >
                      {profile.name}
                    </Menu.Item>
                  ))}
                  <Menu.Item leftSection={<IconSettings style={{ width: '2rem', height: '2rem' }} />}>
                    <Link href="/userprofile" style={{ textDecoration: 'none', color: 'white', opacity: '0.8' }}>User Profile</Link>
                  </Menu.Item>
                  <Menu.Item leftSection={<IconLogout style={{ width: '2rem', height: '2rem' }} />}>
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </li>
          <li className={classes.premium}>
            <Link href="/pricing" className={classes.link2}>
              Premium
            </Link>
          </li>
        </ul>
      </div>
      <div style={{ width: '100%', height: '50px' }}></div>
    </nav>
  );
}