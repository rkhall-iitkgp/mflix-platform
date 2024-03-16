"use client"

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
// import { TwitterButton } from './TwitterButton';

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
            {/* <BackgroundImage src='Group 18.png'> */}
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
                justifyContent: 'space-evenly',
                alignItems: 'center',
                border: '1px solid #ccc', width: '30rem', height: '30rem', borderRadius: '15px',
                backdropFilter: 'blur(20px)', backgroundColor: 'rgba(0, 0, 0, 0.1)', marginTop: '1.6rem'
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
                    style={{ width: '60%', color: 'white' }}
                    styles={{
                        input: {
                            background: 'transparent',
                            color: 'white',
                            borderColor: '#9341D0',
                        },
                        wrapper: {
                            marginTop: '0.5rem', // Adjust the padding as needed
                        },
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
                    style={{ width: '60%', color: 'white' }}
                    styles={{
                        input: {
                            background: 'transparent',
                            color: 'white',
                            borderColor: '#9341D0',
                        },
                        wrapper: {
                            marginTop: '0.5rem', // Adjust the padding as needed
                        },
                    }}
                />
                {/* <a href="">Forget Password?</a> */}
                <Button style={{ width: '60%', height: '3.5rem', backgroundColor: '#9441D0', borderRadius: '1rem', fontSize: '1rem', marginTop: '1rem' }} >Log In</Button>
                <Divider label="Or continue with Google" labelPosition="center" my="lg" style={{ color: 'white', width: '80%' }} styles={{

                    label: {
                        color: 'white',
                    },
                }} />
                <GoogleButton radius="xl" size='lg' style={{ marginBottom: '1rem' }}>Google</GoogleButton>
            </Box>
        </Flex>
        // <Paper radius="md" p="xl" withBorder {...props}>
        //     <Text size="lg" fw={500}>
        //         Welcome to Mantine,  with
        //     </Text>



        //     <form onSubmit={form.onSubmit(() => { })}>
        //         <Stack>
        //             {type === 'register' && (
        //                 <TextInput
        //                     label="Name"
        //                     placeholder="Your name"
        //                     value={form.values.name}
        //                     onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
        //                     radius="md"
        //                 />
        //             )}

        //             <TextInput
        //                 required
        //                 label="Email"
        //                 placeholder="hello@mantine.dev"
        //                 value={form.values.email}
        //                 onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
        //                 error={form.errors.email && 'Invalid email'}
        //                 radius="md"
        //             />

        //             <PasswordInput
        //                 required
        //                 label="Password"
        //                 placeholder="Your password"
        //                 value={form.values.password}
        //                 onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
        //                 error={form.errors.password && 'Password should include at least 6 characters'}
        //                 radius="md"
        //             />

        //             {type === 'register' && (
        //                 <Checkbox
        //                     label="I accept terms and conditions"
        //                     checked={form.values.terms}
        //                     onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
        //                 />
        //             )}
        //         </Stack>

        //         <Group justify="space-between" mt="xl">
        //             <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
        //                 {type === 'register'
        //                     ? 'Already have an account? Login'
        //                     : "Don't have an account? Register"}
        //             </Anchor>
        //             <Button type="submit" radius="xl">
        //                 {upperFirst(type)}
        //             </Button>
        //         </Group>
        //     </form>
        //     <Divider label="Or continue with Google" labelPosition="center" my="lg" />
        //     <Group grow mb="md" mt="md">
        //         <GoogleButton radius="xl">Google</GoogleButton>
        //         {/* <TwitterButton radius="xl">Twitter</TwitterButton> */}
        //     </Group>

        // </Paper>
    );
}

export default Login;
