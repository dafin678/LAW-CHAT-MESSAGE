
export const host = "http://localhost:8888";
export const logoutRoute = `${host}/api/auth/logout`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/message/addmsg`;
export const recieveMessageRoute = `${host}/api/message/getmsg`;

export const host2 = "http://34.28.228.30";
// export const host2 = "http://localhost:5001";
export const contactsRoute = `${host2}/api/contact`;


export const broadcastHost = "http://localhost:4530"
export const broadcastRoute = `${broadcastHost}/api/broadcast/get`


export const userHost = `http://35.238.106.86`;
// export const userHost = `http://127.0.0.1:8000`;
export const loginRoute = `${userHost}/users/login`;
export const registerRoute = `${userHost}/users`;
export const setAvatarRoute = `${userHost}/users/picture`;
