import React from 'react'
import Contact from './Contact'
const ContactList = ({data, currentPage, getAllContacts}) => {
  return (
    <div className='main'>
        {data?.content?.length === 0 && <div>No contacts. Please add a new contact.</div>}

        <ul className='contact__list'>
            {data?.content?.length > 0 && data.content.map(contact => <Contact contact={contact} key={contact.id}></Contact>)}
        </ul>

          {data?.content?.length > 0 && data?.totalPages && 
            <div className='pagination'>
                <a onClick={() => getAllContacts(currentPage - 1)} className={currentPage === 0 ? 'disabled':''}>
                    &laquo;
                </a>
                { data && [...Array(data.totalPages).keys()].map((page, index) => 
                <a onClick={getAllContacts(page)} className = {currentPage === page ? 'active':''} key={page}>
                    {page + 1}
                </a>)} 
                <a onClick={() => getAllContacts(currentPage + 1)} className={data?.totalPages === currentPage + 1 ? 'disabled' : ''}>
                    &laquo;
                </a>
            </div>
          }
    </div>
  )
}

export default ContactList