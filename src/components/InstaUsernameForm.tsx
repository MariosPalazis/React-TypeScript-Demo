import React from 'react';

interface InstaUsernameFormProps {
    setUsername: (value: string) => void
}

const InstaUsernameForm = (props: InstaUsernameFormProps) => {

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) =>{
        console.log(e.target.value);
        props.setUsername(e.target.value.toString())
    }

    return (
        <div className='form'>
            <input type="text" onChange={changeName}/>
        </div>
    );
};

export default InstaUsernameForm;