import React from 'react';
import '../css/pages/Landing.css';
import {Link} from 'react-router-dom';
import projectsList from '../modules/projects';


interface LandingProps {
    Greeting?: string 
}

type projectsValues = {
    project: string,
    path: string
}

const Landing = (props: LandingProps) => {
    return (
            <section className='introSection'>
                <h1>Hello {props.Greeting}</h1>
                <div className='explanationText'>
                    Those are react projects made by <Link to='mariospalazis' className='/nameLink'>Marios Palazis</Link>.
                </div>
                <div className='explanationText'>
                    Below is the list of all available projects!
                </div>
                <ul className='projectList'>
                    {
                        projectsList?.map((value: projectsValues, key: any)=>(
                            <li key={key}><Link to={value.path} className='projectLink'>{value.project}</Link></li>
                        ))
                    }
                </ul>
            </section>
    );
};

export default Landing;