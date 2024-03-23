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
            padding: "5px"

        },
        header: {
            display: 'flex',
        },
        userInfo: {
            alignSelf: 'flex-start', // Aligns the user info to the top-left corner
            fontWeight: '500',
            marginRight: 'auto', // Pushes the time to the right
            paddingLeft: "20px",
            color: themeOptions.color.textColorNormal
        },
        time: {
            alignSelf: 'flex-end', // Aligns the time to the top-right corner
            marginLeft: 'auto', // Pushes the time to the right
            color: themeOptions.color.textColorNormal,
            fontWeight: "500"
        },
        message: {
            paddingLeft: '10px', //`     Adds some space between the user info/time and the message
            backgroundColor: "#271F2D ",
            color: "#ffffff",
            marginLeft: "5px"
        },
        icon: {
            paddingTop: "5px",
            width: "16px",
            height: "16px"
        }
    };
});

const Chatboxleft = ({ user, message, time }: { user: any, message: any, time: any }) => {
    const { classes } = useStyles()
    return (

        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.userInfo}>{user}</div>
                <div className={classes.time}>{time}</div>
            </div>
            <div className={classes.header}>
                <Image src={circleIcon} alt='' className={classes.icon} />
                <div className={classes.message}>{message}</div>
            </div>


        </div>
    )
}

export default Chatboxleft
