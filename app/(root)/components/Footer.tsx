'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createStyles } from '@mantine/styles';

// Styles for the footer sections
const styles = createStyles(() => ({
  logoStylesText: {
    fontSize: '1.875rem',
    lineHeight: '2.25rem',
    fontWeight: 700,
    color: 'white',
    textDecorationLine: 'none',
    '&:hover': {
      color: 'gray',
    },
  },
  infoStylesRoot: {
    width: '100%',
    maxWidth: 300,
    paddingLeft: '2rem',
    paddingRight: '2rem',
    marginTop: '2rem',
  },
  infoStylesTitle: {
    color: 'rgb(156, 163, 175)',
    fontWeight: 600,
    marginBottom: '0.5rem',
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
  },
  infoStylesLink: {
    '--tw-text-opacity': 1,
    color: 'rgb(75 85 99)',
    display: 'block',
    marginBottom: '0.5rem',
    textDecoration: 'none',
    '&:hover': {
      color: 'gray',
    },
  },
  // ulStyle: {
  //   listStyleType: 'none',
  //   marginTop: '0.5rem',
  //   paddingLeft: '0',
  //   textDecoration: 'none',
  // },

  // contactStylesRoot: {
  //   width: '100%',
  //   maxWidth: 300,
  //   paddingLeft: 20,
  //   marginTop: 32,
  // },
  // contactStylesTitle: {
  //   color: 'gray',
  //   fontWeight: 500,
  //   marginBottom: 8,
  //   fontSize: 18,
  // },
  // contactStylesLink: {
  //   color: 'rgb(75 85 99)',
  //   display: 'block',
  //   marginBottom: '0.5rem',
  //   textDecoration: 'none',
  //   '&:hover': {
  //     color: 'gray',
  //   },
  // },

  // findUsStylesRoot: {
  //   width: '100%',
  //   maxWidth: 300,
  //   paddingLeft: 20,
  //   marginTop: 32,
  // },
  // findUsStylesTitle: {
  //   color: 'gray',
  //   fontWeight: 500,
  //   marginBottom: 8,
  //   fontSize: 18,
  // },
  // findUsStylesText: {
  //   color: 'rgb(75 85 99)',
  //   fontSize: '0.875rem',
  //   lineHeight: '1.25rem',
  //   marginBottom: 12,
  //   marginTop: 0,
  //   textDecoration: 'none',
  // },
  // findUsStylesLink: {
  //   display: 'inline-flex',
  //   alignItems: 'center',
  //   marginTop: '0.5rem',
  //   color: 'rgb(75 85 99)',
  //   '&:hover': {
  //     color: 'gray',
  //   },
  // },
  ulStyle: {
    listStyleType: 'none',
    marginTop: '0.5rem',
    paddingLeft: '0',
    textDecoration: 'none',
  },

  contactStylesRoot: {
    width: '100%',
    maxWidth: 300,
    paddingLeft: 20,
    marginTop: 32,
  },
  contactStylesTitle: {
    color: 'gray',
    fontWeight: 500,
    marginBottom: 8,
    fontSize: 18,
  },
  contactStylesLink: {
    color: 'rgb(75 85 99)',
    display: 'block',
    marginBottom: '0.5rem',
    textDecoration: 'none',
    '&:hover': {
      color: 'gray',
    },
  },

  findUsStylesRoot: {
    width: '100%',
    maxWidth: 300,
    paddingLeft: 20,
    marginTop: 32,
  },
  findUsStylesTitle: {
    color: 'gray',
    fontWeight: 500,
    marginBottom: 8,
    fontSize: 18,
  },
  findUsStylesText: {
    color: 'rgb(75 85 99)',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    marginBottom: 12,
    marginTop: 0,
    textDecoration: 'none',
  },
  findUsStylesLink: {
    display: 'inline-flex',
    alignItems: 'center',
    marginTop: '0.5rem',
    color: 'rgb(75 85 99)',
    '&:hover': {
      color: 'gray',
    },
  },
  pStyle: {
    color: 'rgb(156, 163, 175)',
    padding: '2.5rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
  footStyle: {
    color: 'white',
    padding: '2rem',
    paddingTop: '4rem',
    paddingBottom: '2rem',
    background: '#0B0212',
  },

  divStyle: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoDivStyle: {
    width: '100%',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    marginTop: '2rem',
  },
}));

function Footer() {
  const { classes } = styles();

  return (
    <footer className={classes.footStyle}>
      <div className={classes.divStyle}>
        {/* Logo Section */}
        <div className={classes.logoDivStyle}>
          <Link href="/" className={classes.logoStylesText}>
            <Image src={'/logo.svg'} alt="Logo" width={100} height={100} />
          </Link>
        </div>

        <div className={classes.infoStylesRoot}>
          <h4 className={classes.infoStylesTitle}>INFO</h4>
          <ul className={classes.ulStyle}>
            <li>
              <Link href="#" className={classes.infoStylesLink}>
                Phone: +1 (234) 567-8888
              </Link>
            </li>
            <li>
              <Link href="#" className={classes.infoStylesLink}>
                Email: info@yourcompany.com
              </Link>
            </li>
          </ul>
        </div>
        <div className={classes.contactStylesRoot}>
          <h4 className={classes.contactStylesTitle}>CONTACT US</h4>
          <ul className={classes.ulStyle}>
            <li>
              <Link href="#" className={classes.contactStylesLink}>
                Address Line 1
              </Link>
            </li>
            <li>
              <Link href="#" className={classes.contactStylesLink}>
                Address Line 2
              </Link>
            </li>
          </ul>
        </div>
        <div className={classes.findUsStylesRoot}>
          <h4 className={classes.findUsStylesTitle}>FIND US</h4>

          <p className={classes.findUsStylesText}>We are located at:</p>
          <Link
            href="https://maps.google.com/"
            target="_blank"
            rel="noreferrer noopener"
            className={classes.findUsStylesLink}
          >
            Google Maps
          </Link>
        </div>
      </div>
      <p className={classes.pStyle}>&copy; 2024 - Copyright</p>
    </footer>
  );
}

export default Footer;
