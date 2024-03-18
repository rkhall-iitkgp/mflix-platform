"use client"

// hard code to variable remaining


import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
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
import { GoogleButton } from './GoogleButton';
import themeOption from '../../assets/themes/colors'

export function Login(props: PaperProps) {
    const [type, toggle] = useToggle(['login', 'register'])
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    return (
        <Flex

            style={{
                fontFamily: 'Poppins, cursive', // Applying Poppins font
                backgroundImage: "url('background.png')",
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
            h='100vh'
            justify="center"
            align="center"
            direction="column"
            wrap="wrap" >
            <Text size="2.5rem" c={'white'} p={'1rem'}>Login your account</Text>
            <Flex direction="row" justify="centre"
                align="center" gap={{ sm: 'lg' }}>
                <Text size="1.1rem" c={'white'}  >Don't have an account?
                </Text>
                <a href="" style={{ color: '#9441D0' }}>Sign in</a>
            </Flex>
            <Box style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                border: '1px solid #ccc', maxWidth: '30rem', width: '90vw', height: '30rem', borderRadius: '15px',
                backdropFilter: 'blur(20px)', backgroundColor: 'rgba(0, 0, 0, 0.1)', marginTop: '1.6rem'
            }}>
                <form onSubmit={form.onSubmit(() => { })} style={{
                    width: '100%', display: 'flex', flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
                    <TextInput
                        required
                        label="Email address"
                        placeholder="Enter Your email address"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                        radius="md"
                        size="lg"
                        style={{ width: '70%', color: 'white' }}
                        styles={{
                            input: {
                                background: 'transparent',
                                color: 'white',
                                borderColor: '#9341D0',
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
                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Enter Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                        radius="md"
                        size="lg"
                        style={{ width: '70%', color: 'white', marginTop: '1.5rem' }}
                        styles={{
                            input: {
                                background: 'transparent',
                                color: 'white',
                                borderColor: '#9341D0',
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
                    <Box style={{ display: 'flex', flexDirection: 'row-reverse', width: '70%' }}>
                        <a href="" style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'normal', padding: '0.2rem' }} >Forget Password?</a>
                    </Box>
                    <Button style={{ width: '70%', height: '3.5rem', backgroundColor: '#9441D0', borderRadius: '1rem', fontSize: '1.5rem', fontWeight: 'normal', marginTop: '1.5rem' }} type="submit" radius="xl" >Log In</Button>
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
        </Flex>
    );
}

export default Login;
