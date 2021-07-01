import LayoutComp from 'components/LayoutComp';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: scroll;
`

const ListBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const ListTitleBox = styled.div`
    font-weight: bold;
    /* background-color: pink; */
    padding: 0.5rem 1rem;
`;

const ListItemBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: #e5e5e5;
    /* background-color: #0D1116; */
    /* border: 0.5px solid #30363D; */
    margin: 0 0.5rem 0.5rem 0.5rem;
    border-radius: 8px;

    .left {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .left-name-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 1rem;
        height: 36px;
    }

    .name {
        font-size: 1rem;
        font-weight: 600;

    }

    .position {
        font-size: 0.8rem;
        color: darkgray;
    }

    .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
    }

    .right-date {
        font-size: 0.8rem;
        color: black;
    }

    .right-type {
        font-size: 0.8rem;
        color: black;
    }

    

`;

function HomePage () {
    return (
        <LayoutComp>
            <HomeBox>
                <ListBox>
                    <ListTitleBox><span>휴가 중</span></ListTitleBox>
                    <ListItemBox>
                        <div className="left">
                            <div style={{width: '38px', height: '38px', backgroundColor: 'skyblue', borderRadius: 16}}/>
                            <div className="left-name-box">
                                <div className="name">Woody (김우종)</div>
                                <div className="position">엔지니어</div>
                            </div>
                        </div>
                        
                        <div className="right">
                           <div className="right-date">{`2021.07.03 - 2021.07.05`}</div> 
                           <div className="right-type">연차(3)</div>
                        </div>
                    </ListItemBox>
                </ListBox>

                <ListBox>
                    <ListTitleBox>다가오는 휴가</ListTitleBox>
                    <ListItemBox>
                        <div className="left">
                            <div style={{width: '38px', height: '38px', backgroundColor: 'skyblue', borderRadius: 16}}/>
                            <div className="left-name-box">
                                <div className="name">Woody (김우종)</div>
                                <div className="position">엔지니어</div>
                            </div>
                        </div>
                        
                        <div className="right">
                           <div className="right-date">{`2021.07.03 - 2021.07.05`}</div> 
                           <div className="right-type">연차(3)</div>
                        </div>
                    </ListItemBox>
                    <ListItemBox>
                        <div className="left">
                            <div style={{width: '38px', height: '38px', backgroundColor: 'skyblue', borderRadius: 16}}/>
                            <div className="left-name-box">
                                <div className="name">Woody (김우종)</div>
                                <div className="position">엔지니어</div>
                            </div>
                        </div>
                        
                        <div className="right">
                           <div className="right-date">{`2021.07.03 - 2021.07.05`}</div> 
                           <div className="right-type">연차(3)</div>
                        </div>
                    </ListItemBox>
                </ListBox>
            </HomeBox>
        </LayoutComp>
    )
}

export default HomePage;