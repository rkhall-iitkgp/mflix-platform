"use client"
import React, {useState} from "react";

import {
    TextInput,
    PasswordInput,
    Text,
    PaperProps,
    Button,
    Divider,
    Flex, Box
} from '@mantine/core';
import { createStyles } from '@mantine/styles';
import CustomTickIcon from './customtickicon'; 

export  default function Plan(){

    const[planInner1, setPlanInner1]= useState(true);
    const[planInner2, setPlanInner2]= useState(false);
    const[planInner3, setPlanInner3]= useState(false);
    
    function handlePlanInner1(){
        setPlanInner1(true);
        setPlanInner2(false);
        setPlanInner3(false);
    }

    function handlePlanInner2(){
        setPlanInner1(false);
        setPlanInner2(true);
        setPlanInner3(false);
    }

    function handlePlanInner3(){
        setPlanInner1(false);
        setPlanInner2(false);
        setPlanInner3(true);
    }

    const[cardPlan1, setCardPlan1]=useState(false);
    const[cardPlan2, setCardPlan2]=useState(true);
    const[cardPlan3, setCardPlan3]=useState(false);

    function handleCardPlan1(){
    setCardPlan1(true);
    setCardPlan2(false);
    setCardPlan3(false);
    }
    function handleCardPlan2(){
    setCardPlan1(false);
    setCardPlan2(true);
    setCardPlan3(false);
    }
    function handleCardPlan3(){
    setCardPlan1(false);
    setCardPlan2(false);
    setCardPlan3(true);
    }


     const useStyles = createStyles(() => ({
        OuterBoxStyles: {
            fontFamily: 'Poppins, cursive', // Applying Poppins font
            // backgroundImage: "url('background.png')",
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            marginTop:"8%",
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',   
            textWrap: 'wrap',
        },

        PlanBoxStyles: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            border: '2.5px solid #7012b6', width: '40%', height:"10%",
            borderRadius: '15px',
            backdropFilter: 'blur(10px)', backgroundColor: 'rgba(0, 0, 0, 0.1)', marginTop: '1rem'
        },

        PlanInnerBoxStyles:{
        height:"100%",
        width:"100%",
        borderRadius: '10px',
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
        },

        PlanInnerBoxStylesClicked:{
            height:"100%",
            width:"100%",
            borderRadius: '10px',
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:"#7012b6",
            },

        CardOuterBoxStyles:{
        width:"100%",
        height:"600px",
        display:"flex",
        marginTop:"5%",
        justifyContent:"space-evenly",
        alignItem:"center",
        flexDirection:"row",
        color:"white",
        },

        PlanCardStyles:{
            height:"85%",
            width:"25%",
            display:"flex",
            justifyContent:"space-evenly",
            alignItems:"left",
            flexDirection:"column",
            borderRadius:"15px",
            // backgroundColor:"white",
            // background: "linear-gradient(45deg, rgba(43,10,53,1) 10%, rgba(143,60,205,1) 80%, rgba(43,10,53,1) 95%)",
            border:"1.5px solid white",
            // backdropFilter:"blur(100px)",
        },

        PlanCardStylesClicked:{
            background: "linear-gradient(45deg, rgba(43,10,53,1) 10%, rgba(143,60,205,1) 80%, rgba(43,10,53,1) 95%)",
            backdropFilter:"blur(10px)", opacity:"0.7",
            height:"85%",
            width:"25%",
            display:"flex",
            justifyContent:"space-evenly",
            alignItems:"left",
            flexDirection:"column",
            borderRadius:"15px",
            // backgroundColor:"white",
            // background: "linear-gradient(45deg, rgba(43,10,53,1) 10%, rgba(143,60,205,1) 80%, rgba(43,10,53,1) 95%)",
            border:"1.5px solid white",
            // backdropFilter:"blur(100px)",
        },

        PlanNameStyles:{
         paddingLeft:"1rem",
         
        },

        FormStyles: {
            width: '100%', display: 'flex', flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
       
        ErrorStyles: {
            color: 'red', fontSize: '0.9rem', marginTop: '5px', minHeight: '1.2rem', width: '70%',
        },
       


    }));


    const { classes } = useStyles();

    return(
        <Box className={classes.OuterBoxStyles}>
          
         <Box className={classes.PlanBoxStyles}>
               <Box onClick={handlePlanInner1} className={planInner1 ? classes.PlanInnerBoxStylesClicked : classes.PlanInnerBoxStyles }>
                <Text>Monthly</Text></Box>
               <Box onClick={handlePlanInner2} className={planInner2 ? classes.PlanInnerBoxStylesClicked : classes.PlanInnerBoxStyles }>
                <Text>Quarterly</Text></Box>
               <Box onClick={handlePlanInner3} className={planInner3 ? classes.PlanInnerBoxStylesClicked : classes.PlanInnerBoxStyles }>
                <Text>Annually</Text></Box>
         </Box>

         <Box className={classes.CardOuterBoxStyles}>
            {/* Card1 */}
         <Box onClick={handleCardPlan1} style={{}}className={cardPlan1 ? classes.PlanCardStylesClicked : classes.PlanCardStyles}>
         <Box className={classes.PlanNameStyles}><Text size="xl" fw={700}>Basic</Text></Box>
         <Box style={{display:"flex", flexDirection:"row", paddingLeft:"4%"}}>
            { planInner1 ? <><h3>$100/</h3><h5>month</h5></> :null || planInner2 ? <><h3>$250/</h3><h5>quarter</h5></> : null
            || planInner3 ? <><h3>$1000/</h3><h5>year</h5></>: null}</Box>

         <Box style={{display:"flex", flexDirection:"column", paddingLeft:"3%"}}>
            <Text>. Lorem ipsum dolor sit amet</Text>
            <Text>. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
            <Text>. quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute </Text>
            <Text>. cillum dolore eu fugiat nulla pariatur</Text>
        </Box>

         </Box>
         {/* Card2 */}

         <Box onClick={handleCardPlan2} className={cardPlan2 ? classes.PlanCardStylesClicked : classes.PlanCardStyles}>
         <Box className={classes.PlanNameStyles}><Text size="xl" fw={700}>Premium</Text></Box>
         <Box style={{display:"flex", flexDirection:"row", paddingLeft:"4%"}}>
            { planInner1 ? <><h3>$150/</h3><h5>month</h5></> :null || planInner2 ? <><h3>$300/</h3><h5>quarter</h5></> : null
            || planInner3 ? <><h3>$1100/</h3><h5>year</h5></>: null}</Box>
         <Box style={{display:"flex", flexDirection:"column", paddingLeft:"3%"}}>
            <Text>. Lorem ipsum dolor sit amet</Text>
            <Text>. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
            <Text>. quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute </Text>
            <Text>. cillum dolore eu fugiat nulla pariatur</Text>
            </Box>
            </Box>

            {/* Card3 */}

         <Box onClick={handleCardPlan3}  className={cardPlan3 ? classes.PlanCardStylesClicked : classes.PlanCardStyles}>
         <Box className={classes.PlanNameStyles}><Text size="xl" fw={700}>Family</Text></Box>
         <Box style={{display:"flex", flexDirection:"row", paddingLeft:"4%"}}>
            { planInner1 ? <><h3>$200/</h3><h5>month</h5></> :null || planInner2 ? <><h3>$350/</h3><h5>quarter</h5></>:null
            || planInner3 ? <><h3>$1200/</h3><h5>year</h5></>: null}</Box>
         <Box style={{display:"flex", flexDirection:"column", paddingLeft:"3%"}}>
            <Text> . Lorem ipsum dolor sit amet</Text>
            <Text> . sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
            <Text> . quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute  </Text>
            <Text> . cillum dolore eu fugiat nulla pariatur</Text>
            </Box>
            </Box>
           
         </Box>
         <Button style={{color:"white", 
        background:"#5e2787", height:"3rem", width:"30%" }}>Continue with Plan</Button>
        
         

        </Box>
    );
                }
    