import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";



export default function SetAvatar() {


    // // https://api.multiavatar.com/Starcrasher.png?apikey=jevc7MOhLurHwT
    // https://api.multiavatar.com/4645646?apikey=jevc7MOhLurHwT

    const api = `https://api.multiavatar.com`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    // biar harus login dulu
    useEffect(() => {
      const asyncFn = async () =>{
          if (!axios.defaults.headers.common['Authorization']){
            navigate("/login");
          }
      };
      asyncFn();
    }, []);



    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
          toast.error("Please select an avatar", toastOptions);
        } else {
          // const user = await JSON.parse(
          //   localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          // );
    
          const { data } = await axios.put(`${setAvatarRoute}`, {
            pfp: avatars[selectedAvatar],
          }).catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              toast.error("Error setting avatar. Please try again.", toastOptions);
              
            }});

          console.log(data);
          navigate("/");

          // if (data.isSet) {
          //   user.isAvatarImageSet = true;
          //   user.avatarImage = data.image;
          //   localStorage.setItem(
          //     process.env.REACT_APP_LOCALHOST_KEY,
          //     JSON.stringify(user)
          //   );
          //   navigate("/");
          // } else {
          //   toast.error("Error setting avatar. Please try again.", toastOptions);
          // }
        }
      };
    
    

    useEffect(() => {
        const data = [];
        const maxRetries = 4;
        const asyncFn = async () =>{
          for (let i = 0; i < 4; i++) {
            let retry = 0;
            let image;
            while (retry < maxRetries) {
              try {
                image = await axios.get(
                  `${api}/${Math.round(Math.random() * 1000)}?apikey=jevc7MOhLurHwT`
                ,{
                  headers:{
                    'Authorization':undefined
                  }
                });
                break;
              } catch (error) {
                console.error(error);
                retry++;
              }
            }
            if (image) {
              const buffer = new Buffer(image.data);
              data.push(buffer.toString("base64"));
            } else {
              // use fallback image or placeholder
            }
          }
          setAvatars(data);
          setIsLoading(false);
        };
        asyncFn();
      }, []);



      return (
        <>
          {isLoading ? (
            <Container>
              <img src={loader} alt="loader" className="loader" />
            </Container>
          ) : (
            <Container>
              <div className="title-container">
                <h1>Pick an Avatar as your profile picture</h1>
              </div>
              <div className="avatars">
                {avatars.map((avatar, index) => {
                  return (
                    <div
                      className={`avatar ${
                        selectedAvatar === index ? "selected" : ""
                      }`}
                    >
                      <img
                        src={`data:image/svg+xml;base64,${avatar}`}
                        alt="avatar"
                        key={avatar}
                        onClick={() => setSelectedAvatar(index)}
                      />
                    </div>
                  );
                })}
              </div>
              <button onClick={setProfilePicture} className="submit-btn">
                Set as Profile Picture
              </button>
              <ToastContainer />
            </Container>
          )}
        </>
      );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;

    .loader {
        max-inline-size: 100%;
      }

    .title-container {
        h1 {
            color: white;
        }
    }

    .avatars {
        display: flex;
        gap: 2rem;
        .avatar {
          border: 0.4rem solid transparent;
          padding: 0.4rem;
          border-radius: 5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: 0.5s ease-in-out;
          img {
            height: 6rem;
            transition: 0.5s ease-in-out;
          }
        }
        .selected {
          border: 0.4rem solid #4e0eff;
        }
      }
      .submit-btn {
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
          background-color: #4e0eff;
        }
      }
      
`;
