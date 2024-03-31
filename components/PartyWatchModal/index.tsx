"use client";

import { createStyles } from "@mantine/styles";
import React, { useRef } from "react";
import style from "./PartyChatModal.module.css";
import { FaXmark } from "react-icons/fa6";
import usePlayerStore from "@/Stores/PlayerStore";

export default function PartyWatchModal({
    handleCreate,
    handleJoin,
}: {
    handleCreate: () => void;
    handleJoin: (s: string) => void;
}) {
    const { setOpenModal } = usePlayerStore();
    const codeRef = useRef<HTMLInputElement>(null);
    return (
        <div className={style.modalContainer}>
            <div className={style.modal}>
                <button
                    onClick={() => {
                        setOpenModal(false);
                    }}
                    className={style.close}
                >
                    <FaXmark />
                </button>
                <h1 style={{ textAlign: "center" }}>
                    Watch movies with your loved ones
                </h1>
                <div className={style.container}>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleCreate();
                            setOpenModal(false);
                        }}
                        className={style.create}
                    >
                        Create Room
                    </button>
                    <span>or</span>
                    <div className={style.join}>
                        <input
                            ref={codeRef}
                            className={style.input}
                            type="text"
                            placeholder="Enter Room Code"
                        />
                        <button
                            onClick={(e) => {
                                if (!codeRef.current) return;
                                e.preventDefault();
                                console.log(codeRef.current.value);
                                handleJoin(codeRef.current.value);
                                setOpenModal(false);
                            }}
                            className={style.joinbtn}
                        >
                            Join Room
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
