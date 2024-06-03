import React, { useState, useEffect } from 'react'
import imageItem from '../assets/13.png'

const Navx = () => {
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const twitterUsername = localStorage.getItem('twitterUsername');
    useEffect(() => {
        const fetchFollowersAndFollowing = async () => {
            try {
                const followersResponse = await fetch(`http://127.0.0.1:5000/user/${twitterUsername}/followers`);
                const followersData = await followersResponse.json();
                setFollowers(followersData.followers);
                const followingResponse = await fetch(`http://127.0.0.1:5000/user/${twitterUsername}/following`);
                const followingData = await followingResponse.json();
                setFollowing(followingData.following);
                console.log(followers);
            } catch (error) {
                console.error('Error fetching followers and following s:', error);
            }
        };

        fetchFollowersAndFollowing();
    }, [followers]);

    return (
        <div className='navx-container py-5'>
            <div className='flex justify-around'>
                <div>Following</div>
                <div className='greyed-out'>Followers</div>
            </div>

            <div className='mt-5 p-3'>
                <ul>
                    <li className='flex items-center'>
                        <div><img src={imageItem} alt="" /></div>
                        <div className='px-1'>
                            <h4>banbanamanvr</h4>
                            <small>𝕭𝖆𝖓𝖇𝖆𝖓𝖆𝖒𝖆𝖓𝖁𝖗 </small>
                        </div>
                    </li>
                    <li className='flex items-center'>
                        <div><img src={imageItem} alt="" /></div>
                        <div className='px-1'>
                            <h4>banbanamanvr</h4>
                            <small>𝕭𝖆𝖓𝖇𝖆𝖓𝖆𝖒𝖆𝖓𝖁𝖗 </small>
                        </div>
                    </li>
                    <li className='flex items-center'>
                        <div><img src={imageItem} alt="" /></div>
                        <div className='px-1'>
                            <h4>banbanamanvr</h4>
                            <small>𝕭𝖆𝖓𝖇𝖆𝖓𝖆𝖒𝖆𝖓𝖁𝖗 </small>
                        </div>
                    </li>
                    <li className='flex items-center'>
                        <div><img src={imageItem} alt="" /></div>
                        <div className='px-1'>
                            <h4>banbanamanvr</h4>
                            <small>𝕭𝖆𝖓𝖇𝖆𝖓𝖆𝖒𝖆𝖓𝖁𝖗 </small>
                        </div>
                    </li>
                    <li className='flex items-center'>
                        <div><img src={imageItem} alt="" /></div>
                        <div className='px-1'>
                            <h4>banbanamanvr</h4>
                            <small>𝕭𝖆𝖓𝖇𝖆𝖓𝖆𝖒𝖆𝖓𝖁𝖗 </small>
                        </div>
                    </li>
                    <li className='flex items-center'>
                        <div><img src={imageItem} alt="" /></div>
                        <div className='px-1'>
                            <h4>banbanamanvr</h4>
                            <small>𝕭𝖆𝖓𝖇𝖆𝖓𝖆𝖒𝖆𝖓𝖁𝖗 </small>
                        </div>
                    </li>
                    <li className='flex items-center'>
                        <div><img src={imageItem} alt="" /></div>
                        <div className='px-1'>
                            <h4>banbanamanvr</h4>
                            <small>𝕭𝖆𝖓𝖇𝖆𝖓𝖆𝖒𝖆𝖓𝖁𝖗 </small>
                        </div>
                    </li>
                    <li className='flex items-center'>
                        <div><img src={imageItem} alt="" /></div>
                        <div className='px-1'>
                            <h4>banbanamanvr</h4>
                            <small>𝕭𝖆𝖓𝖇𝖆𝖓𝖆𝖒𝖆𝖓𝖁𝖗 </small>
                        </div>
                    </li>
                    <li className='flex items-center'>
                        <div><img src={imageItem} alt="" /></div>
                        <div className='px-1'>
                            <h4>banbanamanvr</h4>
                            <small>𝕭𝖆𝖓𝖇𝖆𝖓𝖆𝖒𝖆𝖓𝖁𝖗 </small>
                        </div>
                    </li>
                    <li className='flex items-center'>
                        <div><img src={imageItem} alt="" /></div>
                        <div className='px-1'>
                            <h4>banbanamanvr</h4>
                            <small>𝕭𝖆𝖓𝖇𝖆𝖓𝖆𝖒𝖆𝖓𝖁𝖗 </small>
                        </div>
                    </li>
                    <li className='flex items-center'>
                        <div><img src={imageItem} alt="" /></div>
                        <div className='px-1'>
                            <h4>banbanamanvr</h4>
                            <small>𝕭𝖆𝖓𝖇𝖆𝖓𝖆𝖒𝖆𝖓𝖁𝖗 </small>
                        </div>
                    </li>

                    <li>
                        <h3 className='text-primary2'>See more</h3>
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default Navx
