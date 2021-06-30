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
    padding: 0.5rem 1rem;
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