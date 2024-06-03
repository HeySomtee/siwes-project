import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/feed.css';
import { Nav } from './Nav';
import imageItem from '../assets/13.png';
import defaultImage from '../assets/default-pfp.png';
import Navx from './Nav-x';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus, faCommentDots, faBookmark, faDownload, faClose, faChevronUp, faChevronDown, faCircleCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Feed = ({ setIsUploadPage, isUploadPage }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMobileCsActive, setIsMobileCsActive] = useState(false);
  const twitterUsername = localStorage.getItem('twitterUsername');
  const [comment, setComment] = useState('');
  const [selectedPost, setSelectedPost] = useState(null); // To store the selected post for robust view

  useEffect(() => {
    fetchPosts();
    fetchLikedPosts();
    fetchBookmarkedPosts();
    setIsUploadPage(false);
    console.log(selectedPost);
    console.log(posts);
  }, [selectedPost]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
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
      setLikedPosts(data);
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
      setBookmarkedPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/posts/${postId}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Twitter-Username': twitterUsername,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to like post');
      }
      // Update the state or UI accordingly
      fetchPosts();
      fetchLikedPosts();
      fetchBookmarkedPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookmark = async (postId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/posts/${postId}/bookmark`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Twitter-Username': twitterUsername,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to bookmark post');
      }
      // Update the state or UI accordingly
      fetchPosts();
      fetchLikedPosts();
      fetchBookmarkedPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/posts/${selectedPost.id}/comment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: comment,
          twitterUsername: twitterUsername, // Include the user's Twitter username
          userUrl: localStorage.getItem('pfp'), // Include the user's profile picture URL
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to comment on post');
      }
      // Update the state or UI accordingly
      const responseData = await response.json();
      const updatedComments = responseData.comments;

      // Find the selected post in the posts state array
      const updatedSelectedPost = { ...selectedPost, comments: updatedComments };
      setSelectedPost(updatedSelectedPost);
      setComment('');
      fetchPosts();
      fetchLikedPosts();
      fetchBookmarkedPosts();
      setComment(''); // Clear the comment input

    } catch (error) {
      console.error(error);
    }
  };

  const isPostLiked = (postId) => {
    return likedPosts.some(post => post.id === postId);
  };

  const isPostBookmarked = (postId) => {
    return bookmarkedPosts.some(post => post.id === postId);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const openRobustView = (post) => {
    setSelectedPost(post);
    setIsFullScreen(true);
  };

  const openRobustViewMobile = (post) => {
    setSelectedPost(post);
    setIsMobileCsActive(true);
  };

  const changeSelectedPost = (direction) => {
    const currentIndex = posts.findIndex(item => item.id === selectedPost.id);
    let newIndex;
    if (direction === 'up') {
      newIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : posts.length - 1;
    } else if (direction === 'down') {
      newIndex = currentIndex + 1 < posts.length ? currentIndex + 1 : 0;
    }
    openRobustView(posts[newIndex]);
  };

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(urlBlob);
    } catch (error) {
      console.error('Error downloading the file', error);
    }
  };

  const navigateToUserProfile = (username) => {
    navigate(`/user/${username}`)
  }


  return (
    <div className={`feed-container ${isFullScreen ? 'full-screen' : ''}`}>
      <div className='nav-wrapper' style={{ backgroundColor: '#121212' }}>
        <Nav isUploadPage={isUploadPage} />
      </div>
      <div className='for-you-container flex justify-between'>
        <div className='nav-x mobile-no-display'>
          <Navx />
        </div>
        

        <div className='for-you-media' onScroll={() => setIsMobileCsActive(false)}>
          {posts.map((post, index) => (
            <div className='new-media-item' key={index}>
              <div className='flex'>
                <div onClick={() => navigateToUserProfile(post.twitterUsername)} className='heading profile-img-icon-container mobile-no-display px-3'>
                  <img src={post.userUrl ? post.userUrl : defaultImage} alt='' />
                </div>

                <div className='media-details flex justify-between'>
                  <div className='text-details'>
                    <div onClick={() => navigateToUserProfile(post.twitterUsername)} className='username mobile-no-display cursor'>{post.twitterUsername} <span className='verification-badge'><FontAwesomeIcon icon={faCircleCheck} /></span></div>
                    <div className='media-caption mobile-no-display description-text'>{post.description}</div>
                    <div className='media-item flex justify-between'>
                      <div className='post-img-container' onClick={() => setIsMobileCsActive(false)}>
                        <div className='post-img-wrapper'>
                          {
                            post.mediaType == 'video' ? (
                              <video src={post.url} autoPlay loop controls ></video>
                            ) : (
                              <img src={post.url} alt='' />

                            )
                          }

                        </div>

                        <div className='flex items-end info-display desktop-no-display'>
                          <div className='info-display-text desktop-no-display'>
                            <div onClick={() => navigateToUserProfile(post.twitterUsername)} className='username'><b>{post.twitterUsername}</b> <span className='verification-badge'><FontAwesomeIcon icon={faCircleCheck} /></span></div>
                            <div className='media-caption description-text'>{post.description}</div>
                          </div>
                        </div>

                        {/* <div className='info-display-upload-btn desktop-no-display'>
                          <div><FontAwesomeIcon icon={faPlus} /></div>
                        </div> */}

                        <div className='comment-section p-3' style={{display: isMobileCsActive ? 'block' : 'none'}}>
                          <div className='cs-heading-wrapper'>
                            <div className='cs-caption-section p-4'>
                              <div className='flex items-center'>
                                <div className='heading profile-img-icon-container'>
                                  <img src={selectedPost ? selectedPost.userUrl : ''} alt="" />
                                </div>
                                <div className='cs-name-tag px-2 flex justify-between'>
                                  <div>
                                    <p>{selectedPost ? selectedPost.twitterUsername : ''}</p>
                                    <small>{selectedPost ? selectedPost.discordId : ''}</small>
                                  </div>

                                  {/* <div className='follow-user px-4 py-1 bg-primary text-white'>
                                    <button className='p-1 px-2'>Follow</button>
                                  </div> */}
                                </div>
                              </div>
                              <div className={`mt-4`}>
                                {selectedPost ? selectedPost.description : ''}
                                <span className='media-hastags'>{selectedPost ? selectedPost.hashtags : ''}</span>
                              </div>
                            </div>
                            <div className='utils-x flex p-1 justify-around'>
                              <div>
                                <div><FontAwesomeIcon icon={faHeart} /></div>
                                <small>{selectedPost ? selectedPost.likes : 0}</small>
                              </div>
                              <div>
                                <div><FontAwesomeIcon icon={faCommentDots} /></div>
                                <small>{selectedPost ? selectedPost.comments.length : 0}</small>
                              </div>
                              <div>
                                <div><FontAwesomeIcon icon={faBookmark} /></div>
                                <small>{selectedPost ? selectedPost.favourites : 0}</small>
                              </div>
                            </div>
                            <div className='px-4 mt-4'>Comments ({selectedPost ? selectedPost.comments.length : 0})</div>
                          </div>

                          <div className='comment-item-container'>
                            <div className='comment-item-container'>
                              {selectedPost && selectedPost.comments && selectedPost.comments.map((comment, index) => (
                                comment.twitterUsername && (
                                  <div className='comment-item p-4' key={index}>
                                    <div className='flex'>
                                      <div className='heading profile-img-icon-container'>
                                        <img src={comment.userUrl ? comment.userUrl : defaultImage} alt="" />
                                      </div>
                                      <div className='cs-name-tag px-2 flex justify-between'>
                                        <div>
                                          <small>{comment.twitterUsername}</small>
                                          <p className='py-1 comment-text'>{comment.text}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              ))}


                            </div>

                          </div>
                          <div className='comment-input'>
                            <div className='flex justify-around items-center mx-8'>
                              <input
                                type="text"
                                placeholder='Add comment'
                                value={comment}
                                onChange={handleCommentChange}
                              />
                              <span className={comment ? 'text-primary cursor' : 'text-secondary cursor'} onClick={handleComment}>Post <FontAwesomeIcon icon={faPaperPlane} /></span>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div className='interface-wrapper'>
                        <div className='interface'>
                          <div className='desktop-no-display'>
                            <div onClick={() => navigateToUserProfile(post.twitterUsername)} className=' pfp-holder'>
                              <img src={post.userUrl ? post.userUrl : defaultImage} alt='' />
                            </div> <br />
                            {/* <small>{post.likes}</small> */}
                          </div>
                          <div onClick={() => handleLike(post.id)}>
                            <div><FontAwesomeIcon icon={faHeart} style={{ color: isPostLiked(post.id) ? '#eb3b58' : 'white' }} /></div>
                            <small>{post.likes}</small>
                          </div>
                          <div className='mobile-no-display' onClick={() => openRobustView(post)}>
                            <div><FontAwesomeIcon icon={faCommentDots} /></div>
                            <small>{post.comments.length}</small>
                          </div>
                          <div className='desktop-no-display' onClick={() => openRobustViewMobile(post)}>
                            <div><FontAwesomeIcon icon={faCommentDots} /></div>
                            <small>{post.comments.length}</small>
                          </div>
                          <div onClick={() => handleBookmark(post.id)}>
                            <div><FontAwesomeIcon icon={faBookmark} style={{ color: isPostBookmarked(post.id) ? 'yellow' : 'white' }} /></div>
                            <small>{post.favourites}</small>
                          </div>
                          <div onClick={()=> handleDownload(post.url, `lucidBTC-by-somtee_ioj-${post.id}`)}>
                            <div><FontAwesomeIcon icon={faDownload} /></div> 
                            <small>{post.shares}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className='follow-user mobile-no-display px-4 border border-primary text-primary'>
                    <button className='p-1 px-2'>Follow</button>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='robust-view flex' style={{ display: isFullScreen ? 'flex' : 'none' }}>
        <div className='robust-view flex' style={{ display: isFullScreen ? 'flex' : 'none' }}>
          <div className='media-diaplay-section'>
            <div className='p-6'>
              <div onClick={() => setIsFullScreen(false)} className='util-btn'><FontAwesomeIcon icon={faClose} /></div>
            </div>

            <div className='image-item'>
              {
                selectedPost && selectedPost.mediaType == 'video' ? (
                  <video src={selectedPost ? selectedPost.url : ''} autoPlay loop></video>

                ) : (
                  <img src={selectedPost ? selectedPost.url : ''} alt="" />
                )
              }
            </div>

            <div className='scroll-btn-section'>
              <div className="util-btn" onClick={() => changeSelectedPost('up')}><FontAwesomeIcon icon={faChevronUp} /></div>
              <div className="util-btn" onClick={() => changeSelectedPost('down')}><FontAwesomeIcon icon={faChevronDown} /></div>
            </div>
          </div>

          <div className='comment-section p-3'>
            <div className='cs-heading-wrapper'>
              <div className='cs-caption-section p-4'>
                <div className='flex items-center'>
                  <div className='heading profile-img-icon-container'>
                    <img src={selectedPost ? selectedPost.userUrl : ''} alt="" />
                  </div>
                  <div className='cs-name-tag px-2 flex justify-between'>
                    <div>
                      <p>{selectedPost ? selectedPost.twitterUsername : ''}</p>
                      <small>{selectedPost ? selectedPost.discordId : ''}</small>
                    </div>

                    {/* <div className='follow-user px-4 py-1 bg-primary text-white'>
                      <button className='p-1 px-2'>Follow</button>
                    </div> */}
                  </div>
                </div>
                <div className={`mt-4`}>
                  {selectedPost ? selectedPost.description : ''}
                  <span className='media-hastags'>{selectedPost ? selectedPost.hashtags : ''}</span>
                </div>
              </div>
              <div className='utils-x flex p-1 justify-around'>
                <div>
                  <div><FontAwesomeIcon icon={faHeart} /></div>
                  <small>{selectedPost ? selectedPost.likes : 0}</small>
                </div>
                <div>
                  <div><FontAwesomeIcon icon={faCommentDots} /></div>
                  <small>{selectedPost ? selectedPost.comments.length : 0}</small>
                </div>
                <div>
                  <div><FontAwesomeIcon icon={faBookmark} /></div>
                  <small>{selectedPost ? selectedPost.favourites : 0}</small>
                </div>
              </div>
              <div className='px-4 mt-4'>Comments ({selectedPost ? selectedPost.comments.length : 0})</div>
            </div>

            <div className='comment-item-container'>
              <div className='comment-item-container'>
                {selectedPost && selectedPost.comments && selectedPost.comments.map((comment, index) => (
                  comment.twitterUsername && (
                    <div className='comment-item p-4' key={index}>
                      <div className='flex'>
                        <div className='heading profile-img-icon-container'>
                          <img src={comment.userUrl ? comment.userUrl : defaultImage} alt="" />
                        </div>
                        <div className='cs-name-tag px-2 flex justify-between'>
                          <div>
                            <small>{comment.twitterUsername}</small>
                            <p className='py-1 comment-text'>{comment.text}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}


              </div>

            </div>
            <div className='comment-input'>
              <div className='flex justify-around items-center mx-8'>
                <input
                  type="text"
                  placeholder='Add comment'
                  value={comment}
                  onChange={handleCommentChange}
                />
                <span className={comment ? 'text-primary cursor' : 'text-secondary cursor'} onClick={handleComment}>Post <FontAwesomeIcon icon={faPaperPlane} /></span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Feed;
