import React, { useState, useEffect } from 'react';
import './Styles/User-profile.css';
import { useParams } from 'react-router-dom';
import { Nav } from './Nav';
import Navx from './Nav-x';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import imageItem from '../assets/13.png';

const UserProfile = () => {
    const { username } = useParams();
    const [isActiveOption, setIsActiveOption] = useState('posts');
    const [userInfo, setUserInfo] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [myProfileName, setMyProfileName] = useState([]);
    const [editUserProfilePicture, setEditUserProfilePicture] = useState(false);
    const [followersNames, setFollowersNames] = useState([])
    const twitterUsername = username;

    useEffect(() => {
        setMyProfileName(localStorage.getItem('twitterUsername'));
    }, []);

    useEffect(() => {
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
    }, [username]);

    useEffect(() => {
        fetchPosts();
        fetchLikedPosts();
        fetchBookmarkedPosts();
    }, []);

    useEffect(() => {
        const fetchFollowersAndFollowing = async () => {
            try {
                const followersResponse = await fetch(`http://127.0.0.1:5000/user/${username}/followers`);
                const followersData = await followersResponse.json();
                setFollowers(followersData.followers);
                const followingResponse = await fetch(`http://127.0.0.1:5000/user/${username}/following`);
                const followingData = await followingResponse.json();
                setFollowing(followingData.following);
                const nameList = followersData.followers.map(follower => follower.twitterUsername)
                setFollowersNames(nameList)
                console.log(followersNames);
                // Check follow status
                setIsFollowing(followersNames.includes(myProfileName));
                
            } catch (error) {
                console.error('Error fetching followers and following:', error);
            }
        };

        fetchFollowersAndFollowing();
    }, [username, myProfileName, followers]);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/posts');
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            const filteredPosts = data.filter(item => item.twitterUsername === username);
            setPosts(filteredPosts);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchLikedPosts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/posts/user/likes', {
                headers: {
                    'Twitter-Username': twitterUsername
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch liked posts');
            }
            const data = await response.json();
            setLikedPosts(data.reverse());
        } catch (error) {
            console.error(error);
        }
    };

    const fetchBookmarkedPosts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/posts/user/bookmarks', {
                headers: {
                    'Twitter-Username': twitterUsername
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch bookmarked posts');
            }
            const data = await response.json();
            setBookmarkedPosts(data.reverse());
        } catch (error) {
            console.error(error);
        }
    };

    const handleFollow = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/user/${username}/follow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Twitter-Username': myProfileName
                }
            });

            if (response.ok) {
                setIsFollowing(true);
                setFollowers(prev => [...prev, myProfileName]);
            }
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    const handleUnfollow = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/user/${username}/unfollow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Twitter-Username': myProfileName
                }
            });

            if (response.ok) {
                setIsFollowing(false);
                setFollowers(prev => prev.filter(follower => follower !== myProfileName));
            }
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    return (
        <div className='user-profile-container'>
            <div className='nav-wrapper' style={{ backgroundColor: '#121212' }}>
                <Nav editUserProfilePicture={editUserProfilePicture} />
            </div>

            <div className='for-you-container flex justify-between'>
                <div className='nav-x'>
                    <Navx username={username} />
                </div>

                <div className='user-profile-display'>
                    <div className='up-info p-3'>
                        <div className='flex up-info-heading'>
                            <div className='up-img p-2' onClick={() => setEditUserProfilePicture(true)}>
                                <img src={userInfo && userInfo.profilePicture} alt="" />
                            </div>
                            <div className='p-1'>
                                <div className='up-name'>
                                    <h1>
                                        <b>{userInfo && userInfo.twitterUsername} <small className='verification-badge'><FontAwesomeIcon icon={faCircleCheck} /></small></b>
                                    </h1>
                                </div>
                                <div className='up-sub-name'><p>{userInfo && userInfo.discordId}</p></div>
                                {
                                    userInfo && userInfo.twitterUsername === myProfileName ? (
                                        <div className='follow-user mt-3 px-4 border border-primary text-primary text-center'>
                                            <button onClick={() => setEditUserProfilePicture(true)} className='p-1 px-2'>Edit Image</button>
                                        </div>
                                    ) : (
                                        !isFollowing ? (
                                            <div className='follow-user mt-3 px-4 border border-primary text-primary text-center'>
                                                <button onClick={handleFollow} className='p-1 px-2'>Follow</button>
                                            </div>
                                        ) : (
                                            <div className='follow-user mt-3 px-4 border border-primary text-primary text-center'>
                                                <button onClick={handleUnfollow} className='p-1 px-2'>Unfollow</button>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </div>
                        <div className='flex mt-4 mx-6'>
                            <div className='flex px-4 follow-count'>
                                <h1 className='px-1'><b>{followers.length}</b></h1>
                                <p>Followers</p>
                            </div>

                            <div className='flex follow-count'>
                                <h1 className='px-1'><b>{following.length}</b></h1>
                                <p>Following</p>
                            </div>

                        </div>

                        <div className='up-options-banner px-5'>
                            <div className='flex up-options-items'>
                                <div
                                    onClick={() => setIsActiveOption('posts')}
                                    className={`px-8 ${isActiveOption === 'posts' ? 'active' : ''}`}
                                >
                                    Posts
                                </div>

                                <div
                                    className={`px-8 ${isActiveOption === 'likes' ? 'active' : ''}`}
                                    onClick={() => setIsActiveOption('likes')}
                                >
                                    Likes
                                </div>
                                <div
                                    className={`px-8 ${isActiveOption === 'bookmarks' ? 'active' : ''}`}
                                    onClick={() => setIsActiveOption('bookmarks')}
                                >
                                    Bookmarks
                                </div>
                            </div>
                            {/* for posts  */}
                            <div className='container mt-4'
                                style={{
                                    display: isActiveOption === 'posts' ? 'grid' : 'none'
                                }}
                            >
                                {
                                    posts.map((post, index) => (
                                        <div className='item' key={index}>
                                            {post.mediaType === 'image' ? (
                                                <img src={post.url} alt='' />
                                            ) : (
                                                <video src={post.url} autoPlay loop ></video>
                                            )}
                                        </div>
                                    ))
                                }

                            </div>

                            {/* for Likes  */}
                            <div className='container mt-4'
                                style={{
                                    display: isActiveOption === 'likes' ? 'grid' : 'none'
                                }}
                            >
                                {
                                    likedPosts.map((post, index) => (
                                        <div className='item' key={index}>
                                            {post.mediaType === 'video' ? (
                                                <video src={post.url} autoPlay loop ></video>
                                            ) : (
                                                <img src={post.url} alt='' />
                                            )}
                                        </div>
                                    ))
                                }
                            </div>
                            {/* for bookmarks */}
                            <div className='container mt-4'
                                style={{
                                    display: isActiveOption === 'bookmarks' ? 'grid' : 'none'
                                }}
                            >
                                {
                                    bookmarkedPosts.map((post, index) => (
                                        <div className='item' key={index}>
                                            {post.mediaType === 'image' ? (
                                                <img src={post.url} alt='' />
                                            ) : (
                                                <video src={post.url} autoPlay loop ></video>
                                            )}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
