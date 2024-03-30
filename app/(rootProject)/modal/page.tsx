"use client"

import { createStyles } from '@mantine/styles'
import React from 'react'

export default function Modal() {
    const { classes } = useStyles()
    return (
        <div className={classes.modalContainer}>
            <h1>Create or join an existing room</h1>
            <div className={classes.container}>
                <div>
                    <button>Create Room</button>
                </div>
                <div className={classes.join}>
                    <input type="text" placeholder='Enter Room Code' />
                    <button>Join Room</button>
                </div>
            </div>
        </div>
    )
}

const useStyles = createStyles(() => ({
    modalContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        margin: "1rem auto",
        padding: "1rem",
        // backgroundColor: "rgba(0, 0, 0, 0.8)",
        background: "grey",
        fontSize: "1.3rem",
        width: "60vw",

        h1: {
            fontSize: "2rem",
            textAlign: "center"
        },

        button: {
            background: "rgba(0, 0, 0, 0.5)",
            color: "white",
            outline: "none",
            border: "none",
            margin: "1rem",
            padding: "1rem 2rem",
            borderRadius: "10px"
        },
        input: {
            padding: "1rem 2rem",
            background: "transparent",
            outline: "none",
            border: "3px solid rgb(0, 0, 0, 0.8)",
            borderRadius: "10px",
            color: "white",
            "::placeholder": {
                color: "rgba(255, 255, 255, 0.4)"
            }
        }
    },
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    join: {
        display: "flex",
        flexDirection: "column"
    }
}))
