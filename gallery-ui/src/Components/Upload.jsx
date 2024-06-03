import React, { useState, useEffect } from 'react';
import './Styles/upload.css';
import { Nav } from './Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Upload = ({ setIsUploadPage, isUploadPage }) => {
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('digitalArt');
    const twitterUsername = localStorage.getItem('twitterUsername');
    const discordId = localStorage.getItem('discordId');
    const accessToken = localStorage.getItem('access_token');
    const navigate = useNavigate();

    useEffect(() => {
        setIsUploadPage(true);
    }, []);

    const handleMediaChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedMedia({
                url: URL.createObjectURL(file),
                type: file.type
            });
            setSelectedFile(file)
        }
    };
    

    const handleUpload = async () => {
        try {
            if (selectedMedia) {
                const formData = new FormData();
                formData.append('media', selectedFile);
                formData.append('description', description);
                formData.append('category', selectedCategory);
                formData.append('twitterUsername', twitterUsername);
                formData.append('discordId', discordId);

                const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        
                    },
                });

                console.log(response.data); // Handle response from backend
                navigate('/');
            } else {
                console.log('No media selected.');
            }
        } catch (error) {
            console.error('Error uploading media:', error);
        }
    };

    return (
        <div className='upload-container'>
            <div className='nav-wrapper'>
                <Nav isUploadPage={isUploadPage} />
            </div>

            <div className='nav-body-warpper'>
                <div className='upload-box' onClick={() => document.getElementById('mediaInput').click()}>
                    <div className='flex'>
                        <div className='mr-4 upload-icon'><FontAwesomeIcon icon={faCloudArrowUp} /></div>
                        <div>
                            <h3>Select media to upload</h3>
                            <span className='grey-text'>images and videos</span>
                        </div>
                    </div>
                </div>
                <br />

                <div className='upload-box2'>
                    <div>
                        <h3>Description</h3>
                        <div className='caption-field'>
                            <input type="text" placeholder='Share more about your media here' value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    </div>

                    <br />
                    <div>
                        <h3>Media Preview</h3>
                        <div className='upload-media-display'>
                            {selectedMedia && (
                                <div>
                                    {selectedMedia.type.startsWith('image/') && (
                                        <img src={selectedMedia.url} alt="Selected Media" />
                                    )}
                                    {selectedMedia.type.startsWith('video/') && (
                                        <video src={selectedMedia.url}></video>
                                    )}
                                </div>
                            )}
                        </div>
                        <input type="file" id="mediaInput" onChange={handleMediaChange} style={{ display: 'none' }} accept="image/*,video/*" />
                    </div>


                    <br />

                    <div>
                        <h3>Category</h3>
                        <div className='mt-2 select-div'>
                            <select className='text-black category-select' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option value='digitalArt'>Digital Art</option>
                                <option value='painting'>Painting</option>
                                <option value='pencilArt'>Pencil Art</option>
                                <option value='meme'>Meme</option>
                            </select>
                        </div>
                    </div>

                    <br /> <br />

                    <hr />
                    <br /> <br />

                    <div className='flex post'>
                        <button className='bg-primary text-white' onClick={handleUpload}>Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
