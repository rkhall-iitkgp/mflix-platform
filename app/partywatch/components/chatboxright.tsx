import React from 'react'
import { createStyles } from '@mantine/styles';
import themeOptions from '@/utils/colors';
import { useState } from 'react';
import Image from 'next/image';
import circleIcon from "../../../assets/Ellipse 32.svg"
const useStyles = createStyles((theme, _params, getRef) => {
    return {
        container: {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '10px',
            width: "60%",
            padding: "5px",
            marginLeft: "auto",
            //position: "absolute",
            // left: "0",


        },
        header: {
            display: 'flex',
            marginLeft: "auto"

        },

        time: {
            alignSelf: 'flex-end', // Aligns the time to the top-right corner
            marginLeft: 'auto', // Pushes the time to the right
            color: themeOptions.color.textColorNormal,
            fontWeight: "500",
            paddingRight: "20px"
        },
        message: {
            paddingLeft: '10px', //`     Adds some space between the user info/time and the message
            backgroundColor: " #29113C",
            color: "#ffffff",
            marginRight: "5px"
        },
        icon: {
            paddingTop: "5px",
            width: "16px",
            height: "16px"
        }
    };
});

const Chatboxright = ({ message, time }: { message: any, time: any }) => {
    const { classes } = useStyles()
    return (

        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.time}>{time}</div>
            </div>
            <div className={classes.header}>

                <div className={classes.message}>{message}</div>
                <Image src={circleIcon} alt='' className={classes.icon} />
            </div>


        </div>
    )
}

export default Chatboxright
