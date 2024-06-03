import React, { useState, useEffect } from 'react';
import './Styles/feed.css';
import { Nav } from './Nav';
import imageItem from '../assets/13.png';
import Navx from './Nav-x';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentDots,faBookmark,faShare, faClose, faChevronUp, faChevronDown, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
// scroll bar styling and the caption overflow handling
const Feed = ({ setIsUploadPage, isUploadPage }) => {
  const [expanded, setExpanded] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setIsUploadPage(false)
  }, [])

  return (
    <div className='feed-container'>
      <div className='nav-wrapper'>
        <Nav
          isUploadPage={isUploadPage}
        />
      </div>

      <div className='for-you-container p-4 flex justify-between'>
        <div className='nav-x'>
          <Navx />
        </div>

        <div className='for-you-media'>
          <div className='new-media-item '>
            <div className='flex'>
              <div className='heading profile-img-icon-container px-3'>
                <img src={imageItem} alt="" />
              </div>

              <div className='media-details flex justify-between'>
                <div className='text-details'>
                  <div className='username'>neto.ftbl2NETO🐐 <span className='verification-badge'><FontAwesomeIcon icon={faCircleCheck} /></span></div>
                  <div className={`media-caption ${expanded ? 'expanded' : ''}`}>
                    Gallagher goal | chelsea vs aston villa 🔥
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus voluptates, porro deserunt atque ullam voluptas numquam dolores eaque molestias nam sapiente. Modi magni, sint cupiditate reiciendis optio explicabo fuga voluptatibus?
                    <span className='media-hastags'>#football #neto_ftbl2 #gallagher #chelsea #astonvilla #fyp #foryou #viral</span>

                  </div>

                  <div className='media-item flex justify-between'>
                    <img src={imageItem} alt="" />
                    <div className='interface'>
                      <div>
                        <div><FontAwesomeIcon icon={faHeart} /></div>
                        <small>30</small>
                      </div>
                      <div onClick={() => setIsFullScreen(true)}>
                        <div><FontAwesomeIcon icon={faCommentDots} /></div>
                        <small>267</small>
                      </div>
                      <div>
                        <div><FontAwesomeIcon icon={faBookmark} /></div>
                        <small>14</small>
                      </div>
                      <div>
                        <div><FontAwesomeIcon icon={faShare} /> </div>
                        <small>78</small>
                      </div>
                    </div>
                  </div>

                </div>

                <div className='follow-user px-4 border border-primary text-primary'>
                  <button className='p-1 px-2'>Follow</button>
                </div>
              </div>
            </div>
          </div>
          <div className='new-media-item '>
            <div className='flex'>
              <div className='heading profile-img-icon-container px-3'>
                <img src={imageItem} alt="" />
              </div>

              <div className='media-details flex justify-between'>
                <div className='text-details'>
                  <div className='username'>neto.ftbl2NETO🐐</div>
                  <div className={`media-caption ${expanded ? 'expanded' : ''}`}>
                    Gallagher goal | chelsea vs aston villa 🔥
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus voluptates, porro deserunt atque ullam voluptas numquam dolores eaque molestias nam sapiente. Modi magni, sint cupiditate reiciendis optio explicabo fuga voluptatibus?
                    <span className='media-hastags'>#football #neto_ftbl2 #gallagher #chelsea #astonvilla #fyp #foryou #viral</span>

                  </div>

                  <div className='media-item flex justify-between'>
                    <img src={imageItem} alt="" />
                    <div className='interface'>
                      <div>
                        <div><FontAwesomeIcon icon={faHeart} /></div>
                        <small>30</small>
                      </div>
                      <div>
                        <div><FontAwesomeIcon icon={faCommentDots} /></div>
                        <small>567</small>
                      </div>
                      <div>
                        <div><FontAwesomeIcon icon={faBookmark} /></div>
                        <small>14</small>
                      </div>
                      <div>
                        <div><FontAwesomeIcon icon={faShare} /> </div>
                        <small>78</small>
                      </div>
                    </div>
                  </div>

                </div>

                <div className='follow-user px-4 border border-primary text-primary'>
                  <button className='p-1 px-2'>Follow</button>
                </div>
              </div>
            </div>
          </div>
          <div className='new-media-item '>
            <div className='flex'>
              <div className='heading profile-img-icon-container px-3'>
                <img src={imageItem} alt="" />
              </div>

              <div className='media-details flex justify-between'>
                <div className='text-details'>
                  <div className='username'>neto.ftbl2NETO🐐</div>
                  <div className={`media-caption ${expanded ? 'expanded' : ''}`}>
                    LucidBTC | powered by ordinals 
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus voluptates, porro deserunt atque ullam voluptas numquam dolores eaque molestias nam sapiente. Modi magni, sint cupiditate reiciendis optio explicabo fuga voluptatibus?
                    <span className='media-hastags'>#WeAreLucid #neto_ftbl2 #NFT #ordinals #fanproject #fyp #foryou #viral</span>

                  </div>

                  <div className='media-item flex justify-between'>
                    <img src={imageItem} alt="" />
                    <div className='interface'>
                      <div>
                        <div><FontAwesomeIcon icon={faHeart} /></div>
                        <small>30</small>
                      </div>
                      <div>
                        <div><FontAwesomeIcon icon={faCommentDots} /></div>
                        <small>567</small>
                      </div>
                      <div>
                        <div><FontAwesomeIcon icon={faBookmark} /></div>
                        <small>14</small>
                      </div>
                      <div>
                        <div><FontAwesomeIcon icon={faShare} /> </div>
                        <small>78</small>
                      </div>
                    </div>
                  </div>

                </div>

                <div className='follow-user px-4 border border-primary text-primary'>
                  <button className='p-1 px-2'>Follow</button>
                </div>
              </div>
            </div>
          </div>


          <div className='new-media-item '>
            <div className='flex'>
              <div className='heading profile-img-icon-container px-3'>
                <img src={imageItem} alt="" />
              </div>

              <div className='media-details flex justify-between'>
                <div className='text-details'>
                  <div className='username'>neto.ftbl2NETO🐐</div>
                  <div className={`media-caption ${expanded ? 'expanded' : ''}`}>
                    Gallagher goal | chelsea vs aston villa 🔥
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus voluptates, porro deserunt atque ullam voluptas numquam dolores eaque molestias nam sapiente. Modi magni, sint cupiditate reiciendis optio explicabo fuga voluptatibus?
                    <span className='media-hastags'>#football #neto_ftbl2 #gallagher #chelsea #astonvilla #fyp #foryou #viral</span>

                  </div>

                  <div className='media-item flex justify-between'>
                    <img src={imageItem} alt="" />
                    <div className='interface'>
                      <div>
                        <div><FontAwesomeIcon icon={faHeart} /></div>
                        <small>30</small>
                      </div>
                      <div>
                        <div><FontAwesomeIcon icon={faCommentDots} /></div>
                        <small>567</small>
                      </div>
                      <div>
                        <div><FontAwesomeIcon icon={faBookmark} /></div>
                        <small>14</small>
                      </div>
                      <div>
                        <div><FontAwesomeIcon icon={faShare} /> </div>
                        <small>78</small>
                      </div>
                    </div>
                  </div>

                </div>

                <div className='follow-user px-4 border border-primary text-primary'>
                  <button className='p-1 px-2'>Follow</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='robust-view flex' style={{display: isFullScreen ? 'flex': 'none'}}>
        <div className='media-diaplay-section'>
          <div className='p-6'>
            <div onClick={()=> setIsFullScreen(false)} className='util-btn'><FontAwesomeIcon icon={faClose} /></div>
          </div>

          <div className='image-item'>
            <img src={imageItem} alt="" />
          </div>

          <div className='scroll-btn-section'>
            <div className="util-btn"><FontAwesomeIcon icon={faChevronUp} /></div>
            <div className="util-btn"><FontAwesomeIcon icon={faChevronDown} /></div>
          </div>
        </div>

        <div className='comment-section p-3'>
          <div className='cs-heading-wrapper'>
            <div className='cs-caption-section p-4'>
              <div className='flex items-center'>
                <div className='heading profile-img-icon-container'>
                  <img src={imageItem} alt="" />
                </div>
                <div className='cs-name-tag px-2 flex justify-between'>
                  <div>
                    <h5>neto.ftbl2NETO🐐</h5>
                    <small>neto4451</small>
                  </div>

                  <div className='follow-user px-4 py-1 bg-primary text-white'>
                    <button className='p-1 px-2'>Follow</button>
                  </div>
                </div>
              </div>
              <div className={` mt-4 ${expanded ? 'expanded' : ''}`}>
                Gallagher goal | chelsea vs aston villa 🔥
                <span className='media-hastags'>#football #neto_ftbl2 #gallagher #chelsea #astonvilla #fyp #foryou #viral</span>
              </div>
            </div>
            <div className='utils-x flex p-4 justify-around'>
              <div>
                <div><FontAwesomeIcon icon={faHeart} /></div>
                <small>555</small>
              </div>
              <div>
                <div><FontAwesomeIcon icon={faCommentDots} /></div>
                <small>235</small>
              </div>
              <div>
                <div><FontAwesomeIcon icon={faBookmark} /></div>
                <small>44</small>
              </div>
            </div>

            <div className='px-4 mt-4'>Comments (18)</div>
          </div>
            <div className='comment-item p-4'>
              <div className='flex'>
                <div className='heading profile-img-icon-container'>
                  <img src={imageItem} alt="" />
                </div>
                <div className='cs-name-tag px-2 flex justify-between'>
                  <div>
                    <h5>neto.ftbl2NETO🐐</h5>
                    <small className='comment-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum reiciendis molestias tempora quam vel atque sint repellat fuga? Omnis</small>
                  </div>
                </div>
              </div>
            </div>

            <div className='comment-item p-4'>
              <div className='flex'>
                <div className='heading profile-img-icon-container'>
                  <img src={imageItem} alt="" />
                </div>
                <div className='cs-name-tag px-2 flex justify-between'>
                  <div>
                    <h5>neto.ftbl2NETO🐐</h5>
                    <small className='comment-text'>eiciendis molestias tempora quam vel a</small>
                  </div>
                </div>
              </div>
            </div>

            <div className='comment-item p-4'>
              <div className='flex'>
                <div className='heading profile-img-icon-container'>
                  <img src={imageItem} alt="" />
                </div>
                <div className='cs-name-tag px-2 flex justify-between'>
                  <div>
                    <h5>neto.ftbl2NETO🐐</h5>
                    <small className='comment-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem enim nesciunt sequi tempora, distinctio laboriosam dolorum animi veritatis, quasi obcaecati maxime magni vel. Commodi ea nostrum ab delectus dignissimos reprehenderit!</small>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
