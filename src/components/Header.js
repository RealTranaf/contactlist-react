import React from 'react'

function Header({ toggleModal, numOfContact }){
    return(
        <header className='header'>
            <div className='container'>
                <h3>
                    Contact List ({numOfContact})
                </h3>
                <button onClick={() => toggleModal(true)} className='btn'>
                    <i className='bi bi-plus-square'></i>
                    Add New Contact
                </button>
            </div>
        </header>
    )
}
export default Header;