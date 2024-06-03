import React, { useState, useEffect } from 'react';
import './Styles/feed.css';
import logo from '../assets/logo.png';
import imageItem from '../assets/default-pfp.png';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const Nav = ({ isUploadPage, editUserProfilePicture }) => {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const twitterUsername = localStorage.getItem('twitterUsername');
    const userPfofilePicture = localStorage.getItem('pfp')

    useEffect(() => {
        const username = localStorage.getItem('twitterUsername');
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/user/${username}/profile`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setUserInfo(data.user_info);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        fetchUserProfile();
    }, [userInfo]);

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        uploadProfilePicture(file);
    };

    const uploadProfilePicture = async (file) => {
        try {
            const formData = new FormData();
            formData.append('profileImage', file);

            const response = await fetch('http://127.0.0.1:5000/upload-profile-picture', {
                method: 'POST',
                headers: {
                    'Twitter-Username': twitterUsername
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload profile picture');
            }

            const data = await response.json();
            console.log('Profile picture uploaded:', data.profileImageUrl);
            setProfileImage(data.profileImageUrl);
            localStorage.setItem('pfp', data.profileImageUrl);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const handleEditProfilePicture = () => {
            if (editUserProfilePicture) {
                const fileInput = document.getElementById('profileImageUpload');
                fileInput.click();
            }
        };

        handleEditProfilePicture();
    
    }, [editUserProfilePicture])
    



    return (
        <div className={`nav-container flex justify-between items-center px-4 ${isUploadPage ? 'bg-white' : ''}`}>
            <div className='logo-container'>
                <img src={logo} alt="" />
            </div>

            {/* <div
                className='search-container'
                style={{
                    display: isUploadPage ? 'none' : 'block'
                }}
            >
                <input className='search-bar' type="text" placeholder='Search' />
            </div> */}

            <div className='utils-container'
                style={{
                    justifyContent: isUploadPage ? 'flex-end' : 'space-between'
                }}
            >
                <div
                    className=''
                    style={{
                        display: isUploadPage ? 'none' : 'block'
                    }}
                >
                    <button className='' onClick={() => navigate('/upload')}><FontAwesomeIcon icon={faPlus} /> <span className='mobile-no-display'>Upload</span></button>
                </div>

                <div className='profile-img-icon-container'>
                    <label htmlFor="profileImageUpload" style={{ cursor: 'pointer' }}>
                        <img src={userInfo?userInfo.profilePicture:imageItem} alt="" />
                        <span className='text-primary add-new-pfp'><FontAwesomeIcon icon={faPlus} /></span>
                    </label>
                    <input
                        type="file"
                        id="profileImageUpload"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleProfileImageChange}
                    />
                </div>
            </div>
        </div>
    );
};
