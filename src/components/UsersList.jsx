import React from 'react';


const UsersList = ({ usersData, userToEdit, apiRequest, disForm }) => {

    const deleteUser = (user) => {
        apiRequest({ type: 'delete', id: user.id })
    }

    return (
        <div className='users-container'>
            <header className='users-bar'>
                <h2>Users</h2>
                {/*
                <div className='btn-sort'>
                    <button>
                        <i className='bx bx-sort-z-a bx-sm' ></i>
                    </button>
                </div>
                */}
            </header>
            <section className='users-wrapper'>
                {usersData.map(user => (
                    <article className='user-card' key={user.id}>
                        <h3>{user.first_name} {user.last_name}</h3>
                        <hr className='separator' />
                        <div className='user-info'>
                            <div className='info-cont'>
                                <p className='info-cat'>EMAIL</p>
                                <p className='info-atr'>{user.email}</p>
                            </div>
                            <div className="info-cont">
                                <p className='info-cat'>BIRTHDAY</p>
                                <p className='info-atr bday'>
                                    <span>
                                        <i className='bx bxs-cake'></i>
                                    </span>
                                    <span>
                                        {user.birthday.substr(8)}-{user.birthday.substr(5, 2)}-{user.birthday.substr(0, 4)}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className='card-btns'>
                            <button onClick={() => deleteUser(user)}>
                                <i className='bx bxs-trash bx-sm'></i>
                            </button>
                            <button onClick={() => {
                                userToEdit(user)
                                disForm(true)
                                }}>
                                <i className='bx bxs-edit bx-sm'></i>
                            </button>
                        </div>
                    </article>
                ))}
            </section>
            <button className='btn-add' onClick={() => disForm(true)}>
                        <i className='bx bx-plus bx-sm' ></i> ADD USER
            </button>
        </div>
    );
};

export default UsersList;