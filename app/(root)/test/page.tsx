
import Switch from 'react-switch';
import themeOptions from '@/utils/themes'
import { Box, Button, Divider, Flex, Group, Stack, Text, Title, useMantineTheme } from '@mantine/core'
import { useState } from 'react'


 const PricingContainer = () => {
   const theme = useMantineTheme()
   const [monthly, setMonthly] = useState(false)

   const handleChange = () => {
      setMonthly(!monthly)
   }
   
   return (
      <>
         <Group
            style={{ zIndex: 50 }}
         >
            <Stack  >
               {/** header section */}
               <Flex
                  direction='column'
                  gap={10}
                  align='center'
                  justify='start'
               >
                  <Title
                     order={2}
                    //  color= {theme.colorScheme === 'dark' ? 'white' : 'hsl(233, 13%, 49%)'}
                  >Our Pricing</Title>
                  <Box
                     style={{
                        fontWeight: 700,
                        // color: theme.colorScheme === 'dark' ? theme.colors.dark[1]: 'hsl(234, 14%, 74%)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 19
                     }}
                  >
                     <Text fz={'sm'}>Annually</Text>
                     {/* <Switch
                        checked={monthly}
                        onChange={handleChange}
                        checkedIcon={null}
                        uncheckedIcon={null}
                        boxShadow=''
                        activeBoxShadow=''
                        width={45}
                        height={25}
                        onColor={'#7F85E4'}
                        offColor={'#7F85E4'}
                        handleDiameter={18}
                     /> */}
                     <Text fz={'sm'}>Monthly</Text>
                  </Box>
               </Flex>
               {/** cards section */}
               <Group>
                  <Flex
                     align={'center'}
                     direction={{ base: 'column', sm: 'row' }}
                     color={'hsl(232, 13%, 33%)'}
                     gap={{base: '1.5rem', sm: 0}}
                  >
                     <Box
                        style={{
                           boxShadow: '0px 30px 50px -7px rgba(0,0,0,0.1)',
                           height: '22rem',
                           width: '17rem',
                           paddingInline: '1.5rem',
                           backgroundColor: themeOptions.color.button === 'dark' ? theme.colors.dark[5] : 'white',
                           borderRadius: '0.7rem 0 0 0.7rem',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',

                           '@media (max-width: 755px)': {
                              width: '19rem',
                              borderRadius: '0.7rem',
                           },
                           '@media (min-width: 756px) and (max-width: 820px)': {
                              width: '15rem',
                              borderRadius: '0.7rem 0 0 0.7rem',
                           },
                        }}
                     >
                        <Stack w={'100%'} align={'center'} >
                           <Text style={{
                              fontWeight: 700,
                              color: themeOptions.color.button === 'dark' ? theme.colors.dark[1] : 'hsl(233, 13%, 49%)',
                           }} fz={'md'}>Basic</Text>
                           <Title
                              order={2}
                              style={{
                                 color: themeOptions.color.button === 'dark' ? 'white' : 'hsl(232, 13%, 33%)',
                                 fontSize: 50,
                                 display: 'flex',
                                 alignItems: 'center',
                                 gap: 5
                              }}
                           >
                              <Text fz={'2rem'}>$</Text>
                              {monthly ? '19.99' : '199.99'}
                           </Title>
                           {/* <Stack w={'100%'} align='center' spacing={10} style={{color: theme.colorScheme === 'light' && 'hsl(233, 13%, 49%)'}}>
                              <Divider style={{ width: '100%', borderColor: theme.colorScheme === 'dark' &&'gray', opacity: theme.colorScheme === 'dark' && 0.7 }} />
                              <Text fz={'sm'} fw={600} >500 GB Storage</Text>
                              <Divider style={{ width: '100%', borderColor: theme.colorScheme === 'dark' &&'gray', opacity: theme.colorScheme === 'dark' && 0.7 }} />
                              <Text fz={'sm'} fw={600} >2 Users Allowed</Text>
                              <Divider style={{ width: '100%', borderColor: theme.colorScheme === 'dark' &&'gray', opacity: theme.colorScheme === 'dark' && 0.7 }} />
                              <Text fz={'sm'} fw={600} >Send up to 3 GB</Text>
                              <Divider style={{ width: '100%', borderColor: theme.colorScheme === 'dark' &&'gray', opacity: theme.colorScheme === 'dark' && 0.7 }} />
                           </Stack> */}
                           <Button
                              variant='gradient'
                              gradient={{ from: 'hsl(236, 72%, 79%)', to: 'hsl(237, 63%, 64%)' }}
                              w='100%'
                           >
                              LEARN MORE
                           </Button>
                        </Stack>
                     </Box>
                     <Box
                        style={{
                           boxShadow: '0px 30px 50px -7px rgba(0,0,0,0.1)',
                           height: '25rem',
                           width: '19rem',
                           paddingInline: '1.5rem',
                           background: 'linear-gradient(to bottom right, hsl(236, 72%, 79%), hsl(237, 63%, 64%))',
                           color: 'white',
                           borderRadius: '0.7rem',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           
                           '@media (min-width: 756px) and (max-width: 820px)': {
                              width: '15rem',
                              borderRadius: '0.7rem',
                           },
                        }}
                     >
                        <Stack w={'100%'} align={'center'} spacing={20}>
                           <Text style={{
                              fontWeight: 700,
                           }} fz={'md'}>Professional</Text>
                           <Title
                              order={2}
                              style={{
                                 fontSize: 50,
                                 display: 'flex',
                                 alignItems: 'center',
                                 gap: 5
                              }}
                           >
                              <Text fz={'2rem'}>$</Text>
                              {monthly ? '24.99' : '249.99'}
                           </Title>
                           {/* <Stack w={'100%'} align='center' spacing={10}>
                              <Divider style={{ width: '100%', borderColor: theme.colorScheme === 'dark' && 'white', opacity: theme.colorScheme === 'dark' && 0.6 }} />
                              <Text fz={'sm'} fw={600}>1 TB Storage</Text>
                              <Divider style={{ width: '100%', borderColor: theme.colorScheme === 'dark' && 'white', opacity: theme.colorScheme === 'dark' && 0.6 }} />
                              <Text fz={'sm'} fw={600}>5 Users Allowed</Text>
                              <Divider style={{ width: '100%', borderColor: theme.colorScheme === 'dark' && 'white', opacity: theme.colorScheme === 'dark' && 0.6 }} />
                              <Text fz={'sm'} fw={600}>Send up to 10 GB</Text>
                              <Divider style={{ width: '100%', borderColor: theme.colorScheme === 'dark' && 'white', opacity: theme.colorScheme === 'dark' && 0.6 }} />
                           </Stack> */}
                           <Button
                              style={{
                                 backgroundColor: 'white',
                                 color: 'hsl(237, 63%, 64%)',

                                 '&:hover': {
                                    backgroundColor: 'white',
                                    opacity: 0.95
                                 }
                              }}
                              w='100%'
                           >
                              LEARN MORE
                           </Button>
                        </Stack>
                     </Box><Box
                        style={{
                           boxShadow: '0px 30px 50px -7px rgba(0,0,0,0.1)',
                           height: '22rem',
                           width: '18rem',
                           paddingInline: '1.5rem',
                           backgroundColor: themeOptions.color.insideTextColor ? theme.colors.dark[5] : 'white',
                           borderRadius: '0 0.7rem 0.7rem 0',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',

                           '@media (max-width: 755px)': {
                              width: '19rem',
                              borderRadius: '0.7rem',
                           },
                           '@media (min-width: 756px) and (max-width: 820px)': {
                              width: '15rem',
                              borderRadius: '0 0.7rem 0.7rem 0',
                           },
                        }}
                     >
                        {/* <Stack w={'100%'} align={'center'} spacing={20}>
                           <Text style={{
                              fontWeight: 700,
                              color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : 'hsl(233, 13%, 49%)',
                           }} fz={'md'}>Master</Text>
                           <Title
                              order={2}
                              style={{
                                 color: theme.colorScheme === 'dark' ? 'white' : 'hsl(232, 13%, 33%)',
                                 fontSize: 50,
                                 display: 'flex',
                                 alignItems: 'center',
                                 gap: 5
                              }}
                           >
                              <Text fz={'2rem'}>$</Text>
                              {monthly ? '39.99' : '399.99'}
                           </Title>
                           <Stack w={'100%'} align='center' spacing={10} style={{color: theme.colorScheme === 'light' && 'hsl(233, 13%, 49%)'}}>
                              <Divider style={{ width: '100%', borderColor: theme.colorScheme === 'dark' &&'gray', opacity: theme.colorScheme === 'dark' && 0.7 }} />
                              <Text fz={'sm'} fw={600} >2 TB Storage</Text>
                              <Divider style={{ width: '100%', borderColor: theme.colorScheme === 'dark' &&'gray', opacity: theme.colorScheme === 'dark' && 0.7 }} />
                              <Text fz={'sm'} fw={600} >10 Users Allowed</Text>
                              <Divider style={{ width: '100%', borderColor: theme.colorScheme === 'dark' &&'gray', opacity: theme.colorScheme === 'dark' && 0.7 }} />
                              <Text fz={'sm'} fw={600} >Send up to 20 GB</Text>
                              <Divider style={{ width: '100%', borderColor: theme.colorScheme === 'dark' &&'gray', opacity: theme.colorScheme === 'dark' && 0.7 }} />
                           </Stack>
                           <Button
                              variant='gradient'
                              gradient={{ from: 'hsl(236, 72%, 79%)', to: 'hsl(237, 63%, 64%)' }}
                              w='100%'
                           >
                              LEARN MORE
                           </Button>
                        </Stack> */}

                     </Box>
                  </Flex>
               </Group>
            </Stack>
         </Group>
      </>
   )
}