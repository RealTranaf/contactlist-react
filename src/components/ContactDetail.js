import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getContact } from '../api/ContactService';
import { toastSuccess, toastError } from '../api/ToastService';

function ContactDetail({updateContact, updateImage}) {
    const inputRef = useRef()
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: '',
        photoUrl: ''
    })
    
    const { id } = useParams();

    // console.log(id)

    const fetchContact = async (id) => {
        try{
            const {data} = await getContact(id)
            setContact(data)
            console.log(data)
        } catch(error) {
            toastError(error)
        }
    }

    const updatePhoto = async (file) => {
        try {
            const formData = new FormData()
            formData.append('file', file, file.name)
            formData.append('id', id)
            await updateImage(formData);
            // console.log(data)
            setContact((prev) => ({...prev, photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}`}))
            // fetchContact(id)
            toastSuccess('Photo updated!')
        } catch (error){
            toastError(error)
        }
    }

    const selectImage = () => {
        inputRef.current.click()
    }

    const handleChange = (event) => {
        setContact({...contact, [event.target.name]: event.target.value})
    }

    const onUpdateContact = async (event) => {
        event.preventDefault()
        await updateContact(contact)
        fetchContact(id)
        toastSuccess('Contact updated!')
    }

    useEffect(() => {
        fetchContact(id);
    }, [])

    // console.log(contact)
    return (
        <>
            <Link to={'/'} className='link'>
                <i className='bi bi-arrow-left'></i>
                Back to list
            </Link>
            <div className='profile'>
                <div className='profile__details'>
                    <img src={contact.photoUrl} alt={`Profile photo of ${contact.name}`}></img>
                    <div className='profile__metadata'>
                        <p className='profile__name'>{contact.name}</p>
                        <p className='profile__muted'>JPG, GIF or PNG. Max size of 100MB</p>
                        <button onClick={selectImage} className='btn'>
                            <i className='bi bi-cloud-upload'></i>
                            Change Photo
                        </button>
                    </div>
                </div>
                <div className='profile__settings'>
                    <form onSubmit={onUpdateContact} className="form">
                        <div className="user-details">
                            <input type="hidden" defaultValue={contact.id} name="id" required />
                            <div className="input-box">
                                <span className="details">Name</span>
                                <input type="text" value={contact.name} onChange={handleChange} name="name" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input type="text" value={contact.email} onChange={handleChange} name="email" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Phone</span>
                                <input type="text" value={contact.phone} onChange={handleChange} name="phone" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Address</span>
                                <input type="text" value={contact.address} onChange={handleChange} name="address" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Title</span>
                                <input type="text" value={contact.title} onChange={handleChange} name="title" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Status</span>
                                <input type="text" value={contact.status} onChange={handleChange} name="status" required />
                            </div>
                        </div>
                        <div className="form_footer">
                            <button type="submit" className="btn">Save</button>
                        </div>
                    </form>
                </div>
            </div>

            <form style={{display: 'none'}}>
                <input type='file' ref={inputRef} onChange={(event) => updatePhoto(event.target.files[0])} name='file' accept='image/*'></input>
            </form>
        </>
    )
}

export default ContactDetail