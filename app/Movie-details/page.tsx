import { Group, Button, Image, Stack, Text, Paper } from '@mantine/core';
import { GrLocation } from 'react-icons/gr';
import { FaRegHourglass } from 'react-icons/fa6';
import { PiCalendar } from 'react-icons/pi';
import NextImage from 'next/image';
import ImdbImg from '@/assets/icons/imdb.png';
import TomatoImg from '@/assets/icons/tomato.png';
import { FaPlus } from 'react-icons/fa';
import themeOptions from '@/utils/colors';
import Sample from '@/assets/sample.png';
import { IoIosArrowForward } from 'react-icons/io';
import MovieCard from '../../components/MovieDetails/MovieCard';
import { createStyles } from '@mantine/styles';

export default function MovieBanner() {
    const genres = ['Mystery', 'Action', 'Thriller'];
    const director = ['James Cameron'];
    const writer = ['Rick Jaffa'];
    const cast = ['Someone'];

    // const styles = createStyles(()=>({


    // }))

    return (
        <Stack
        //   style={{
        //     maxWidth: '600px',
        //   }}
        //   styles={{
        //     root: {
        //         borderImageSource: 'linear-gradient(166.93deg, #B586D8 3.24%, rgba(143, 72, 196, 0) 96.43%), linear-gradient(317.92deg, rgba(255, 255, 255, 0.6) 1.48%, rgba(112, 17, 182, 0.09) 67.95%)',
        //         borderImageSlice: '1',
        //         borderImageWidth: '1',
        //         borderImageOutset: '0',
        //         borderRadius: '20px',
        //         background: 'linear-gradient(0deg, rgba(112, 17, 182, 0.15), rgba(112, 17, 182, 0.15)), linear-gradient(321.23deg, rgba(112, 17, 182, 0.2) 5.98%, rgba(0, 0, 0, 0) 66.28%)',
        //     },
        //   }}
          justify="space-between"
          pt="md"
          pb="xs"
          pl={themeOptions.fontSize.l}
          pr={themeOptions.fontSize.l}
          gap={0}
        >
            <Group style={{width:"100%", height:"100vh", border:"1px solid #fff", marginTop:"150px", background:"#fff"}}>

            </Group>
            <Group align="center">
                <div>
                    <Image
                      src={Sample}
                      component={NextImage}
                      style={{height:"430px", width:"291px", marginTop:"60px", marginLeft:"100px"}}
                      alt="sample"
                      height={158}
                    />
                </div>
                <Stack ml="xxl" gap="xs" mr="lg" style={{marginTop:"30px" , paddingLeft:"40px"}}>
                    <Text fz={themeOptions.fontSize.xxl}>Movie Name</Text>
                    <Group gap={themeOptions.fontSize.xs}>
                        {genres.map((e, i) =>
                        <Paper
                          key={i}
                          bg={themeOptions.color.smallBox}
                          fz={themeOptions.fontSize.s}
                        //   w={116}
                          pt={5}
                          pb={5}
                          radius={13}
                          style={{
                            width:'5rem'
                          }}
                        >
                            <Text ta="center">{e}</Text>
                        </Paper>)}
                    </Group>
                    <Group mt={7} justify="space-between" style={{width:"500px"}}>
                        <Group gap={6} justify="space-around">
                            <Image
                              src={ImdbImg}
                              component={NextImage}
                              alt="imdb"
                              height={20}
                              unoptimized
                            />
                            <Text fz={themeOptions.fontSize.xs}>8.6/10</Text>
                        </Group>
                        <Group gap={6} justify="space-around">
                            <Image
                              src={TomatoImg}
                              component={NextImage}
                              alt="imdb"
                              height={20}
                              unoptimized
                            />
                            <Text fz={themeOptions.fontSize.xs}>97 %</Text>
                        </Group>
                        <Group gap={6} justify="space-around">
                            <FaRegHourglass />
                            <Text fz={themeOptions.fontSize.xs}>2 hr 12 min</Text>
                        </Group>
                        <Group gap={6} justify="space-around">
                            <PiCalendar />
                            <Text fz={themeOptions.fontSize.xs}>2024</Text>
                        </Group>
                        <Group gap={6} justify="space-around" style={{ maxWidth: 'max-content' }}>
                            <GrLocation />
                            <Text fz={themeOptions.fontSize.xs}>Country</Text>
                        </Group>
                        <Group>
                            <Text fz={themeOptions.fontSize.s} style={{fontWeight:"600"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum eaque provident, corrupti voluptatem, ullam nihil quaerat tenetur itaque libero dignissimos error. Fugit sint voluptates, aut placeat vitae animi eos amet ipsa distinctio neque quidem, nesciunt laborum quasi culpa, qui sapiente hic provident. Ratione perspiciatis ullam corporis voluptatum voluptatibus aperiam reprehenderit.</Text>
                        </Group>
                        <Group c={themeOptions.color.button} style={{marginTop:"50px", border:"1px solid", borderRadius:"10px",padding:"10px", alignItems:"center"}}>
                            <Text style={{color:"#fff"}}>Add To WatchList</Text>
                            <FaPlus/>
                        </Group>
                    </Group>
                </Stack>
                <Stack  style={{marginLeft:"70px", marginTop:"200px"}} color='#fff'>
                    <Group style={{border:"1px solid #fff", borderRadius:"10px", paddingInline:"15px", background:"#fff", opacity:"40%"}}>
                        <Group display={'block'}>
                            <Text fz={themeOptions.fontSize.md} style={{marginBottom:"-10px"}}> Director </Text>
                            {director.map((e, i) =>
                            <Paper
                            style={{backgroundColor:'#fff'}}
                            key={i}
                            fz={themeOptions.fontSize.md}
                            w={116}
                            pt={5}
                            pb={5}
                            radius={13}
                            
                            >
                                <Text ta="left">{e}</Text>
                            </Paper>)}
                        </Group>
                        <IoIosArrowForward fontSize={'70px'}/>
                    </Group>
                    <Group style={{border:"1px solid #fff", borderRadius:"10px", paddingInline:"15px", background:"#fff", opacity:"40%"}}>
                        <Group display={'block'} >
                            <Text fz={themeOptions.fontSize.md} style={{marginBottom:"-10px"}}> Writers </Text>
                            {writer.map((e, i) =>
                            <Paper
                            style={{backgroundColor:'#fff'}}
                            key={i}
                            fz={themeOptions.fontSize.md}
                            w={116}
                            pt={5}
                            pb={5}
                            radius={13}
                            >
                                <Text ta="left">{e}</Text>
                            </Paper>)}
                        </Group>
                        <IoIosArrowForward fontSize={'70px'}/>
                    </Group>
                    <Group style={{border:"1px solid #fff", borderRadius:"10px", paddingInline:"15px", background:"#fff", opacity:"40%"}}>
                        <Group display={'block'}>
                            <Text fz={themeOptions.fontSize.md} style={{marginBottom:"-10px"}}> Cast </Text>
                            {cast.map((e, i) =>
                            <Paper
                            style={{backgroundColor:'#fff'}}
                            key={i}
                            fz={themeOptions.fontSize.md}
                            w={116}
                            pt={5}
                            pb={5}
                            radius={13}
                            
                            >
                                <Text ta="left">{e}</Text>
                            </Paper>)}
                        </Group>
                        <IoIosArrowForward fontSize={'70px'}/>
                    </Group>
                </Stack>
            </Group>
        </Stack>
        
    );
}