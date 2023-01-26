import React , {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import InstaUsernameForm from '../components/InstaUsernameForm';
import '../css/pages/InstaFriends.css'
import bringData from '../hooks/bringData';


interface InstaFriendsProps {
    title?: string 
}
interface ResponseData {
    
}
const InstaFriends = (props: InstaFriendsProps) => {
    const [username, setUsername] = useState<string>("");
    const [response, setResponse] = useState<ResponseData>();

    const buttonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(username !== ""){
            const resp = bringData({username: username});
            console.log(resp);
        }
      };

    return (
        <section className='introSection'>
            <h1>{props.title}</h1>
            <div className='explanationText'>
                <Link to='/' className='/nameLink'>Go back to Landing </Link>
            </div>
            <div className='explanationText'>
                Insert your Instagram Username to the input below. And then Click the Analyze Button!
            </div>
            <InstaUsernameForm setUsername={setUsername} />
            <button className='analyzeButton' onClick={buttonHandler}>Analyze</button>
        </section>
    );
};

export default InstaFriends;