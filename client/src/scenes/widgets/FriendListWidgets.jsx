import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";


export default function FriendListWidget({ userId }) {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const getFriends = async () => {
        try {
            const respose = await fetch(`${backendUrl}/users/${userId}/friends`,
                {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                })
            const data = await respose.json();
            dispatch(setFriends({ friends: data }));
        }
        catch (err) {
            console.log("get friend error : " + err);
        }
    };

    useEffect(() => {
        getFriends();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps


    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Friend List
            </Typography>

            <Box
                display="flex"
                flexDirection="column"
                gap="1.5rem"
            >
                {friends.map((friend) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    )

}