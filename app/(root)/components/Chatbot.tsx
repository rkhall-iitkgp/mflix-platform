import { Container } from '@mantine/core'
import Image from 'next/image'
import React from 'react'
import Bot from '@/assets/images/bot.png'
import { createStyles } from '@mantine/styles'

export default function Chatbot() {
    return (
        <Container>
            <Image src={Bot} alt="Chatbot" width={300} height={300} />
        </Container>
    )
}

const styles = createStyles((theme) => ({
    chatbot: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        margin: "1rem"
    },
}))