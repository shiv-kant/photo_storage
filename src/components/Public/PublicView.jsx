import React, { useEffect, useState } from 'react';
import { storage } from '../../firebase/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { useParams } from 'react-router-dom';

function PublicView() {
    const { userId, imageId } = useParams();
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const imageRef = ref(storage, `images/${userId}/${imageId}`);
        getDownloadURL(imageRef).then((url) => {
            setImageUrl(url);
        }).catch((error) => {
            console.error("Error fetching image: ", error);
        });
    }, [userId, imageId]);

    return (
        <div className='flex items-center justify-center h-screen'>
            {imageUrl ? (
                <img src={imageUrl} alt='Shared' className='max-w-full max-h-full' />
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
}

export default PublicView;
