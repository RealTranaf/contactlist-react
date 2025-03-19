import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useRef } from 'react';
import Header from './components/Header'
import { getContacts, saveContact, updateContact, updatePhoto } from './api/ContactService';
import ContactList from './components/ContactList';
import { Routes, Route, Navigate } from 'react-router-dom';
import ContactDetail from './components/ContactDetail';
import { toastError } from './api/ToastService';
import { ToastContainer } from 'react-toastify';


function App() {

  const modalRef = useRef()
  const fileRef = useRef()
  const [data, setData] = useState({})
  const [currentPage, setCurrentPage] = useState(0)
  const [modalValue, setModalValue] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    title: '',
    status: ''
  });
  const [file, setFile] = useState(undefined)

  const getAllContacts = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const { data } = await getContacts(page, size);
      setData(data);
      // console.log(data);
    } catch (error) {
      // console.log(error)
      toastError(error)
    }
  }

  const toggleModal = show => {
    show ? modalRef.current.showModal() : modalRef.current.close();
  }

  const handleChange = (event) => {
    setModalValue({ ...modalValue, [event.target.name]: event.target.value })
  }

  const handleNewContact = async (event) => {
    event.preventDefault();
    try {
      const response = await saveContact(modalValue)
      // console.log(response)
      const formData = new FormData()
      formData.append('file', file, file.name)
      formData.append('id', response.data.id)
      response.data.photoUrl = await updatePhoto(formData)
      console.log(response.data.photoUrl)
      toggleModal(false)
      setFile(undefined)
      fileRef.current.value = null
      setModalValue({
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: ''
      })
      getAllContacts()
    } catch (error) {
      toastError(error)
    }
  }

  const updateContact = async (contact) => {
    try{
      const { data } = await saveContact(contact)
    } catch(error) {
      toastError(error)
    }
  }
  const updateImage = async (formData) => {
    try {
      const {data: photoUrl} = await updatePhoto(formData)
    } catch(error){
      toastError(error)
    }
  }
  useEffect(() => {
    getAllContacts();
  }, [])

  return (
    <>
      <Header toggleModal={toggleModal} numOfContact={data.totalElements}></Header>
      <main className='main'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Navigate to={'/contacts'}></Navigate>}></Route>
            <Route path="/contacts" element={<ContactList data={data} currentPage={currentPage} getAllContacts={getAllContacts}></ContactList>}></Route>
            <Route path='/contacts/:id' element={<ContactDetail updateContact={updateContact} updateImage={updateImage}></ContactDetail>}></Route>
          </Routes>
        </div>
      </main>

      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Contact</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewContact}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input value={modalValue.name} onChange={handleChange} type="text" name='name' required />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input value={modalValue.email} onChange={handleChange} type="text" name='email' required />
              </div>
              <div className="input-box">
                <span className="details">Title</span>
                <input value={modalValue.title} onChange={handleChange} type="text" name='title' required />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input value={modalValue.phone} onChange={handleChange} type="text" name='phone' required />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input value={modalValue.address} onChange={handleChange} type="text" name='address' required />
              </div>
              <div className="input-box">
                <span className="details">Account Status</span>
                <input value={modalValue.status} onChange={handleChange} type="text" name='status' required />
              </div>
              <div className="file-input">
                <span className="details">Profile Photo</span>
                <input type="file" onChange={(event) => setFile(event.target.files[0])} ref={fileRef} name='photo' required />
              </div>
            </div>
            <div className="form_footer">
              <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
              <button type='submit' className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
