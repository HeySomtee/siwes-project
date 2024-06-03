import React, { useState, useEffect } from 'react';
import imageItem from '../assets/13.png';

const Navx = ({ username }) => {
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [activeTab, setActiveTab] = useState('followers')
    let twitterUsername;
    username ? twitterUsername = username : twitterUsername = localStorage.getItem('twitterUsername');

    useEffect(() => {
        const fetchFollowersAndFollowing = async () => {
            try {
                const followersResponse = await fetch(`http://127.0.0.1:5000/user/${twitterUsername}/followers`);
                const followersData = await followersResponse.json();
                setFollowers(followersData.followers);
                console.log(followers);

                const followingResponse = await fetch(`http://127.0.0.1:5000/user/${twitterUsername}/following`);
                const followingData = await followingResponse.json();
                setFollowing(followingData.following);
            } catch (error) {
                console.error('Error fetching followers and following:', error);
            }
        };

        fetchFollowersAndFollowing();
    }, []);

    const renderUserList = (users) => {
        if (users.length == 0) {
            return <small>No {activeTab} Found</small>
        }
        return users.map((user, index) => (
            <li className='flex items-center' key={index}>
                <div><img src={user.profilePicture || imageItem} alt="" className='w-10 h-10 rounded-full' /></div>
                <div className='px-1'>
                    <h4>{user.twitterUsername}</h4>
                    <small>{user.discordId}</small>
                </div>
            </li>
        ));
    };

    return (
        <div className='navx-container py-5'>
            <div className='flex'>
                <div className='mt-5 p-3 cursor' onClick={() => setActiveTab('followers')}>
                    <h2>Followers</h2>
                </div>
                <div className='mt-5 p-3 cursor' onClick={() => setActiveTab('following')}>
                    <h2>Following</h2>
                </div>
            </div>
            <br />
            <div style={{display: activeTab === 'followers' ? 'block' : 'none'}} className='px-3'>
                <ul>
                    {renderUserList(followers)}
                </ul>
            </div>
            <div style={{display: activeTab === 'following' ? 'block' : 'none'}} className='px-3'>
                <ul>
                    {renderUserList(following)}
                </ul>
            </div>
        </div>
    );
};

export default Navx;
