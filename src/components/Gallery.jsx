import React, { useEffect, useState } from 'react'
import { API } from '../global'
import { Link, useNavigate } from 'react-router-dom';
import editIcon from '../Assets/8666681_edit_icon.svg';
import deleteIcon from '../Assets/icons8-delete-24.png';

//Gallery component
function Gallery() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [enlargedImageUrl, setEnlargedImageUrl] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    //function to fetch photo collections
    async function fetchPhoto() {
        await fetch(`${API}/gallery/all-photos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                setData(data.photos)
                setLoading(false)
            })
            .catch((error) => console.error(error))
    }

    useEffect(() => { fetchPhoto() }, [])

    const spinner = () => {
        if (loading)
            return (
                <div className="spinner-border text-secondary m-4 text-center mx-auto" role="status">
                    <span className="visually-hidden">Loading...</span> </div>
            )
    }

    // Function to handle click event on image
    const enlargeImage = (imageUrl) => {
        setEnlargedImageUrl(imageUrl);
    };

    // Function to close enlarged image view
    const closeEnlargedImage = () => {
        setEnlargedImageUrl(null);
    };
    return (
        <div className='contanier m-5 p-4'>
            <h2 className='container text-center'>Gallery</h2>
            <h6 className='container text-center p-2 home-content'>This is a photo collection page, where you can explore, add, edit and delete operations with ease.</h6>
            <div className='text-center'><h5><Link to={'/add-photo'}>Add Photo</Link></h5></div>
            <p>{spinner()}</p>
            <div className='d-flex justify-content-around flex-wrap row-gap-3'>
                {data && data.map((photo, index) => (
                    <div key={index} className='card' style={{ width: "20rem" }}>
                        <h5 className='card-title text-center m-1'>{photo.title}</h5>
                        <div className='card-body'>
                            <img id='photo-enlarge' src={photo.photoUrl} alt='...' height={200} width={290}
                                onClick={() => enlargeImage(photo.photoUrl)} />
                            <p className='container'><b>Description:</b> {photo.photoDescription}</p>
                        </div>
                        <div className='card-body d-flex justify-content-center gap-3 cursor-pointer'>
                            <img src={editIcon} alt='Edit' height={20} title='Edit' onClick={()=> navigate(`/edit-photo/${photo._id}`)}/>
                            <img src={deleteIcon} alt='Delete' height={20} title='Delete'
                                onClick={async () => {
                                    await fetch(`${API}/gallery/delete-photo/${photo._id}`,
                                        {
                                            method: 'DELETE',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'x-auth-token': token
                                            }
                                        }).then(()=>{alert('Photo Deleted Successfully');fetchPhoto();})
                                        .catch((error) => console.error(error))
                                }
                                } />
                        </div>
                    </div>
                ))}
            </div>
            {/* Enlarged image view */}
            {enlargedImageUrl && (
                <div className="enlarged-image-view position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
                    <img src={enlargedImageUrl} alt="Enlarged" height={600} width={800} />
                    <button className="btn btn-secondary" onClick={closeEnlargedImage}>Close</button>
                </div>
            )}
        </div>
    )
}

export default Gallery