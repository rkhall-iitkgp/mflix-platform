'use client';

// hard code to variable remaining
import React from 'react';
import { useForm } from '@mantine/form';
import { createStyles } from '@mantine/styles';
import {
  TextInput,
  PasswordInput,
  Text,
  // PaperProps,
  Button,
  // Divider,
  Flex,
  Box,
} from '@mantine/core';
// import { GoogleButton } from './GoogleButton';
import themeOptions from '../../../assets/themes/colors';
import { useState } from 'react';
import searchMsApiUrls from '../api/searchMsApi';
import Otp from '../verifyotp/page';
// import exp from 'constants';
import Mixpanel from '@/components/Mixpanel';
import useLoginStore from '@/Stores/LoginStore';

const ForgetPassword = (props: any) => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});

  const handleForgetPassword = async (values: any) => {
    const base_url = searchMsApiUrls();
    setUserData(values);
    values.type = "forgot";

    setFormData(values);
    console.log(values);
    setshowOtp(1);
    let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sendOTP`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...values,
      }),
    });
    let jsonData = await res.json();
    if (!res.ok) {
      console.log(jsonData.message);
      // router.push('/verifyotp')
    }
    //   setLoading(false);
    else {
      console.log(jsonData.message);
      // console.log(jsonData);
      // sessionStorage.setItem('sessionToken', jsonData.user.sessionToken);
      // sessionStorage.setItem('token', jsonData.user.token);
    }
  };

  const useStyles = createStyles(() => ({
    OuterBoxStyles: {
      fontFamily: 'Poppins, cursive', // Applying Poppins font
      backgroundImage: "url('/bg-home.png')",
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textWrap: 'wrap',
    },

    CentreBoxStyles: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingTop: '3rem',
      paddingBottom: '3rem',

      border: '1px solid #ccc',
      maxWidth: '30rem',
      width: '90vw',
      minHeight: '20rem',
      borderRadius: '15px',
      backdropFilter: 'blur(20px)',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      marginTop: '1.6rem',
    },

    FormStyles: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    ButtonStyles: {
      width: '70%',
      height: '3.5rem',
      backgroundColor: '#00664A',
      borderRadius: '1rem',
      fontSize: '1.5rem',
      fontWeight: 'normal',
      marginTop: '1.5rem',
    },
    ErrorStyles: {
      color: 'red',
      fontSize: '0.9rem',
      marginTop: '5px',
      minHeight: '1.2rem',
      width: '70%',
    },
  }));

  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      email: '',
      newPassword: '',
      confPassword: '',
      type: 'forgot',
      otp: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      newPassword: (val) =>
        val.length <= 8 ? 'Password should include at least 8 characters' : null,
      confPassword: (val, values) => (val != values.newPassword ? 'Password does not match' : null),
    },
  });
  const [showOtp, setshowOtp] = useState(0);

  return (
    <>
      {!showOtp ? (
        <Box className={classes.OuterBoxStyles}>
          <Text size="2.2rem" c={'white'} p={'1rem'}>
            Forget Password
          </Text>
          <Flex direction="row" justify="centre" align="center" gap={{ sm: 'lg' }}>
            <Text size="1.1rem" c={'white'}>
              Remember Your Password
            </Text>
            <a href="/login" style={{ color: themeOptions.color.textColorNormal }}>
              Sign in
            </a>
          </Flex>
          <Box className={classes.CentreBoxStyles}>
            <form
              onSubmit={form.onSubmit((values) => {
                handleForgetPassword(values);
              })}
              className={classes.FormStyles}
            >
              <TextInput
                required
                label="Email address"
                placeholder="Enter Your email address"
                value={form.values.email}
                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                // error={form.errors.email && 'Invalid email'}
                radius="md"
                size="lg"
                style={{ width: '70%', color: 'white' }}
                styles={{
                  input: {
                    background: 'transparent',
                    color: 'white',
                    borderColor: themeOptions.color.smallBox,
                  },
                  wrapper: {
                    marginTop: '0.1rem',
                  },
                  error: {
                    margin: '0rem',
                    padding: '0rem',
                  },
                  label: {
                    fontSize: '1rem',
                    fontWeight: 'normal',
                  },
                }}
              />
              <div className={classes.ErrorStyles}>
                {form.errors.email ? form.errors.email : ''}
              </div>
              <PasswordInput
                required
                label="Password"
                placeholder="Enter your new password"
                value={form.values.newPassword}
                onChange={(event) => form.setFieldValue('newPassword', event.currentTarget.value)}
                // error={form.errors.password && 'Password should include at least 8 characters'}
                radius="md"
                size="lg"
                style={{ width: '70%', color: 'white', marginTop: '0rem' }}
                styles={{
                  input: {
                    background: 'transparent',
                    color: 'white',
                    borderColor: themeOptions.color.smallBox,
                  },
                  wrapper: {
                    marginTop: '0.1rem',
                  },
                  error: {
                    margin: '0rem',
                    padding: '0rem',
                  },
                  label: {
                    fontSize: '1rem',
                    fontWeight: 'normal',
                  },
                }}
              />
              <div className={classes.ErrorStyles}>
                {form.errors.newPassword ? form.errors.newPassword : ''}
              </div>
              <PasswordInput
                required
                label="Confirm Password"
                placeholder="Enter your confirmed password"
                value={form.values.confPassword}
                onChange={(event) => form.setFieldValue('confPassword', event.currentTarget.value)}
                // error={form.errors.password && 'Password should include at least 8 characters'}
                radius="md"
                size="lg"
                style={{ width: '70%', color: 'white', marginTop: '0rem' }}
                styles={{
                  input: {
                    background: 'transparent',
                    color: 'white',
                    borderColor: themeOptions.color.smallBox,
                  },
                  wrapper: {
                    marginTop: '0.1rem',
                  },
                  error: {
                    margin: '0rem',
                    padding: '0rem',
                  },
                  label: {
                    fontSize: '1rem',
                    fontWeight: 'normal',
                  },
                }}
              />
              <div className={classes.ErrorStyles}>
                {form.errors.confPassword ? form.errors.confPassword : ''}
              </div>
              {/* <Box style={{ display: 'flex', flexDirection: 'row-reverse', width: '70%' }}>
                        <a href="" style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'normal', padding: '0.2rem' }} >Forget Password?</a>
                    </Box> */}
              <Button
                // className={classes.ButtonStyles}
                style={{
                  width: '70%',
                  height: '3.5rem',
                  backgroundColor: '#00664A',
                  borderRadius: '1rem',
                  fontSize: '1.5rem',
                  fontWeight: 'n]=ormal',
                  marginTop: '1.5rem',
                }}
                type="submit"
                radius="xl"
              >
                Send OTP
              </Button>

              {/* <Divider label="Or " labelPosition="center" my="lg" style={{ color: 'white', width: '80%' }} styles={{

                        label: {
                            color: 'white',
                        },
                    }} /> */}
              {/* <Box style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-evenly', width: '80%' }}> */}
              {/* <Text size="1.2rem" c={'white'} p={'1rem'} style={{ marginRight: '1rem' }}> Continue With:</Text> */}
              {/* <GoogleButton radius="xl" size='lg' style={{ marginBottom: '1rem' }}>Google</GoogleButton> */}
              {/* </Box> */}
            </form>
          </Box>
        </Box>
      ) : (
        <Otp initialValues={formData}></Otp>
      )}
    </>
  );
};

export default ForgetPassword;
