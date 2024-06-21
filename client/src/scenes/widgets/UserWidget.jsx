import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from "@mui/icons-material";
import { Typography, Divider, Box, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const UserWidget = ({ userId, picturePath }) => {

    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.token);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const dark = palette.neutral.dark,
        medium = palette.neutral.medium,
        main = palette.neutral.main;
    const backendUrl = process.env.REACT_APP_BACKEND_URL;


    const getUser = async () => {
        const response = await fetch(`${backendUrl}/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, [])

    if (!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends
    } = user;


    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
                gap=".5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween
                    gap="1rem"
                >
                    {/* {console.log(picturePath)   } */}
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>{friends.length} friends</Typography>

                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>

            <Divider />

            {/* SECOND ROW */}
            <Box
                p="1rem 0"
            >
                <Box
                    display="flex"
                    alignItems="center"
                    gap="1rem"
                    mb=".5rem"
                >
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{location}</Typography>
                </Box>

                <Box
                    display="flex"
                    alignItems="center"
                    gap="1rem"
                >
                    <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>
            <Divider />


            {/* ROW 3 */}
            <Box p="1rem 0">
                <FlexBetween mb=".5rem">
                    <Typography color={medium}>Who viewed your profile</Typography>
                    <Typography color={main} fontWeight="500">{viewedProfile}</Typography>
                </FlexBetween>
                <FlexBetween mb=".5rem">
                    <Typography color={medium}>Impression of your post</Typography>
                    <Typography color={main} fontWeight="500">{impressions}</Typography>
                </FlexBetween>
            </Box>
            <Divider />


            {/* ROW 4 */}
            <Box p="1rem 0">
                <Typography
                    fontSize="1rem"
                    mb="1rem"
                    fontWeight="500"
                    color={main}
                >
                    Social Profiles
                </Typography>

                <FlexBetween
                    gap="1rem"
                    mb=".5rem"
                >
                    <FlexBetween gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter logo" />
                        <Box>
                            <Typography
                                color={main}
                                fontWeight="500"
                            >
                                Twitter
                            </Typography>
                            <Typography color={medium}>
                                Social Network
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>

                <FlexBetween
                    gap="1rem"
                >
                    <FlexBetween gap="1rem">
                        <img src="../assets/linkedin.png" alt="linkedin logo" />
                        <Box>
                            <Typography
                                color={main}
                                fontWeight="500"
                            >
                                Linkedin
                            </Typography>
                            <Typography color={medium}>
                                Network platform
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
                
            </Box>
        </WidgetWrapper>
    )


};


export default UserWidget;