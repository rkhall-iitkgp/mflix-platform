"use client"
import { useState, useEffect } from "react";
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { PinInput, darken } from '@mantine/core';
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
// import { TwitterButton } from './TwitterButton';
import searchMsApiUrls from '../api/searchMsApi';
import useLoginStore from "@/Stores/LoginStore";
import { useRouter } from "next/navigation";




export function Otp({ initialValues }: any) {
    const router = useRouter()
    const [type, toggle] = useToggle(['login', 'register'])
    const [resendTime, setResendTime] = useState(60);
    const [otpValue, setOtpValue] = useState(initialValues?.otp || '');

    useEffect(() => {
        if (resendTime > 0) {
            const timer = setTimeout(() => {
                setResendTime(prevTime => prevTime - 1); // Functional update to ensure correct value
            }, 1000);

            return () => clearTimeout(timer); // Cleanup function to clear the timer on unmount or state change
        }
    }, [resendTime]);

    const handleOtp = async () => {

        console.log(initialValues)
        const base_url = searchMsApiUrls();
        let res = await fetch(`${base_url}/auth/verifyOTP`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...initialValues,
            }),
            credentials: 'include'
        })
        let jsonData = await res.json();
        if (!res.ok) {
            console.log(jsonData.message);
            // router.push('/verifyotp')
        }
        //   setLoading(false);
        else {
            console.log(jsonData.message);
            console.log(jsonData)
            if (initialValues.type == 'register') {
                useLoginStore.getState().updateUser(jsonData.account);
                const state = useLoginStore.getState();
                console.log(state);
                // router.push('/userprogfile')
            } else if (initialValues.type == 'forget') {
                router.push('/login')
            } else if (initialValues.type == 'change') {
                router.push('/userprofile');
            }
            // console.log(jsonData.account);
            // console.log(jsonData);
            // sessionStorage.setItem('sessionToken', jsonData.user.sessionToken);
            // sessionStorage.setItem('token', jsonData.user.token);
        }


    }
    const handleOtpChange = (value: any) => {
        const newOtp = value;
        setOtpValue(newOtp);
        // Update the initialValues object's otp field
        initialValues.otp = newOtp;
    };

    const form = useForm({
        initialValues: {
            name: '',
            dob: '',
            phone: '',
            email: '',
            password: '',
            confPassword: '',
            terms: true,
            otp: ''
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
            <Text size="2.5rem" c={'white'} p={'1rem'}>Verify OTP</Text>
            <Flex direction="column" justify="centre"
                align="center" gap={{ sm: 'lg' }}>
                <Text size="1.4rem" c={'white'}  >An OTP has been sent to your email
                </Text>
                <Text size="1rem" style={{ color: '#9441D0', marginBottom: '1rem' }}>Resend OTP in {resendTime} seconds</Text>
                {/* <a href="/login" style={{ color: '#9441D0' }}>Log In</a> */}
            </Flex>
            <Box style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                border: '1px solid #ccc', width: '30rem', marginBottom: '5rem', borderRadius: '15px',
                backdropFilter: 'blur(10px)', backgroundColor: 'rgba(0, 0, 0, 0.1)', marginTop: '0.5rem'
            }}>
                {/* <form style={{display:"flex", flexDirection:"column"}} onSubmit={form.onSubmit((values) => console.log(values))}> */}
                <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                    {/* <TextInput
                    required
                    label="OTP"
                    placeholder="Enter OTP"
                    value={form.values.name}
                    onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                    error={form.errors.name && 'Required'}
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
                    <PinInput size="xl" placeholder='_' type="number"
                        value={otpValue}
                        length={6}
                        onChange={(value) => handleOtpChange(value)} />
                </div>




                {/* <Text style={{position:"absolute", paddingTop:"10rem"}} size="1rem" c={'white'} >Create new account</Text> */}
                <Button style={{ marginTop: '1rem', width: '50%', height: '3rem', backgroundColor: '#9441D0', borderRadius: '1rem', fontSize: '1rem' }} onClick={() => { handleOtp() }}  >Verify</Button>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: "1.5%" }}>
                    {/* <Divider label="Or continue with Google" labelPosition="center" my="lg" /> */}
                    {/* <h6 style={{height:"0px"}}>Or continue with Google</h6>
               <GoogleButton radius="xl">Google</GoogleButton> */}
                </div>
                {/* </form> */}

            </Box>
        </Flex>

    );
}

// export default Otp;
