import React, { Children } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCalendar, faList , faPlus, faUser, faBackspace, faBackward, faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import { useAppSelector } from 'hooks';


interface IProps {
    children: JSX.Element | Array<JSX.Element>
}

export const LayoutBox = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: ${(props) => props.theme.colors.default};

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: scroll;
`

function LayoutComp ({children}:IProps) {
    return (
        <LayoutBox >
            <Header />

            {/* <div style={{maxWidth: 500, width: '100%',display: 'flex', flexDirection: 'column', background: '#1E1E1E', height: '100%', paddingTop: 50, paddingBottom: 58 }}> */}
                <MainComp>{children}</MainComp>


            <BottomTabBar />
        </LayoutBox>
    )
}

const MainBox = styled.div`
    max-width: 500px;
    width:  100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-top: 50px;
    padding-bottom: 58px;
    background-color: ${(props) => props.theme.colors.background};
`
export const MainComp = ({children}:IProps) => {
    return (
        <MainBox>
            {children}
        </MainBox>
    )
}

const HeaderBox = styled.header`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 3rem;
    
    display: flex;
    justify-content: center;
    align-items: center;

    .header-content {
        width: 500px;
        height: 3rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        list-style: none;
        padding-left: 1rem;
        padding-right: 1rem;
        background-color: ${(props) => props.theme.colors.background};
        border-bottom: ${(props) => `2px solid ${props.theme.colors.underline}`};
    }
`
const Header = () => {
    return (
        <HeaderBox>
            <div className="header-content">
                <Link to="/" ><div style={{color: '#47BDFE', fontSize: 20, fontWeight: 'bold'}}>WVMS</div></Link>
                <div></div>
            </div>
        </HeaderBox>
    )
}

export const Header2 = () => {
    let history = useHistory();

    let back = ( e : React.MouseEvent<HTMLDivElement, MouseEvent> )  => {
        e.stopPropagation();
        history.goBack();
    };

    return (
        <HeaderBox>
            <div className="header-content">
                <div onClick={back}>
                    <FontAwesomeIcon icon={faChevronLeft} size={'sm'} color={'#555'} /> 
                </div>
               
                <div></div>
            </div>
        </HeaderBox>
    )
}

//<div style={{color: '#47BDFE', fontSize: 20, fontWeight: 'bold'}}>WVMS</div>

const BottomTabBarBox = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center; 
    align-items: center;

    .bottomTabBar-content {
        width: 500px;
        height: 58px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        list-style: none;
        background-color: ${(props) => props.theme.colors.background};
        border-top: ${(props) => `2px solid ${props.theme.colors.underline}`};
    }

`

export const BottomTabBar = () => {
    const {isDark} = useAppSelector((state) => state.theme);
    const iconColor = isDark ? 'white' : 'black';
    return (
        <BottomTabBarBox>
                <div className="bottomTabBar-content" >
                    <Link to="/" > <FontAwesomeIcon icon={faHome} color={iconColor}/></Link>
                    <Link to="/calendar" > <FontAwesomeIcon icon={faCalendar}color={iconColor} /></Link>
                    <Link to="/Application" ><FontAwesomeIcon icon={faPlus} color={iconColor}/></Link>
                    <Link to="/history" > <FontAwesomeIcon icon={faList} color={iconColor}/></Link>
                    <Link to="/profile" > <FontAwesomeIcon icon={faUser} color={iconColor}/></Link>
                </div>
        </BottomTabBarBox>
    )
}


export default LayoutComp;