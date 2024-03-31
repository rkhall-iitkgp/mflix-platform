"use client";

import React, { useState, useEffect } from "react";
import { createStyles } from "@mantine/styles";
import Image from "next/image";
import { Button, Drawer } from "@mantine/core";
import { FaCamera } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profileIcon from "@/assets/icons/profile.svg";
import tabletIcon from "@/assets/icons/tablet.svg";
import laptopIcon from "@/assets/icons/laptop.svg";
import editIcon from "@/assets/icons/editProfile.svg";
import saveIcon from "@/assets/icons/save.svg";
import themeOptions from "@/utils/colors";
import { MdDelete } from "react-icons/md";
import useLoginStore from "@/Stores/LoginStore";
import { useRouter } from "next/navigation";
import uIcon from "@/assets/icons/profile1.svg";
const userIcon = uIcon;

const icon = profileIcon;

type UserInfo = {
    name: string;
    email: string;
    phone: number;
    dob: string;
    plan: string;
};

const initialUserInfo: UserInfo = {
    name: "John Doe",
    email: "john@example.com",
    phone: 1234567890,
    dob: "01/01/1990",
    plan: "Basic",
};

type UserProfile = {
    profileName: string;
    profileId: number;
    avatarUrl: string;
};

const userProfiles: UserProfile[] = [
    {
        profileName: "Profile1",
        profileId: 1,
        avatarUrl: profileIcon,
    },
    {
        profileName: "Profile2",
        profileId: 2,
        avatarUrl: profileIcon,
    },
    {
        profileName: "Profile3",
        profileId: 3,
        avatarUrl: profileIcon,
    },
];

type UserSignedInInfo = {
    deviceId: number;
    deviceName: string;
    iconUrl: string;
};

const userSignedInInfos: UserSignedInInfo[] = [
    {
        deviceId: 123,
        deviceName: "Desktop",
        iconUrl: laptopIcon,
    },
    {
        deviceId: 456,
        deviceName: "Mobile",
        iconUrl: laptopIcon,
    },
    {
        deviceId: 789,
        deviceName: "Tablet",
        iconUrl: tabletIcon,
    },
];

const useStyles = createStyles(() => ({
    containerStyle: {
        backgroundColor: "red",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        minHeight: "100%",
        width: "100%",
        // backgroundColor: 'red'
        // marginTop: 1000
        // border :'solid white 2px'
    },
    // drawerStyle: {
    //     // offsetPath: 'padding-box',
    //     offset: 10
    // },
    childStyle: {
        backgroundColor: "green",
        width: "70%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        // border: '1px solid #ccc',
        padding: "2vw",
        textAlign: "center",
        // height:'80vh'
    },
    flexContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        border: "0.1rem solid white",
        borderRadius: "0.8em",
        width: "100%",
        padding: "2vw",
        // gap:'2rem',
        marginLeft: "3vw",
        marginRight: "3vw",
    },
    profileContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    profileItem: {
        display: "flex",
        flexDirection: "row",
        // padding: '2vw',
        // marginLeft: '1vw',
        // marginRight: '1vw',
        // borderBottom: 'white 1px solid',
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        gap: "1vw",
    },

    userInfoItem: {
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: "0",
        paddingRight: "0",
        paddingTop: "1vw",
        paddingBottom: "1vw",
        borderBottom: "white solid 1px",
    },
    userInfoInput: {
        border: "none",
        backgroundColor: "transparent",
        width: "40%",
        textAlign: "right",
        color: "white",
    },

    editableInput: {
        borderBottom: "1px solid white",
    },
}));
import searchMsApiUrls from "../api/searchMsApi";
import { Tooltip } from "@mantine/core";
import { userInfo } from "os";

const UserDetails = ({ opened }: any) => {
    const router = useRouter();
    const { classes } = useStyles();
    const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [nameError, setNameError] = useState<string>("");
    const [phoneError, setPhoneError] = useState<string>("");
    const [lastValidValues, setLastValidValues] =
        useState<UserInfo>(initialUserInfo);
    const [manageProfile, setManageProfile] = useState(0);
    const [manageDevice, setManageDevice] = useState(0);
    const [userDetails, setUserDetails] = useState({});
    const [activeLogins, setActiveLogins] = useState<
        { _id: string; loginTime: string }[]
    >([]);
    const [profiles, setProfiles] = useState<{ name: string; _id: string }[]>(
        [],
    );
    const [flag1, setFlag1] = useState(true);
    const state = useLoginStore.getState();
    const [details, setDetails] = useState(useLoginStore.getState());

    const getActiveUsers = async () => {
        const base_url = searchMsApiUrls();

        // const UserDetails: UserInfo = {
        //     name: state.name,
        //     email: state.email,
        //     phone: state.phone,
        //     dob: state.dob.substring(0, 10),
        //     plan: "Basic"
        // };
        // setUserInfo(UserDetails);
        try {
            const user_id = state._id;
            if (!user_id) {
                router.push("/login");
            }
        } catch (error) {
            console.error("Error occurred while processing user ID:", error);
        }
        console.log(state);
        let res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/details/`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            },
        );

        let jsonData = await res.json();
        if (!res.ok) {
            console.log(jsonData);
            router.push("/login");
        } else {
            console.log(jsonData);
            setUserDetails({
                name: jsonData.account?.name,
                email: jsonData.account?.email,
                phone: jsonData.account?.phone,
                dob: jsonData.account?.dob?.substring(0, 10),
                plan: jsonData.account?.subscriptionTier?.tier?.name,
            });
            setActiveLogins(jsonData.account.activeLogins);
            setProfiles(jsonData.account.userProfiles);
            // useLoginStore.getState().updateUser(jsonData.account);
        }
    };

    // useEffect(() => {
    //     getActiveUsers();
    // }, [activeLogins]);

    useEffect(() => {
        getActiveUsers();
    }, []);

    const getUserDetails = () => {
        const state = details;
        const UserDetails: UserInfo = {
            name: state.name,
            email: state.email,
            phone: state.phone,
            dob: state.dob.substring(0, 10),
            plan:
                !state.subscriptionTier ||
                !state.subscriptionTier.tier.name ||
                !state.subscriptionTier.tier.name
                    ? "Free"
                    : state.subscriptionTier.tier.name,

            // plan: userDetails.subscriptionTier.tier.name
            // plan: state.subscriptionTier.tier.name,
        };
        setUserInfo(UserDetails);
        // console.log(userDetails);
        // setProfiles(state.userProfiles);
    };

    useEffect(() => {
        getUserDetails();
    }, []);
    useEffect(() => {
        console.log(userInfo, "Hi", state.subscriptionTier);
    }, [userInfo]);

    const handleEditClick = () => {
        setEditMode(!editMode);
    };
    const toggleManageProfile = () => {
        setManageProfile((prevState) => (prevState === 0 ? 1 : 0));
    };
    const toggleManageDevice = () => {
        setManageDevice((prevState) => (prevState === 0 ? 1 : 0));
    };
    const updateDetails = async () => {
        const data = userInfo;
        console.log(userInfo);
        let res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/details`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    ...data,
                }),
            },
        );

        let jsonData = await res.json();
        if (!res.ok) {
            console.log(jsonData);
            toast.error("Unable to edit details!", {
                position: "top-center",
            });
        } else {
            toast.success("Saved Successfully!", {
                position: "top-center",
            });
            console.log(jsonData);
            useLoginStore.getState().updateUser(jsonData.account);
            setDetails(useLoginStore.getState());
            const jsonDataString = JSON.stringify(jsonData.account);
            console.log(jsonDataString);
            if (jsonDataString !== undefined) {
                localStorage.setItem("user", jsonDataString);
            }
        }
    };
    const handleSaveClick = () => {
        let nameValid = true;
        let phoneValid = true;

        if (!userInfo.name.trim()) {
            setNameError("Name cannot be empty");
            nameValid = false;
        } else {
            setNameError("");
        }

        if (!/^\d{10}$/.test(userInfo.phone.toString())) {
            setPhoneError(
                "Phone number must be 10 digits long and contain only numbers",
            );
            phoneValid = false;
        } else {
            setPhoneError("");
        }

        if (nameValid && phoneValid) {
            setEditMode(false);
            setLastValidValues({ ...userInfo });
            updateDetails(); // Update lastValidValues when input is valid
        } else {
            console.log("Input error");
            setUserInfo(lastValidValues); // Revert to last valid values on invalid input
        }
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        key: keyof UserInfo,
    ) => {
        const state = useLoginStore.getState();
        console.log(state);
        const { value } = event.target;
        setUserInfo({ ...userInfo, [key]: value });

        if (key === "name") {
            setNameError("");
        } else if (key === "phone") {
            setPhoneError("");
        }
    };

    const handleFieldFocus = (key: keyof UserInfo) => {
        setLastValidValues({ ...userInfo });
    };
    // const call = useEffect(() => {
    const handleDeviceDelete = async (id: any) => {
        const base_url = searchMsApiUrls();
        console.log("device delete");
        console.log(activeLogins[id]._id);
        const user_id = state._id;
        // console.log(state);
        const values = {
            loginId: activeLogins[id]._id,
        };
        let res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/removeActiveLogin`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    ...values,
                }),
            },
        );
        let jsonData = await res.json();
        if (!res.ok) {
            console.log(jsonData);
        } else {
            console.log("user Deleted");
            // console.log(jsonData);
            // var filtered = activeLogins.filter(item => item !== id);
            // console.log(filtered);
            // var newActiveLogins = activeLogins.splice(id, 1);
            setActiveLogins((prev) => prev.filter((_, index) => index !== id));
            // useLoginStore.getState().updateUser(jsonData.account);
        }
    };
    const handleProfileDelete = async (id: any) => {
        const base_url = searchMsApiUrls();
        console.log(profiles[id]._id);
        const user_id = state._id;
        // console.log(state);
        const values = {
            userId: profiles[id]._id,
        };
        let res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/delete`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    ...values,
                }),
            },
        );
        let jsonData = await res.json();
        if (!res.ok) {
            console.log(jsonData);
        } else {
            console.log("user Profile Deleted");
            console.log(jsonData);

            // var filtered = activeLogins.filter(item => item !== id);
            // console.log(filtered);
            // var newActiveLogins = activeLogins.splice(id, 1);
            setProfiles((prev) => prev.filter((_, index) => index !== id));
            // useLoginStore.getState().updateUser(jsonData.account);
        }
    };

    useEffect(() => {
        if (flag1) {
            getActiveUsers();
            setFlag1(false);
        }
    }, [flag1]);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                justifyContent: "space-between",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h1 style={{ color: "white" }}>User Profile</h1>
                <div
                    style={{
                        height: "20vh",
                        width: "20vh",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "0.2rem solid white",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Image src={uIcon} alt="Profile" width={180} height={180} />{" "}
                    {/* Replace src with actual image URL */}
                    {/* Camera Icon */}
                </div>
                {/* <div
          style={{
            position: 'relative',
            left: '45%',
            transform: 'translate(-50%, -50%)',
            marginTop: '-10%',
          }}
        >
          <div
            style={{
              backgroundColor: themeOptions.color.button,
              borderRadius: '50%',
              height: '3rem',
              width: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FaCamera style={{ color: 'white' }} />
          </div>
        </div> */}
            </div>
            <div
                style={{
                    width: "70%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    // border: '1px solid #ccc',
                    padding: "2vw",
                    textAlign: "center",
                }}
            >
                {" "}
                {/* child style*/}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        border: "0.1rem solid white",
                        borderRadius: "0.8rem",
                        width: "100%",
                        padding: "2vw",
                        // gap:'2rem',
                    }}
                >
                    {" "}
                    {/* flex container*/}
                    <div
                        style={{
                            height: "4rem",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        {" "}
                        {/* user info item*/}
                        <h2 style={{ color: "#7011B6" }}>User Information</h2>
                        {editMode ? (
                            <Image
                                src={saveIcon}
                                alt="Save"
                                width={40}
                                height={40}
                                onClick={handleSaveClick}
                            />
                        ) : (
                            <Image
                                src={editIcon}
                                alt="Edit"
                                width={40}
                                height={40}
                                onClick={handleEditClick}
                            />
                        )}
                    </div>
                    {Object.entries(userDetails).map(([key, value], index) => (
                        <div
                            key={index}
                            className={classes.userInfoItem}
                            style={{
                                borderBottom:
                                    index ===
                                    Object.entries(userInfo).length - 1
                                        ? "none"
                                        : "white solid 1px",
                            }}
                        >
                            <div style={{ color: "white", fontWeight: "bold" }}>
                                {key}:
                            </div>
                            {editMode && (key === "name" || key === "phone") ? (
                                <>
                                    {key === "name" && nameError && (
                                        <div
                                            style={{
                                                color: "red",
                                                alignContent: "right",
                                            }}
                                        >
                                            {nameError}
                                        </div>
                                    )}
                                    {key === "phone" && phoneError && (
                                        <div style={{ color: "red" }}>
                                            {phoneError}
                                        </div>
                                    )}
                                    <input
                                        type="text"
                                        value={value as string | number}
                                        onChange={(event) =>
                                            handleChange(event, key)
                                        }
                                        onFocus={() => handleFieldFocus(key)}
                                        className={`${classes.userInfoInput} ${editMode && (key === "name" || key === "phone") ? classes.editableInput : ""}`}
                                    />
                                </>
                            ) : (
                                <div style={{ color: "white" }}>
                                    {value as string}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div
                style={{
                    width: "72%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    // border: '1px solid #ccc',
                    textAlign: "center",
                }}
            >
                {/*child style*/}

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        border: "0.1rem solid white",
                        borderRadius: "0.8rem",
                        width: "100%",

                        // gap:'2rem',
                        marginLeft: "3vw",
                        marginRight: "3vw",
                    }}
                >
                    {/*flex container*/}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            borderRadius: "0.8rem ",
                            paddingLeft: "4%",
                            paddingRight: "4%",
                        }}
                    >
                        <h2 style={{ color: "#7011B6", textAlign: "left" }}>
                            Your Profiles
                        </h2>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                            }}
                        >
                            {/*profile container*/}
                            {profiles.map((profile, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: "100%",
                                        paddingBottom: "0.5vw",
                                        marginBottom: "2rem",
                                        // borderBottom: '0.1rem white solid',
                                    }}
                                >
                                    {/*profile item*/}
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "2vw",
                                        }}
                                    >
                                        <Image
                                            src={icon}
                                            alt="prfl"
                                            width={50}
                                            height={50}
                                        />
                                        <div
                                            style={{
                                                color: "white",
                                                paddingTop: "0.5rem",
                                            }}
                                        >
                                            {profile.name}
                                        </div>
                                    </div>
                                    <div style={{ paddingRight: "1vw" }}>
                                        {manageProfile &&
                                        activeLogins.length > 1 ? (
                                            <MdDelete
                                                style={{
                                                    color: "white",
                                                    fontSize: "1.5rem",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                    handleProfileDelete(index);
                                                }}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {profiles.length > 1 ? (
                        <button
                            style={{
                                borderRadius: "0.8rem",
                                color: "white",
                                height: "10%",
                                width: "100%",
                                backgroundColor: themeOptions.color.button,
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                toggleManageProfile();
                            }}
                        >
                            Manage Profile
                        </button>
                    ) : null}
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        border: "0.1rem solid white",
                        borderRadius: "0.8rem",
                        width: "100%",
                        // gap:'2rem',
                        marginLeft: "3vw",
                        marginRight: "3vw",
                        // height: '25rem',
                    }}
                >
                    {/*flex container*/}
                    <div>
                        <div
                            style={{
                                paddingRight: "1vw",
                                paddingLeft: "1vw",
                            }}
                        >
                            <h2 style={{ color: "#7011B6", textAlign: "left" }}>
                                User Signed-in Info
                            </h2>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                                paddingRight: "1vw",
                                paddingLeft: "1vw",
                                marginTop: "-1.5rem",
                            }}
                        >
                            {/*profile container*/}
                            {activeLogins.map((info, index) => (
                                <div
                                    key={index}
                                    className={classes.profileItem}
                                >
                                    {/*profile item*/}
                                    <>
                                        <Tooltip label={info._id}>
                                            <p style={{ color: "white" }}>
                                                Device ID:{" "}
                                                {info?._id?.slice(0, 8)}...
                                            </p>
                                        </Tooltip>
                                        <p style={{ color: "white" }}>
                                            {new Date(
                                                info.loginTime,
                                            ).toLocaleString()}{" "}
                                        </p>
                                        {/* <div style={{ color: 'white' }}>
                                        </div> */}
                                        <div style={{ paddingRight: "1vw" }}>
                                            {manageDevice &&
                                            activeLogins.length > 1 ? (
                                                <MdDelete
                                                    style={{
                                                        color: "white",
                                                        fontSize: "1.5rem",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                        handleDeviceDelete(
                                                            index,
                                                        );
                                                    }}
                                                />
                                            ) : null}
                                        </div>
                                    </>
                                </div>
                            ))}
                        </div>
                    </div>
                    {activeLogins.length > 1 ? (
                        <button
                            style={{
                                borderRadius: "0.8rem",
                                color: "white",
                                height: "2rem",
                                width: "100%",
                                backgroundColor: themeOptions.color.button,
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                toggleManageDevice();
                            }}
                        >
                            Manage Devices
                        </button>
                    ) : null}
                </div>
            </div>
            <ToastContainer style={{ zIndex: "9999999" }} />
        </div>
    );
};

export default UserDetails;
