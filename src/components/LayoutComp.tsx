import React, { Children } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCalendar, faList , faPlus, faUser} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

interface IProps {
    children: JSX.Element | Array<JSX.Element>
}

const LayoutBox = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #e5e5e5;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: scroll;
`

function LayoutComp ({children}:IProps) {
    return (
        <LayoutBox >
            <header style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: 50,
                borderBottom: '2px solid #e5e5e5',
                // backgroundColor: 'red',

                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{width: 500, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',listStyle: 'none', paddingLeft: '1rem', paddingRight: '1rem'}}>
                    <Link to="/" ><div style={{color: '#47BDFE', fontSize: 20, fontWeight: 'bold'}}>WVMS</div></Link>
                </div>
            </header>

            <div style={{maxWidth: 500, width: '100%',display: 'flex', flexDirection: 'column', background: 'white', height: '100%', paddingTop: 50, paddingBottom: 58 }}>
                {
                    children
                }
            </div>

            <footer style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                height: 58,
                borderTop: '2px solid #e5e5e5',
                // backgroundColor: 'red',

                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center'
            }}>
                    <div style={{width: 500, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', listStyle: 'none', }}>
                        <Link to="/" > <FontAwesomeIcon icon={faHome} /></Link>
                        <Link to="/calendar" > <FontAwesomeIcon icon={faCalendar} /></Link>
                        <Link to="/Application" ><FontAwesomeIcon icon={faPlus} /></Link>
                        <Link to="/history" > <FontAwesomeIcon icon={faList} /></Link>
                        <Link to="/profile" > <FontAwesomeIcon icon={faUser} /></Link>
                    </div>
            </footer>
        </LayoutBox>
    )
}

export default LayoutComp;