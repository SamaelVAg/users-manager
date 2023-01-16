import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'


const UsersForm = ({ editingUser, setEditingUser, apiRequest, showForm, disForm, showPopUp }) => {

    const { handleSubmit, register, reset } = useForm()

    const [showPass, setShowPass] = useState(false)

    const emptyUser = {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        birthday: ''
    }

    const uploadUser = (body) => {
        return { type: 'post', body: body }
    }

    const updateUser = (body) => {
        return { type: 'put', id:editingUser.id, body: body }
    }

    const submit = (data) => {
        if(editingUser){
            apiRequest(updateUser(data))
        }else{
            apiRequest(uploadUser(data))
            reset(emptyUser)
        }
        disForm(false)
        setShowPass(false)
        showPopUp()
    }

    const closeForm = () => {
        disForm(false)
        reset(emptyUser)
        setShowPass(false)
        setTimeout(() => {
            setEditingUser(null)
        }, 500);
    }

    useEffect(() => {
        if(editingUser){
            reset(editingUser)
        }else{
            reset(emptyUser)
        }
    }, [editingUser])
    
    return (
        <form onSubmit={handleSubmit(submit)} className={`users-form ${showForm ? 'show':''}`}>
            <header className='form-bar'>
                <h2>{editingUser ? 'Modify User':'CreateUser'}</h2>
                <span className='close-btn' onClick={() => closeForm()}>
                    <i className='bx bx-x bx-sm'></i>
                </span>
            </header>
            <main className='form-sect'>
                <section className='user-about'>
                    <h3>User About</h3>
                    <article className='about-art'>
                        <label htmlFor='user-fname'>First name</label>
                        <input type='text' id='user-fname' {...register('first_name')} />
                    </article>
                    <article className='about-art'>
                        <label htmlFor='user-lname'>Last name</label>
                        <input type='text' id='user-lname' {...register('last_name')} />
                    </article>
                    <article className='about-art'>
                        <label htmlFor='user-bday'>Birthday</label>
                        <input type='date' id='user-bday' {...register('birthday')} />
                    </article>
                </section>
                <section className='user-account'>
                    <h3>User Account</h3>
                    <article className='acc-art'>
                        <label htmlFor='user-email'>Email</label>
                        <input type='email' id='user-email' {...register('email')} />
                    </article>
                    <article className='acc-art'>
                        <label htmlFor='user-pass'>Password</label>
                        <div className="pass-inpt">
                            <input type={`${showPass ? 'text':'password'}`} id='user-pass' {...register('password')} />
                            <span onClick={() => setShowPass(!showPass)}>
                                <i className='bx bx-show bx-sm' ></i>
                            </span>
                        </div>
                    </article>
                </section>
                <button className='submit-btn'>SUBMIT</button>
            </main>
        </form>
    );
};

export default UsersForm;