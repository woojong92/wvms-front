import {LayoutBox, MainComp, Header2} from 'components/LayoutComp';
import { useAppSelector } from 'hooks';
import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
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
    // const profile: any  = useAppSelector(state => state.app.profile)
    // const [thiYear, setThisYear] = useState<number>(() => moment().get('year'))  
    // const [thisYearVacationCounts, setThisYearVacationCounts] = useState<IVacationCounts>({
    //     etcDate: 0,
    //     totalDate: 0,
    //     usedDate: 0,
    //     year: 0,
    //     _id: "id"
    // })

    // useEffect(()=>{
    //     // console.log(moment().get('year'))
    //     console.log(profile)
    //     const thisYearVacationCounts = profile.vacationCounts.filter((item : {year: number} ) => item.year === moment().get('year'));
    //     setThisYearVacationCounts(thisYearVacationCounts[0]);
    //     console.log(thisYearVacationCounts)
        
    // },[]);

    const getMyVacations = async (id) => {
        try{
            const response = await axios({
                url: `http://localhost:3011/api/vacations?id=${id}`,
                method: 'get',
            })
            console.log( response);
            // setMonthVacations(response.data);
            // setMyVacations(response.data);
        }catch(e){
            console.log(e);
            // return e;
        }
    }

    useEffect(() => {
        getMyVacations(id);
    }, [id]);
    
    return (
        <LayoutBox>
            <Header2 />
            <MainComp >
                <div>{id}</div>
            </MainComp>
        </LayoutBox>
    )
}

export default HistoryViewPage;

