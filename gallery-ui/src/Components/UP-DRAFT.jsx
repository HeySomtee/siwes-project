import React, { useState } from 'react'
import './Styles/User-profile.css'
import { useParams } from 'react-router-dom';
import { Nav } from './Nav';
import imageItem from '../assets/13.png';
import defaultImage from '../assets/default-pfp.png';
import Navx from './Nav-x';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';


const UserProfile = () => {
    const { username } = useParams();
    const [isActiveOption, setIsActiveOption] = useState('posts')
    return (
        <div className='user-profile-container'>
            <div className='nav-wrapper' style={{ backgroundColor: '#121212' }}>
                <Nav />
            </div>

            <div className='for-you-container flex justify-between'>
                <div className='nav-x'>
                    <Navx />
                </div>

                <div className='user-profile-display p-6'>
                    <div className='up-info '>
                        <div className='flex up-info-heading'>
                            <div className='up-img'>
                                <img src={imageItem} alt="" />
                            </div>
                            <div className='p-3'>
                                <div className='up-name'>
                                    <h1>
                                        <b>fasa_0101 <small className='verification-badge'><FontAwesomeIcon icon={faCircleCheck} /></small></b>
                                    </h1>
                                </div>
                                <div className='up-sub-name'><p>S_sssss</p></div>
                                <div className='follow-user mt-3 px-4 border border-primary text-primary text-center'>
                                    <button className='p-1 px-2'>Follow</button>
                                </div>
                            </div>
                        </div>
                        <div className='flex mt-4'>
                            <div className='flex follow-count'>
                                <h1 className='px-1'><b>131</b></h1>
                                <p>Following</p>
                            </div>
                            <div className='flex px-4 follow-count'>
                                <h1 className='px-1'><b>11</b></h1>
                                <p>Followers</p>
                            </div>
                        </div>

                        {/* For posts */}
                        <div className='up-options-banner'>
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
                                <div className='item'></div>
                                <div className='item'></div>
                                <div className='item'></div>
                                <div className='item'></div>
                                <div className='item'></div>
                                <div className='item'></div>
                                <div className='item'></div>
                            </div>
                            {/* for Likes  */}
                            <div className='container mt-4'
                                style={{
                                    display: isActiveOption === 'likes' ? 'grid' : 'none'
                                }}
                            >
                                <div className='item'></div>
                                <div className='item'></div>
                                <div className='item'></div>
                                <div className='item'></div>
                                <div className='item'></div>
                                <div className='item'></div>
                                <div className='item'></div>
                            </div>
                            {/* for bookmarks */}
                            <div className='container mt-4'
                                style={{
                                    display: isActiveOption === 'bookmarks' ? 'grid' : 'none'
                                }}
                            >
                                <div className='item'></div>
                                <div className='item'></div>
                                <div className='item'></div>
                                <div className='item'></div>
                                <div className='item'></div>
                                <div className='item'></div>
                                <div className='item'></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile