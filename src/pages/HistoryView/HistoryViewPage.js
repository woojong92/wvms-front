import {LayoutBox, MainComp, Header2, BottomTabBar} from 'components/LayoutComp';
import { useAppSelector } from 'hooks';
import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { TimeFormat_YmdHM } from 'utils/timeFormatter';
import { API_ADDRESS } from 'apis';

// import {LayoutBox} from ''

// interface IVacationCounts {
//     etcDate: number;
//     totalDate: number;
//     usedDate: number;
//     year: number;
//     _id: string;
// }

// const HeaderBox = styled.header`
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 3rem;
    
//     display: flex;
//     justify-content: center;
//     align-items: center;
// `;

function HistoryViewPage () {
    let { id } = useParams();
    const { token} = useAppSelector(state => state.app);
    // const profile: any  = useAppSelector(state => state.app.profile)
    // const [thiYear, setThisYear] = useState<number>(() => moment().get('year'))  
    // const [thisYearVacationCounts, setThisYearVacationCounts] = useState<IVacationCounts>({
    //     etcDate: 0,
    //     totalDate: 0,
    //     usedDate: 0,
    //     year: 0,
    //     _id: "id"
    // })


    useEffect(()=>{
        // // console.log(moment().get('year'))
        // console.log(profile)
        // const thisYearVacationCounts = profile.vacationCounts.filter((item : {year: number} ) => item.year === moment().get('year'));
        // setThisYearVacationCounts(thisYearVacationCounts[0]);
        // console.log(thisYearVacationCounts)
        getMyVacations(id);

    },[]);

    const [vacation, setVacation] = useState({});
    const getMyVacations = async (_id) => {
        try{
            const response = await axios({
                url: `${API_ADDRESS}/vacations?id=${_id}`,
                method: 'get',
            })
            console.log(response);
            setVacation(response.data[0]);
        }catch(e){
            console.log(e);
        }
    }
    const [successRemove, setSuccessRemove] = useState(false);

    const removeVacation = async (_id) => {
        try{
            const response = await axios({
                url: `${API_ADDRESS}/vacations/${_id}`,
                method: 'delete',
                headers: { Authorization: `Bearer ${token}` },
            })
            console.log(response);
            if(response.status === 204) {
                setSuccessRemove(true);
            }
            // setVacation(response.data[0]);
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getMyVacations(id);
    }, [id]);

    if(successRemove){
        return (
            <LayoutBox>
                <Header2/>
                <MainComp >
                    해당 휴가를 취소하였습니다.
                </MainComp>
                <BottomTabBar />
            </LayoutBox>
        )
    }
    
    return (
        <LayoutBox>
            <Header2 />
            <MainComp >
                {/* <div>{id}</div> */}
                <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e5e5e5'}}>
                    <div>휴가 유형</div>
                    <div>{vacation.vacationType}</div>
                </div>

                <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e5e5e5'}}>
                    <div>시간 유형</div>
                    <div>{vacation.timeType}</div>
                </div>

                <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e5e5e5'}}>
                    <div>휴가 시작</div>
                    <div>{TimeFormat_YmdHM(vacation.startDate)}</div>
                </div>

                <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e5e5e5'}}>
                    <div>휴가 종료</div>
                    <div>{TimeFormat_YmdHM(vacation.endDate)}</div>
                </div>

                <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e5e5e5'}}>
                    <div>사용한 휴가 일수</div>
                    <div>{vacation.usedDate}</div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent:'space-between', alignItems: 'flex-start', padding: '1rem', borderBottom: '1px solid #e5e5e5'}}>
                    <div style={{marginBottom: '0.5rem'}}>휴가 사유</div>
                    <div>{vacation?.reason || '휴가 사유가 없습니다. '}</div>
                </div>

                <div 
                    style={{background: 'white', color: '#F05A24', border: '1px solid #F05A24', padding: '0.5rem 4rem', margin: '2rem 1rem', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                    onClick={() => removeVacation(id)}
                >휴가 취소 하기</div>
            </MainComp>

            <BottomTabBar />
        </LayoutBox>
    )
}

export default HistoryViewPage;

