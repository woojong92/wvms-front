import LayoutComp from 'components/LayoutComp';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'hooks';
import axios from 'axios';
import moment from 'moment';
import { timeFormat } from 'd3-time-format';
import { TimeFormat_Ymd } from 'utils/timeFormatter';
import { API_ADDRESS } from 'apis';

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
    padding: 0.5rem 1rem;
`;

const ListItemBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: ${props => props.theme.colors.gray};
    /* background-color: rgb(13, 17, 22); */
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
    const history = useHistory();
    // const {user} = useAppSelector(state => state.app)
    const timeFormatter = timeFormat('%Y/%m/%d');

    const [commingVacations, setCommingVacations] = useState<any[]>([]);
    const [todayVacations, setTodayVacations]   = useState<any[]>([]);

    const getTodayVacations = async () => {
        // const localTime = moment().format('YYYY-MM-DD'); // store localTime
        // const proposedDate = localTime + "T00:00:00.000Z";
        
        const localTime = moment().format('YYYY-MM-DD'); // store localTime
        const proposedStartDate = localTime + "T00:00:00.000Z"; 
        const proposedEndDate = localTime + "T23:59:59.000Z";

        try{
            const response = await axios({
                url: `${API_ADDRESS}/vacations?from=${proposedStartDate}&to=${proposedEndDate}`,
                method: 'get',
            })
            console.log(response);
            setTodayVacations(response.data);
        }catch(e){
            console.log(e);
        }
    }

    const getCommingVacations = async () => {
        const startDate = moment().add(1, 'days').format('YYYY-MM-DD'); // store localTime
        const proposedStartDate = startDate + "T00:00:00.000Z";
        const endDate = moment().add(14, 'days').format('YYYY-MM-DD');
        const proposedEndDate = endDate + "T23:59:59.000Z";

        try{
            const response = await axios({
                url: `${API_ADDRESS}/vacations?from=${proposedStartDate}&to=${proposedEndDate}`,
                method: 'get',
            })
            console.log('getCommingVacations', response);
            setCommingVacations(response.data.slice(1));
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        getTodayVacations();
        getCommingVacations();
    },[])

    return (
        <LayoutComp>
            <HomeBox>
                <ListBox>
                    <ListTitleBox><span>나를 찾지 마세요 🏖</span></ListTitleBox>
                    {
                        todayVacations.length ? (
                            todayVacations?.map(item => {
                                return (
                                    <ListItemBox key={item._id}>
                                        <div className="left">
                                            {/* <div style={{width: '38px', height: '38px', backgroundColor: 'skyblue', borderRadius: 16}}/> */}
                                            <img src={`${item?.member?.thumbnail}`} style={{width: '38px', height: '38px', backgroundColor: 'skyblue', borderRadius: 16}}/>
                                            <div className="left-name-box">
                                                <div className="name">{`${item?.member?.nickname || ''} (${item?.member?.name || ''})`}</div>
                                                <div className="position">{item?.member?.role || ''}</div>
                                            </div>
                                        </div>
                                        
                                        <div className="right">
                                        <div className="right-date">{`${TimeFormat_Ymd(new Date(item.startDate))} - ${TimeFormat_Ymd(new Date(item.endDate))}`}</div> 
                                        <div className="right-type">{`${item.vacationType} / ${item.timeType} / ${item.usedDate}`}</div>
                                        </div>
                                    </ListItemBox>
                                )
                            })
                        ) : (
                            null
                        )
                    }
                </ListBox>

                <ListBox>
                    <ListTitleBox>다음 휴가는 접니다 🚴‍♂️ </ListTitleBox>
                    {
                        commingVacations?.map(item => {
                            return (
                                <ListItemBox key={item._id}>
                                    <div className="left">
                                        {/* <div style={{width: '38px', height: '38px', backgroundColor: 'skyblue', borderRadius: 16}}/> */}
                                        <img src={`${item?.member?.thumbnail}`} style={{width: '38px', height: '38px', backgroundColor: 'skyblue', borderRadius: 16, border: '1px solid #ddd'}}/>
                                        <div className="left-name-box">
                                            <div className="name">{`${item?.member?.nickname || ''} (${item?.member?.name || ''})`}</div>
                                            <div className="position">{item?.member?.role || ''}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="right">
                                    <div className="right-date">{`${TimeFormat_Ymd(new Date(item.startDate))} - ${TimeFormat_Ymd(new Date(item.endDate))}`}</div> 
                                    <div className="right-type">{`${item.vacationType} / ${item.timeType} / ${item.usedDate}`}</div>
                                    </div>
                                </ListItemBox>
                            )
                        })
                    }
                </ListBox>
            </HomeBox>
        </LayoutComp>
    )
}

export default HomePage;