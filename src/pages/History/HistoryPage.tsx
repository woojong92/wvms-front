import LayoutComp from 'components/LayoutComp';
import React from 'react';
import styled from 'styled-components';

const ListBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
`

const ListTitleBox = styled.div`
    font-weight: 500;
    /* background-color: pink; */
    padding: 0.5rem 1rem;
    border-bottom: 1px solid lightgray;
`;

const ListItemBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #e5e5e5;
    padding: 0.5rem 1rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 8px;
`;

const TitleBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem 1rem;
    font-weight: bold;
`;

const HistoryBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: scroll;
`


function HistoryPage () {
    return (
        <LayoutComp>
            <HistoryBox>
            <TitleBox>나의 휴가 히스토리</TitleBox>
            <ListBox >
                <ListTitleBox>2021년</ListTitleBox>
                <div style={{marginTop: '0.5rem'}}>
                    <ListItemBox>
                            <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                <div style={{fontSize: '0.8rem', marginRight: '0.5rem'}}>2021.07.03 - 2021.07.05</div>
                                <div style={{fontSize: '0.8rem'}}>연차(4)</div>
                            </div>
                            <div style={{border: '0px solid red', padding: '0.1rem 0.5rem', borderRadius: 16, color: 'red', fontSize: '0.8rem'}}>승인 대기중</div>
                    </ListItemBox>
                    <ListItemBox>
                            <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                <div style={{fontSize: '0.8rem', marginRight: '0.5rem'}}>2021.07.03 - 2021.07.05</div>
                                <div style={{fontSize: '0.8rem'}}>연차(4)</div>
                            </div>
                            <div style={{border: '0px solid red', padding: '0.1rem 0.5rem', borderRadius: 16, color: 'green', fontSize: '0.8rem'}}>휴가 예정</div>
                    </ListItemBox>
                    <ListItemBox>
                            <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                <div style={{fontSize: '0.8rem', marginRight: '0.5rem'}}>2021.07.03 - 2021.07.05</div>
                                <div style={{fontSize: '0.8rem'}}>연차(4)</div>
                            </div>
                            <div style={{border: '0px solid red', padding: '0.1rem 0.5rem', borderRadius: 16, color: 'black', fontSize: '0.8rem'}}>휴가 완료</div>
                    </ListItemBox>
                </div>
            </ListBox>

            <ListBox >
                <ListTitleBox>2020년</ListTitleBox>
                <div style={{marginTop: '0.5rem'}}>
                    <ListItemBox>
                            <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                <div style={{fontSize: '0.8rem', marginRight: '0.5rem'}}>2021.07.03 - 2021.07.05</div>
                                <div style={{fontSize: '0.8rem'}}>연차(4)</div>
                            </div>
                            <div style={{border: '0px solid red', padding: '0.1rem 0.5rem', borderRadius: 16, color: 'red', fontSize: '0.8rem'}}>승인 대기중</div>
                    </ListItemBox>
                    <ListItemBox>
                            <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                <div style={{fontSize: '0.8rem', marginRight: '0.5rem'}}>2021.07.03 - 2021.07.05</div>
                                <div style={{fontSize: '0.8rem'}}>연차(4)</div>
                            </div>
                            <div style={{border: '0px solid red', padding: '0.1rem 0.5rem', borderRadius: 16, color: 'green', fontSize: '0.8rem'}}>휴가 예정</div>
                    </ListItemBox>
                    <ListItemBox>
                            <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                <div style={{fontSize: '0.8rem', marginRight: '0.5rem'}}>2021.07.03 - 2021.07.05</div>
                                <div style={{fontSize: '0.8rem'}}>연차(4)</div>
                            </div>
                            <div style={{border: '0px solid red', padding: '0.1rem 0.5rem', borderRadius: 16, color: 'black', fontSize: '0.8rem'}}>휴가 완료</div>
                    </ListItemBox>
                </div>
            </ListBox>
{/* 
            <ListBox >
                <ListTitleBox>2020년</ListTitleBox>
                <ListItemBox>
                        <div>5월 30일 - 6월 3일</div>
                        <div>연차(4)</div>
                </ListItemBox>
                <ListItemBox>
                        <div>5월 30일 - 6월 3일</div>
                        <div>연차(4)</div>
                </ListItemBox>
                <ListItemBox>
                        <div>5월 30일 - 6월 3일</div>
                        <div>연차(4)</div>
                </ListItemBox>
            </ListBox>

            <ListBox >
                <ListTitleBox>2020년</ListTitleBox>
                <ListItemBox>
                        <div>5월 30일 - 6월 3일</div>
                        <div>연차(4)</div>
                </ListItemBox>
                <ListItemBox>
                        <div>5월 30일 - 6월 3일</div>
                        <div>연차(4)</div>
                </ListItemBox>
                <ListItemBox>
                        <div>5월 30일 - 6월 3일</div>
                        <div>연차(4)</div>
                </ListItemBox>
            </ListBox>

            <ListBox >
                <ListTitleBox>2020년</ListTitleBox>
                <ListItemBox>
                        <div>5월 30일 - 6월 3일</div>
                        <div>연차(4)</div>
                </ListItemBox>
                <ListItemBox>
                        <div>5월 30일 - 6월 3일</div>
                        <div>연차(4)</div>
                </ListItemBox>
                <ListItemBox>
                        <div>5월 30일 - 6월 3일</div>
                        <div>연차(4)</div>
                </ListItemBox>
            </ListBox> */}
            </HistoryBox>
        </LayoutComp>
    )
}

export default HistoryPage;