import React, { useEffect, useState } from 'react';
import { storage } from '../../firebase/firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useAuth } from '../../authContext/Context';
import { FiMoreVertical } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { doSignOut } from '../../firebase/auth'; // Import the signOut function

function Gallery() {
    const { currentUser } = useAuth();
    const [image, setImage] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [viewCounts, setViewCounts] = useState({});
    const navigate = useNavigate(); // Use navigate to redirect after logout

    useEffect(() => {
        if (!currentUser) return;

        const userImagesRef = ref(storage, `images/${currentUser.uid}/`);
        listAll(userImagesRef).then((res) => {
            const promises = res.items.map((item) => getDownloadURL(item));
            Promise.all(promises).then((urls) => {
                setImageList(urls);

                const storedViewCounts = JSON.parse(localStorage.getItem('viewCounts')) || {};
                const initialViewCounts = {};
                urls.forEach((url) => {
                    initialViewCounts[url] = storedViewCounts[url] || 0;
                });
                setViewCounts(initialViewCounts);
            });
        });
    }, [currentUser]);

    const handleImageUpload = () => {
        if (!currentUser) return;
        if (image == null) {
            alert('Please select an image');
            return;
        }
        const imageRef = ref(storage, `images/${currentUser.uid}/${image.name + v4()}`);
        uploadBytes(imageRef, image).then((snap) => {
            getDownloadURL(snap.ref).then((url) => {
                setImageList((prev) => [...prev, url]);
                setViewCounts((prevCounts) => ({
                    ...prevCounts,
                    [url]: 0
                }));

                localStorage.setItem('viewCounts', JSON.stringify(viewCounts));
            });

            alert('Image uploaded successfully');
        });
    };

    const handleCopyLink = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard');
            // Increment view count when link is copied
            setViewCounts((prevCounts) => ({
                ...prevCounts,
                [url]: prevCounts[url] + 1
            }));

            // Save updated view counts to localStorage
            localStorage.setItem('viewCounts', JSON.stringify({
                ...viewCounts,
                [url]: viewCounts[url] + 1
            }));
        }).catch((err) => {
            alert('Failed to copy the link');
        });
    };

    const handleLogout = () => {
        doSignOut().then(() => {
            localStorage.removeItem('viewCounts'); // Optionally clear viewCounts from localStorage
            navigate('/login', { replace: true }); // Redirect to login page without allowing back navigation
        });
    };

    return (
        <div className='pt-10 px-6'>
            <div className='mb-6 flex justify-between items-center'>
                <div>
                    <label
                        onClick={handleImageUpload}
                        htmlFor='upload-input'
                        className='px-4 py-2 bg-gray-600 text-white rounded-md cursor-pointer'>
                        Upload Image
                    </label>
                    {" "}
                    <input
                        className='rounded-md px-4 py-2 cursor-pointer'
                        type='file'
                        accept='image/*'
                        onChange={(e) => { setImage(e.target.files[0]) }}
                    />
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className='px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer'>
                    Logout
                </button>
            </div>

            <div
                className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                style={{ gridAutoRows: 'minmax(100px, auto)' }}
            >
                {imageList.map((url, index) => (
                    <div key={index} className='relative group bg-gray-200'>
                        <img
                            src={url}
                            alt='gallery'
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                            }}
                        />
                        <div
                            className='absolute top-2 right-2 p-2 bg-black rounded-full shadow-lg cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity'
                            onClick={() => handleCopyLink(url)}
                        >
                            <FiMoreVertical />
                        </div>

                        <div className="absolute bottom-2 right-2 p-2 bg-gray-800 rounded-lg shadow-lg">
                            Views: {viewCounts[url]}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Gallery;
