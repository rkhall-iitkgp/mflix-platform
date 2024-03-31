'use client';

// import { useRouter } from 'next/router';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { DateInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { createStyles } from '@mantine/styles';
import { useRouter } from 'next/navigation'

// import Link from 'next/link';
import { NumberInput } from '@mantine/core';

import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Flex,
  Box,
  useStyles,
} from '@mantine/core';
import { GoogleButton } from '../login/GoogleButton';
import  Otp  from '../verifyotp/page';
import searchMsApiUrls from '../api/searchMsApi';
import { useState } from 'react';
import useLoginStore from '@/Stores/LoginStore';

export default function Register(props: any) {
  // const router = useRouter()
  const [showOtp, setshowOtp] = useState(0);
  
  const [formData, setFormData] = useState({});
  const handleExistence = ()=>{
    console.log("hehehe")
   
  }

  //toastify
 

  // const router = useRouter();
  const[exists, setExists] = useState(true);
  
  const handleRegister = async (values: any) => {
    
    // setshowOtp(1);
    const base_url = searchMsApiUrls();
    // setUserData(values);
    console.log(values);
    setFormData(values);
    const userData = {
      email: values.email,
      type: 'register',
    };
    console.log(userData);
    let res = await fetch(`${base_url}/auth/sendOTP`, {
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
      console.log("User already exists");
      setExists(true);
      console.log(exists);
      setshowOtp(0);
      handleExistence();
      toast.error("Email Id already exists!", {
        position:"top-center"
      });
      

    
      // router.push('/verifyotp')
    }
    //   setLoading(false);
    else {
      console.log(jsonData.message);
      console.log(jsonData);

      setshowOtp(1)
      // router.push('userprofile');
      // sessionStorage.setItem('sessionToken', jsonData.user.sessionToken);
      // sessionStorage.setItem('token', jsonData.user.token);
    }
  };
  // const [type, toggle] = useToggle(['login', 'register'])

  const useStyles = createStyles(() => ({
    container: {
      padding: '1rem',
      position: 'relative',
      background: 'linear-gradient(to right, red, #77C895)',
      zIndex: 0,
    },
  }));

  const form = useForm({
    initialValues: {
      name: '',
      dob: '',
      phone: '',
      email: '',
      newPassword: '',
      confPassword: '',
      type: 'register',
      otp: '',
      flag: 0,
    },

    validate: {
      name: (val) => (!val ? 'Required' : null),
      dob: (val) => (!val ? 'Required' : null),
      phone: (val) => (val.toString().length <= 10 ? 'Invalid Phone No.' : null),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      newPassword: (val) =>
        val.length <= 5 ? 'Password should include at least 6 characters' : null,
      confPassword: (val, values) => (val != values.newPassword ? 'Password does not match' : null),
    },
  });
  const handlePhoneNumberChange = (value: any) => {
    form.setFieldValue('phone', value);
    console.log(value);
    const number = value.toString();
    console.log('Length of value:', number.length); // Output the length of the value
  };

  return (
    <>
      {!showOtp && exists ? (
        <Flex
          style={{
            backgroundImage: "url('/bg-home.png')",
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            // border:"10px solid yellow",
            backgroundPosition: 'center',
          }}
          h="100vh"
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
        >
          {/* <BackgroundImage src='Group 18.png'> */}
          <Text size="2.5rem" c={'white'} p={'1rem'}>
            Create new account
          </Text>
          <Flex direction="row" justify="centre" align="center" gap={{ sm: 'lg' }}>
            <Text size="1.1rem" c={'white'}>
              Already have an account?
            </Text>
            <a href="/login" style={{ color: '#00664A' }}>
              Log In
            </a>
          </Flex>
          {/* border: 1px solid;

border-image-source: linear-gradient(166.93deg, #AFAFAF 3.24%, rgba(96, 96, 96, 0) 96.43%),
linear-gradient(317.92deg, rgba(255, 255, 255, 0.6) 1.48%, rgba(0, 0, 0, 0) 67.95%);
 */}

          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              border: '1px solid white',
              padding: '1rem', // Adjust padding as per your requirement
              width: '45rem',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              marginTop: '0.5rem',
            }}
          >
            {/* <form style={{display:"flex", flexDirection:"column"}} onSubmit={form.onSubmit((values) => console.log(values))}> */}
            {/* <Otp></Otp> */}
            <form
              onSubmit={form.onSubmit((values) => {
                handleRegister(values);
              })}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',

                alignItems: 'center',
                padding: '1rem',
              }}
            >
              <div
                style={{
                  marginTop: '1rem',
                  width: '100%',
                  maxWidth: '800px',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  required
                  label="Name"
                  placeholder="Enter Your Name"
                  value={form.values.name}
                  onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                  // error={form.errors.name && 'Required'}
                  radius="md"
                  size="lg"
                  style={{ width: '45%', color: 'white' }}
                  styles={{
                    input: {
                      background: 'transparent',
                      color: 'white',
                      borderColor: '#77C895',
                    },
                  }}
                />{' '}
                <p
                  style={{
                    position: 'absolute',
                    marginTop: '16%',
                    left: '17%',
                    color: 'red',
                  }}
                >
                  {form.errors.name}
                </p>
                <TextInput
                  required
                  label="Email Id"
                  placeholder="Enter Your Email Id"
                  value={form.values.email}
                  radius="md"
                  onChange={(event) => {
                    form.setFieldValue('email', event.currentTarget.value);
                  }}
                  // error={form.errors.email && 'Required'}
                  size="lg"
                  style={{ width: '45%', color: 'white' }}
                  styles={{
                    input: {
                      background: 'transparent',
                      color: 'white',
                      borderColor: '#77C895',
                    },
                  }}
                />
                <p
                  style={{
                    position: 'absolute',
                    marginTop: '16%',
                    left: '52%',
                    color: 'red',
                  }}
                >
                  {form.errors.email}
                </p>
              </div>
              <div
                style={{
                  marginTop: '0.5rem',
                  paddingTop: '0.5rem',
                  width: '100%',
                  maxWidth: '800px',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
              >
                <DateInput
                  required
                  label="Date of Birth"
                  value={form.values.dob ? new Date(form.values.dob) : null}
                  onChange={(value) => {
                    if (value instanceof Date && !isNaN(value.getTime())) {
                      form.setFieldValue('dob', value.toDateString());
                    } else {
                      form.setFieldValue('dob', '');
                    }
                  }}
                  valueFormat="DD MMM YYYY"
                  placeholder="Pick date "
                  radius="md"
                  size="lg"
                  style={{ width: '45%', color: 'white' }}
                  styles={{
                    input: {
                      background: 'transparent',
                      color: 'white',
                      borderColor: '#77C895',
                    },
                  }}
                />

                <p
                  style={{
                    position: 'absolute',
                    marginTop: '16%',
                    left: '17%',
                    color: 'red',
                  }}
                >
                  {form.errors.dob}
                </p>

                <NumberInput
                  label="Mobile Number"
                  placeholder="Enter Your Mobile No."
                  hideControls
                  value={form.values.phone}
                  onChange={handlePhoneNumberChange}
                  // error={form.errors.phone && 'Invalid Mobile No.'}
                  radius="md"
                  min={10}
                  size="lg"
                  style={{ width: '45%', color: 'white' }}
                  styles={{
                    input: {
                      background: 'transparent',
                      color: 'white',
                      borderColor: '#77C895',
                    },
                  }}
                />
                <p
                  style={{
                    position: 'absolute',
                    marginTop: '16%',
                    left: '52%',
                    color: 'red',
                  }}
                >
                  {form.errors.phone}
                </p>
              </div>
              <PasswordInput
                required
                label="Password"
                placeholder="Enter Your password"
                value={form.values.newPassword}
                onChange={(event) => form.setFieldValue('newPassword', event.currentTarget.value)}
                // error={form.errors.password && 'Password should include at least 6 characters'}
                radius="md"
                size="lg"
                style={{
                  width: '95%',
                  maxWidth: '800px',
                  color: 'white',
                  marginTop: '0.5rem',
                  paddingTop: '0.5rem',
                }}
                styles={{
                  input: {
                    background: 'transparent',
                    color: 'white',
                    borderColor: '#77C895',
                  },
                }}
              />
              <p
                style={{
                  position: 'absolute',
                  marginTop: '39%',
                  left: '17%',
                  color: 'red',
                }}
              >
                {form.errors.newPassword}
              </p>
              <PasswordInput
                required
                label="Confirm Password"
                placeholder="Confirm Your Password"
                value={form.values.confPassword}
                onChange={(event) => form.setFieldValue('confPassword', event.currentTarget.value)}
                // error={form.errors.confPassword && 'Password does not match'}
                radius="md"
                size="lg"
                style={{
                  width: '95%',
                  maxWidth: '800px',
                  color: 'white',
                  marginTop: '0.5rem',
                  paddingTop: '0.5rem',
                }}
                styles={{
                  input: {
                    background: 'transparent',
                    color: 'white',
                    borderColor: '#77C895',
                  },
                }}
              />
              <p
                style={{
                  position: 'absolute',
                  marginTop: '52%',
                  left: '17%',
                  color: 'red',
                }}
              >
                {form.errors.confPassword}
              </p>

              <Anchor
                type="submit"
                style={{
                  textDecoration: 'none',
                  marginTop: '1rem',
                  marginLeft: '22%',
                  width: '50%',
                  height: '3rem',
                }}
                href="/verifyotp"
              >
                <Button
                  // onClick={() => {

                  //   // console.log('clicked');
                  //   notifications.show({
                  //     title: 'Default notification',
                  //     message: 'Hey there, your code is awesome! 🤥',
                  //   })


                  // }}
                  
                  type="submit"
                  style={{
                    marginTop: '1rem',
                    width: '50%',
                    height: '3rem',
                    backgroundColor: '#00664A',
                    borderRadius: '1rem',
                    fontSize: '1rem',
                  }}
                >
                  Sign Up
                </Button>
                
                {/* </Link> */}
              </Anchor>
            </form>
          </Box>
        </Flex>
      ) : (
        <Otp initialValues={formData}></Otp>
      )}
      <ToastContainer
      style={{}}/> 
    </>
  );  
}