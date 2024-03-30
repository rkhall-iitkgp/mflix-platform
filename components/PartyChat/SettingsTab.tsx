"use client";

import { useEffect, useRef } from "react";
import style from "./PartyChat.module.css";
import { Switch } from "@mantine/core";
import UserListItem from "./UserListItem";
import usePlayerStore from "@/Stores/PlayerStore";
import { toast } from "react-toastify";

const SettingsTab = () => {
    const linkRef = useRef<HTMLInputElement>(null);
    const { users, allowedControls, setAllowedControls } = usePlayerStore();
    useEffect(() => {
        if (linkRef.current) {
            linkRef.current.value = "https://meet.google.com/abc-defg-hij";
        }
    });

    const copyLink = () => {
        if (linkRef.current) {
            navigator.clipboard.writeText(linkRef.current.value);
            toast.error("Code Copied", {
                position: "top-center",
            });
        }
    };

    return (
        <>
            <div className={style.setting}>
                <div className={style.invite}>
                    <h3 className={style.heading}>Send Invite Link</h3>
                    <p className={style.paragraph}>
                        Use this link to invite others and watch together
                    </p>
                    <div>
                        <input disabled ref={linkRef} className={style.copy} />
                        <button className={style.copyBtn} onClick={copyLink}>
                            Copy
                        </button>
                    </div>
                </div>
                <div className={style.controls}>
                    <h3 className={style.heading}>Watch Controls</h3>
                    <Switch
                        checked={allowedControls}
                        onChange={(e) => {
                            setAllowedControls(e.currentTarget.checked);
                        }}
                        labelPosition="left"
                        color="#6034df"
                        label="Anyone can pause video"
                    />
                </div>
                <div className={style.details}>
                    <h3 className={style.heading}>Details</h3>
                    <div className={style.userlist}>
                        {users.map((user) => {
                            return (
                                <UserListItem isCreator={false} user={user} />
                            );
                        })}
                    </div>
                </div>
                <div className={style.endparty}>
                    <button>End Watch Party</button>
                </div>
            </div>
        </>
    );
};

export default SettingsTab;
