"use client";
import { useState } from "react";
import ChatTab from "./ChatTab";
import SettingsTab from "./SettingsTab";
import style from "./PartyChat.module.css";

export default function PartyChat({ ws }: { ws: WebSocket }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className={style.container}>
            <div className={style.tabcontainer}>
                <button
                    onClick={() => setActiveTab(0)}
                    className={activeTab == 0 ? style.active : style.tab}
                >
                    Chat
                </button>
                <button
                    onClick={() => setActiveTab(1)}
                    className={activeTab == 1 ? style.active : style.tab}
                >
                    Settings
                </button>
            </div>
            {activeTab == 0 ? <ChatTab ws={ws} /> : <SettingsTab />}
        </div>
    );
}
