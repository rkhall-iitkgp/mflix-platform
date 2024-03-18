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
import { GoogleButton } from '../login/GoogleButton';
// import { TwitterButton } from './TwitterButton';

export function Register(props: PaperProps) {
    const [type, toggle] = useToggle(['login', 'register'])
    const form = useForm({
        initialValues: {
            name:'',
            dob:'',
            phone:'',
            email: '',
            password: '',
            confPassword:'',
            terms: true,
        },

        validate: {
            name: (val) => (!val.length ? 'Required' : null),
            dob: (val) =>(!val ? 'Required' : null),
            phone:(val) => (val.length < 10 ? 'Invalid Phone No.': null),
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
            confPassword: (val) =>(val ? 'Password does not match' : null),
           
        },
    });

    return (
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
            
            <form onSubmit={form.onSubmit(() => {console.log("submit") })} style={{
                    width: '100%', display: 'flex', flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
               <div style={{marginTop:"2rem",width:"75%",display:"flex", justifyContent:"space-evenly", alignItems:"center"}}> <TextInput
                    required
                    label="Name"
                    placeholder="Enter Your Name"
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
                /> 
                 <TextInput
                    required
                    label="Email Id"
                    placeholder="Enter Your Email Id"
                    value={form.values.email}
                    // onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                    error={form.errors.email && 'Required'}
                    {...form.getInputProps('name')}
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
                /></div>
                <div style={{marginTop:"0.5rem",width:"75%", display:"flex", justifyContent:"space-evenly", alignItems:"center"}}><TextInput
                    required
                    label="Date of Birth"
                    placeholder="Enter Your Date of Birth"
                    value={form.values.dob}
                    onChange={(event) => form.setFieldValue('dob', event.currentTarget.value)}
                    error={form.errors.dob && 'Required'}
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
                <TextInput
                    required
                    label="Mobile Number"
                    placeholder="Enter Your Mobile No."
                    value={form.values.phone}
                    onChange={(event) => form.setFieldValue('phone', event.currentTarget.value)}
                    error={form.errors.phone && 'Invalid Mobile No.'}
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
                /></div>
                <PasswordInput
                    required
                    label="Password"
                    placeholder="Enter Your password"
                    value={form.values.password}
                    onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                    error={form.errors.password && 'Password should include at least 6 characters'}
                    radius="md"
                    size="lg"
                    style={{ width: '70%', color: 'white', marginTop:'0.5rem' }}
                    styles={{
                        input: {
                            background: 'transparent',
                            color: 'white',
                            borderColor: 'purple',
                        },
                    }}
                />
                <PasswordInput
                    required
                    label="Confirm Password"
                    placeholder="Confirm Your Password"
                    value={form.values.confPassword}
                    onChange={(event) => form.setFieldValue('confPassword', event.currentTarget.value)}
                    error={form.errors.confPassword && 'Password does not match'}
                    radius="md"
                    size="lg"
                    style={{ width: '70%', color: 'white', marginTop:'0.5rem' }}
                    styles={{
                        input: {
                            background: 'transparent',
                            color: 'white',
                            borderColor: 'purple',
                        },
                    }}
                />
               
                {/* <Text style={{position:"absolute", paddingTop:"10rem"}} size="1rem" c={'white'} >Create new account</Text> */}
                
               {/* <Anchor style={{ textDecoration:"none", marginTop:'0rem', marginLeft:"22%", width: '50%', height: '3rem'}}href="/verifyotp"> */}
                <Button style={{ marginTop:'1rem', width: '50%', height: '3rem', backgroundColor: '#9441D0', borderRadius: '1rem', fontSize: '1rem' }} >Sign Up</Button>
                {/* </Anchor> */}
               
                <div style={{display:"flex", flexDirection:"row", justifyContent:"center", paddingBottom:"1.5%", paddingTop:"20px"}}>
                {/* <Divider label="Or continue with Google" labelPosition="center" my="lg" /> */}
                <h6 style={{height:"0px", paddingRight:"15px"  }}>Or continue with Google</h6>
                <GoogleButton radius="xl">Google</GoogleButton>
                </div>
                
          </form>
            
            </Box>
           
        </Flex>
     
    );
}

export default Register;
