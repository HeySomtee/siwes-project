import React, { useEffect, useState } from 'react'
import './Styles/PhotoScreen.css'
import axios from 'axios';
import imageItem from '../assets/13.png'
import imageItem2 from '../assets/14.png'

const PhotoScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const twitterUsername = localStorage.getItem('twitterUsername');
    const discordId = localStorage.getItem('discordId');
    const accessToken = localStorage.getItem('access_token');
    const [selectedCategory, setSelectedCategory] = useState('digitalArt');


    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0]);
        setImageUrl(url);
    };

    const handleUpload = async () => {
        try {
            if (selectedImage) {
                const formData = new FormData();
                formData.append('image', selectedImage);
                formData.append('twitterUsername', localStorage.getItem('twitterUsername'));
                formData.append('discordId', localStorage.getItem('discordId'));
                formData.append('category', selectedCategory)
    
                const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
    
                if (response.status === 201) {
                    console.log('Image uploaded successfully:', response.data.imageUrl);
                    setImageUrl(null);
                    setSelectedImage(null);
                } else {
                    console.error('Error uploading image:', response.statusText);
                    setImageUrl(null);
                    setSelectedImage(null);
                }
            } else {
                console.log('No image selected.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setImageUrl(null);
            setSelectedImage(null);
        }
    };
    
    

    return (
        <div className='img-container'>
            {/* REPOST LATEST LUCID BTC POST BEFORE THE CAN POST */}

            <div
                className='inner grid grid-cols-3 gap-4 p-3'
                style={{ display: selectedImage ? 'none' : 'grid' }}
            >
                <label htmlFor='upload' className='upload-image add-btn text-lg bg-primary'>
                    <span>+</span>
                    <input type='file' id='upload' accept='image/*' onChange={handleImageChange} style={{ display: 'none' }} />
                </label>

                <div className='img-card'>
                    <div className='display'>
                        <div className='top-cap bg-white'>200</div>
                        <img src={imageItem} alt="" />
                    </div>
                    <div className='img-card-footer text-white'>
                        <div className='p-2'>
                            <div className='w-100 text-lg img-id'>#50</div>
                        </div>

                        <div className='flex items-center justify-between px-6'>
                            <div className=''>
                                <div>discord: somtee#4791</div>
                                <div>twitter: @Somtee_ioj</div>
                            </div>

                            <div className=''>
                                <div>Digital Art</div>
                            </div>
                        </div>

                        <div className='action-btn'>
                            <div className='bg-primary'>Vote</div>
                            <div className='bg-white text-black'>Download</div>
                        </div>
                    </div>
                </div>
                <div className='img-card'>
                    <div className='display'>
                        <div className='top-cap bg-white'>200</div>
                        <img src={imageItem2} alt="" />
                    </div>
                    <div className='img-card-footer text-white'>
                        <div className='p-2'>
                            <div className='w-100 text-lg img-id'>#50</div>
                        </div>

                        <div className='flex items-center justify-between px-6'>
                            <div className=''>
                                <div>discord: somtee#4791</div>
                                <div>twitter: @Somtee_ioj</div>
                            </div>

                            <div>
                                <div>Pencil Drawing</div>
                            </div>
                        </div>

                        <div className='action-btn'>
                            <div className='bg-primary'>Vote</div>
                            <div className='bg-white text-black'>Download</div>
                        </div>
                    </div>
                </div>

                <div className='img-card'>
                    <div className='display'>
                        <div className='top-cap bg-white'>300</div>
                        <img src={imageItem2} alt="" />
                    </div>
                    <div className='img-card-footer text-white'>
                        <div className='p-2'>
                            <div className='w-100 text-lg img-id'>#124</div>
                        </div>

                        <div className='flex items-center justify-between px-6'>
                            <div className=''>
                                <div>discord: somtee#4791</div>
                                <div>twitter: @Somtee_ioj</div>
                            </div>

                            <div>
                                <div>Painting</div>
                            </div>
                        </div>

                        <div className='action-btn'>
                            <div className='bg-primary'>Vote</div>
                            <div className='bg-white text-black'>Download</div>
                        </div>
                    </div>
                </div>
                <div className='img-card'>
                    <div className='display'>
                        <div className='top-cap bg-white'>300</div>
                        <img src={imageItem} alt="" />
                    </div>
                    <div className='img-card-footer text-white'>
                        <div className='p-2'>
                            <div className='w-100 text-lg img-id'>#124</div>
                        </div>

                        <div className='flex items-center justify-between px-6'>
                            <div className=''>
                                <div>discord: somtee#4791</div>
                                <div>twitter: @Somtee_ioj</div>
                            </div>

                            <div>
                                <div>meme</div>
                            </div>
                        </div>

                        <div className='action-btn'>
                            <div className='bg-primary'>Vote</div>
                            <div className='bg-white text-black'>Download</div>
                        </div>
                    </div>
                </div>

                <div className='img-card'></div>
                <div className='img-card'></div>

            </div>

            <div
                className='upload-preview'
                style={{ display: selectedImage ? 'grid' : 'none' }}
            >
                {selectedImage && (
                    <div className='selected-image p-4'>
                        {/* <h2>Selected Image Preview:</h2> */}
                        <img className='py-6' src={imageUrl} alt='Preview' style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        
                        <div className='upload-tool-bar flex items-center text-white justify-between'>
                            <button className="button-29" role="button" onClick={handleUpload}>Upload</button>
                            <div>
                                <h1>Select Category: </h1>
                                <select className='text-black' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                    <option value='digitalArt'>Digital Art</option>
                                    <option value='painting'>Painting</option>
                                    <option value='pencilArt'>Pencil Art</option>
                                    <option value='meme'>Meme</option>
                                </select>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default PhotoScreen
