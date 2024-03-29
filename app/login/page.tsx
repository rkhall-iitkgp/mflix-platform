"use client"

// hard code to variable remaining

import { useForm } from '@mantine/form';
import { createStyles } from '@mantine/styles'
import {
    TextInput,
    PasswordInput,
    Text,
    PaperProps,
    Button,
    Divider,
    Flex, Box
} from '@mantine/core';
import { GoogleButton } from './GoogleButton';
import themeOptions from '../../assets/themes/colors'
import { useState } from 'react';
import searchMsApiUrls from '../api/searchMsApi';
import useLoginStore from '@/Stores/LoginStore';

export default function Login() {
    const [userData, setUserData] = useState(null)


    const submitLogin = async (values: any) => {
        const base_url = searchMsApiUrls()
        setUserData(values);
        values.flag = 0;
        console.log(values);
        let res = await fetch(`${base_url}/auth/login`, {
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
            console.log(jsonData);
        }
        else {
            console.log("login successful");
            console.log(jsonData);
            sessionStorage.setItem('accessToken', jsonData.user.accessToken);
            useLoginStore.getState().updateUser(jsonData.user);
            const state = useLoginStore.getState();
            console.log(state);
            // sessionStorage.setItem('token', jsonData.user.token);
        }

        if (!jsonData.user.userProfiles.length) {
            console.log(jsonData.user)
            console.log(jsonData.user.userProfiles.length)
            const createData = {
                "userName": jsonData.user.name,
                "flag": 1,
            }
            console.log(createData)
            const token = sessionStorage.getItem('accessToken');
            res = await fetch(`${base_url}/user/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...createData,
                }),
            })
            jsonData = await res.json();
            if (!res.ok) {
                console.log(jsonData);
            }
            else {
                console.log("user Created successful");
                console.log(jsonData);

                // sessionStorage.setItem('token', jsonData.user.token);
            }
        }

    };

    const useStyles = createStyles(() => ({
        OuterBoxStyles: {
            fontFamily: 'Poppins, cursive', // Applying Poppins font
            backgroundImage: "url('background.png')",
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

            border: '1px solid #ccc', maxWidth: '30rem', width: '90vw', minHeight: '20rem', borderRadius: '15px',
            backdropFilter: 'blur(20px)', backgroundColor: 'rgba(0, 0, 0, 0.1)', marginTop: '1.6rem'
        },

        FormStyles: {
            width: '100%', display: 'flex', flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        ButtonStyles: {
            width: '70%', height: '3.5rem', backgroundColor: '#9441D0', borderRadius: '1rem', fontSize: '1.5rem', fontWeight: 'normal', marginTop: '1.5rem'
        },
        ErrorStyles: {
            color: 'red', fontSize: '0.9rem', marginTop: '5px', minHeight: '1.2rem', width: '70%',
        },


    }));


    const { classes } = useStyles();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 8 ? 'Password should include at least 8 characters' : null),
        },
    });


    return (
        <Box
            className={classes.OuterBoxStyles}
        >
            <Text size="2.5rem" c={'white'} p={'1rem'}>Login your account</Text>
            <Flex direction="row" justify="centre"
                align="center" gap={{ sm: 'lg' }}>
                <Text size="1.1rem" c={'white'}  >Don't have an account?
                </Text>
                <a href="/register" style={{ color: themeOptions.color.textColorNormal }}>Sign in</a>
            </Flex>
            <Box
                className={classes.CentreBoxStyles}>
                <form onSubmit={form.onSubmit((values) => { submitLogin(values) })}
                    className={classes.FormStyles}>
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
                                padding: '0rem'
                            },
                            label: {
                                fontSize: '1rem',
                                fontWeight: 'normal'
                            }
                        }}
                    />
                    <div className={classes.ErrorStyles}>
                        {form.errors.email ? form.errors.email : ''}
                    </div>
                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Enter Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
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
                                padding: '0rem'
                            },
                            label: {
                                fontSize: '1rem',
                                fontWeight: 'normal'
                            }
                        }}
                    />
                    <div className={classes.ErrorStyles}>
                        {form.errors.password ? form.errors.password : ''}
                    </div>
                    <Box style={{ display: 'flex', flexDirection: 'row-reverse', width: '70%' }}>
                        <a href="" style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'normal', padding: '0.2rem' }} >Forget Password?</a>
                    </Box>
                    <Button
                        // className={classes.ButtonStyles}
                        style={{ width: '70%', height: '3.5rem', backgroundColor: '#9441D0', borderRadius: '1rem', fontSize: '1.5rem', fontWeight: 'normal', marginTop: '1.5rem' }}
                        type="submit" radius="xl" >Log In</Button>

                    <Divider label="Or " labelPosition="center" my="lg" style={{ color: 'white', width: '80%' }} styles={{

                        label: {
                            color: 'white',
                        },
                    }} />
                    <Box style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-evenly', width: '80%' }}>
                        <Text size="1.2rem" c={'white'} p={'1rem'} style={{ marginRight: '1rem' }}> Continue With:</Text>
                        <GoogleButton radius="xl" size='lg' style={{ marginBottom: '1rem' }}>Google</GoogleButton>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

// export default Login;
