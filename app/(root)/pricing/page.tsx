// "use client"

// import {
//     TextInput,
//     PasswordInput,
//     Text,
//     PaperProps,
//     Button,
//     Divider,
//     Flex, Box
// } from '@mantine/core';
// import themeOptions from '../../../assets/themes/colors'
// import Plan from './Plan';
// import { createStyles } from '@mantine/styles';



// const Pricing = () => {
//     const useStyles = createStyles(() => ({
//         BannerOuterStyles: {
//             display: 'flex', flexDirection: 'row', height: '80vh'
//         },
//         ImageBoxStyles: {
//             height: '100%',
//             backgroundImage: "url('gradient.png')",
//             backgroundSize: 'cover',
//             backgroundRepeat: 'no-repeat',
//             backgroundPosition: 'center',
//             width: '30%'
//         },
//         BannerTextStyles: {
//             width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem', marginTop: '20%', marginLeft: '4rem'
//         },
//         ImageBackgroundStyles: {
//             width: '70%', backgroundColor: 'black', height: '100%',
//             backgroundImage: "url('pricing.png'),url('gradient.png')",
//             backgroundSize: 'cover',
//             backgroundRepeat: 'no-repeat',
//             backgroundPosition: 'center',
//         },



//     }));
//     const { classes } = useStyles();
//     return (
//         <Box>
//             <Box className={classes.BannerOuterStyles} >
//                 <Box className={classes.ImageBoxStyles} >
//                     <Box className={classes.BannerTextStyles} >
//                         <Text style={{ color: 'white', fontSize: '3.5rem', fontWeight: 'bold', lineHeight: '4.0rem', maxWidth: '30rem' }} >Watch without limits.</Text>
//                         <Text style={{ color: themeOptions.color.textColorNormal, fontSize: '1.6rem', width: '80%' }} >Try our premium plans starting at just $5</Text>
//                         <Button style={{ backgroundColor: themeOptions.color.smallBox, maxWidth: '8rem' }} >View All Plans</Button>
//                         <Text size="0.6rem" c={'white'} >*Terms and Condition applied</Text>
//                     </Box>
//                 </Box>
//                 <Box className={classes.ImageBackgroundStyles} >
//                 </Box>
//             </Box>

//             <Plan />
//         </Box >

//     );
// }

// export default Pricing;
"use client"
import React from "react";
import Banner from "./banner";
import Plan from "./Plan";
import { Box } from "@mantine/core";
const Pricing = () => {
    return (
        <Box>
            <Banner ></Banner>
            <Plan></Plan>
        </Box>

    );
}

export default Pricing;