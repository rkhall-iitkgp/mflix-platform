"use client"

import { useRouter } from 'next/router';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
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
    Flex, Box
} from '@mantine/core';
import { GoogleButton } from '../login/GoogleButton';
import Otp from '../verifyotp/page';
// import { TwitterButton } from './TwitterButton';
import searchMsApiUrls from '../api/searchMsApi';
import { useState } from 'react';



export function Register(props: PaperProps) {
    const [showOtp, setshowOtp] = useState(0)
    const [formData, setFormData] = useState({})

    // const router = useRouter();
    const handleRegister = async (values: any) => {
        setshowOtp(1);

        const base_url = searchMsApiUrls()
        // setUserData(values);
        console.log(values);
        setFormData(values);
        const userData = {
            "email": values.email,
            "flag": 0
        }
        console.log(userData)
        let res = await fetch(`${base_url}/auth/sendOTP`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...values,
            }),
        })
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
    // const [type, toggle] = useToggle(['login', 'register'])
    const form = useForm({
        initialValues: {
            name: '',
            dob: '',
            phone: '',
            email: '',
            password: '',
            confPassword: '',
            terms: true,
            otp: '',
            flag: 0
        },

        validate: {
            name: (val) => (!val ? 'Required' : null),
            dob: (val) => (!val ? 'Required' : null),
            phone: (val) => (val.toString().length < 10 ? 'Invalid Phone No.' : null),
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
            confPassword: (val, values) => (val != values.password ? 'Password does not match' : null),

        },
    });
    const handlePhoneNumberChange = (value: any) => {
        form.setFieldValue('phone', value);
        console.log(value);
        const number = value.toString();
        console.log("Length of value:", number.length); // Output the length of the value
    };

    return (
        <>
            {!showOtp ?
                <Flex
                    style={{
                        backgroundImage: "url('background.png')",
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                        // border:"10px solid yellow",
                        backgroundPosition: 'center',
                    }}
                    h='100vh'
                    justify="center"
                    align="center"
                    direction="column"
                    wrap="wrap" >
                    {/* <BackgroundImage src='Group 18.png'> */}
                    <Text size="2.5rem" c={'white'} p={'1rem'}>Create new account</Text>
                    <Flex direction="row" justify="centre"
                        align="center" gap={{ sm: 'lg' }}>
                        <Text size="1.1rem" c={'white'}  >Already have an account?
                        </Text>
                        <a href="/login" style={{ color: '#9441D0' }}>Log In</a>
                    </Flex>
                    {/* border: 1px solid;

border-image-source: linear-gradient(166.93deg, #AFAFAF 3.24%, rgba(96, 96, 96, 0) 96.43%),
linear-gradient(317.92deg, rgba(255, 255, 255, 0.6) 1.48%, rgba(0, 0, 0, 0) 67.95%);
 */}



                    <Box style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        // border: '3px solid #ccc ',
                        // borderImageSource: 'linear-gradient(166.93deg, #AFAFAF 3.24%, rgba(96, 96, 96, 0) 96.43%), linear-gradient(317.92deg, rgba(255, 255, 255, 0.6) 1.48%, rgba(0, 0, 0, 0) 67.95%)',
                        // borderImageSlice: 1, 
                        border: '1px solid white',
                        // padding: '10px', // Adjust padding as needed
                        // backgroundImageSource: 'linear-gradient(166.93deg, #AFAFAF 3.24%, rgba(96, 96, 96, 0) 96.43%), linear-gradient(317.92deg, rgba(255, 255, 255, 0.6) 1.48%, rgba(0, 0, 0, 0) 67.95%)',
                        // backgroundOrigin: 'border-box',
                        // backgroundClip: 'content-box, border-box',
                        // borderRadius: '1rem',
                        // borderImage:"linear-gradient(166.93deg, #AFAFAF 3.24%, rgba(96, 96, 96, 0) 96.43%)"
                        // background: 'linear-gradient(166.93deg, #AFAFAF 3.24%, rgba(96, 96, 96, 0) 96.43%), linear-gradient(317.92deg, rgba(255, 255, 255, 0.6) 1.48%, rgba(0, 0, 0, 0) 67.95%)',

                        // backgroundOrigin: 'border-box',
                        // backgroundClip: 'content-box, border-box',

                        padding: '1rem', // Adjust padding as per your requirement

                        width: '45rem',
                        height: '85%',

                        borderRadius: '15px',
                        backdropFilter: 'blur(10px)', backgroundColor: 'rgba(0, 0, 0, 0.1)', marginTop: '0.5rem'
                    }}>
                        {/* <form style={{display:"flex", flexDirection:"column"}} onSubmit={form.onSubmit((values) => console.log(values))}> */}
                        {/* <Otp></Otp> */}
                        <form onSubmit={form.onSubmit((values) => { handleRegister(values) })} style={{
                            width: '100%', display: 'flex', flexDirection: 'column',

                            alignItems: 'center',
                        }}>
                            <div style={{
                                marginTop: "1rem", width: "75%", display: "flex",
                                justifyContent: "space-evenly", alignItems: "center"
                            }}>
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
                                            borderColor: 'purple',
                                        },
                                    }}
                                /> <p style={{
                                    position: "absolute",
                                    marginTop: "16%", left: "17%", color: "red"
                                }}>
                                    {form.errors.name}</p>
                                <TextInput
                                    required
                                    label="Email Id"
                                    placeholder="Enter Your Email Id"
                                    value={form.values.email}
                                    radius="md"
                                    onChange={(event) => { form.setFieldValue('email', event.currentTarget.value) }}
                                    // error={form.errors.email && 'Required'}                                             
                                    size="lg"
                                    style={{ width: '45%', color: 'white' }}
                                    styles={{
                                        input: {
                                            background: 'transparent',
                                            color: 'white',
                                            borderColor: 'purple',
                                        },
                                    }}
                                /><p style={{
                                    position: "absolute",
                                    marginTop: "16%", left: "52%", color: "red"
                                }}>
                                    {form.errors.email}</p>
                            </div>
                            <div style={{
                                marginTop: "0.5rem",
                                paddingTop: "0.5rem",
                                width: "75%", display: "flex", justifyContent: "space-evenly", alignItems: "center"
                            }}>
                                {/* <TextInput
                                    required
                                    label="Date of Birth"
                                    placeholder="Enter Your Date of Birth"
                                    value={form.values.dob}
                                    onChange={(event) => form.setFieldValue('dob', event.currentTarget.value)}
                                    // error={form.errors.dob && 'Required'}
                                    radius="md"
                                    size="lg"
                                    style={{ width: '45%', color: 'white' }}
                                    styles={{
                                        input: {
                                            background: 'transparent',
                                            color: 'white',
                                            borderColor: 'purple',
                                        },
                                    }}
                                /> */}
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
                                            borderColor: 'purple',
                                        },
                                    }}
                                />

                                <p style={{
                                    position: "absolute",
                                    marginTop: "16%", left: "17%", color: "red"
                                }}>
                                    {form.errors.dob}</p>
                                {/* <TextInput
                                    required
                                    label="Mobile Number"
                                    placeholder="Enter Your Mobile No."
                                    value={form.values.phone}
                                    onChange={(event) => form.setFieldValue('phone', event.currentTarget.value)}
                                    // error={form.errors.phone && 'Invalid Mobile No.'}
                                    radius="md"
                                    size="lg"
                                    style={{ width: '45%', color: 'white' }}
                                    styles={{
                                        input: {
                                            background: 'transparent',
                                            color: 'white',
                                            borderColor: 'purple',
                                        },
                                    }}
                                /> */}
                                <NumberInput label="Mobile Number" placeholder="Enter Your Mobile No." hideControls
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
                                            borderColor: 'purple',
                                        },
                                    }}
                                />
                                <p style={{
                                    position: "absolute",
                                    marginTop: "16%", left: "52%", color: "red"
                                }}>
                                    {form.errors.phone}</p>
                            </div>
                            <PasswordInput
                                required
                                label="Password"
                                placeholder="Enter Your password"
                                value={form.values.password}
                                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                                // error={form.errors.password && 'Password should include at least 6 characters'}
                                radius="md"
                                size="lg"
                                style={{ width: '70%', color: 'white', marginTop: '0.5rem', paddingTop: "0.5rem" }}
                                styles={{
                                    input: {
                                        background: 'transparent',
                                        color: 'white',
                                        borderColor: 'purple',
                                    },
                                }}
                            /><p style={{
                                position: "absolute",
                                marginTop: "39%", left: "17%", color: "red"
                            }}>
                                {form.errors.password}</p>
                            <PasswordInput
                                required
                                label="Confirm Password"
                                placeholder="Confirm Your Password"
                                value={form.values.confPassword}
                                onChange={(event) => form.setFieldValue('confPassword', event.currentTarget.value)}
                                // error={form.errors.confPassword && 'Password does not match'}
                                radius="md"
                                size="lg"
                                style={{ width: '70%', color: 'white', marginTop: '0.5rem', paddingTop: "0.5rem" }}
                                styles={{
                                    input: {
                                        background: 'transparent',
                                        color: 'white',
                                        borderColor: 'purple',
                                    },
                                }}
                            /><p style={{
                                position: "absolute",
                                marginTop: "52%", left: "17%", color: "red"
                            }}>
                                {form.errors.confPassword}</p>

                            {/* <Text style={{position:"absolute", paddingTop:"10rem"}} size="1rem" c={'white'} >Create new account</Text> */}

                            <Anchor type="submit" style={{ textDecoration: "none", marginTop: '1rem', marginLeft: "22%", width: '50%', height: '3rem' }}
                                href="/verifyotp">
                                {/* {/* <Link style={{ textDecoration:"none", marginTop:'0rem', marginLeft:"35%", width: '70%', height: '3rem'}}href="/verifyotp">  */}
                                <Button onClick={() => { console.log("clicked") }}
                                    type='submit' style={{
                                        marginTop: '1rem', width: '50%',
                                        height: '3rem', backgroundColor: '#9441D0', borderRadius: '1rem', fontSize: '1rem'
                                    }} >Sign Up
                                </Button>
                                {/* </Link> */}
                            </Anchor>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "space-between", paddingBottom: "1%", paddingTop: "20px" }}>
                                {/* <Divider label="Or continue with Google" labelPosition="center" my="lg" /> */}
                                <h5 style={{ height: "0px", paddingRight: "15px", top: "50%", left: "28%", color: 'white' }}>Or continue with Google</h5>

                                <GoogleButton radius="xl" style={{ marginTop: '5%' }}>Google</GoogleButton>
                            </div>

                        </form>

                    </Box>

                </Flex> : <Otp initialValues={formData}></Otp>}
        </>

    );
}

export default Register;
