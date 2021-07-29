import LayoutComp from 'components/LayoutComp';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import ReactModal from 'react-modal';
import axios from 'axios';
import { useEffect } from 'react';
import { useAppSelector } from 'hooks';
import { Link } from 'react-router-dom'; 
import { timeFormat } from 'd3-time-format';
import moment from 'moment';
import { API_ADDRESS } from 'apis';

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
    // const [showModal, setShowModal] = useState<boolean>(false);
    const profile: any  = useAppSelector(state => state.app.profile)
    const [myVacations, setMyVacations] = useState([]);

    const timeFormatter = timeFormat('%Y/%m/%d');

    const getMyVacations = async () => {
        try{
            const response = await axios({
                url: `${API_ADDRESS}/vacations?memberId=${profile._id}`,
                method: 'get',
            })
            console.log( response);
            // setMonthVacations(response.data);
            setMyVacations(response.data);
        }catch(e){
            console.log(e);
            // return e;
        }
    }
    useEffect(()=>{getMyVacations()},[])
    return (
        <LayoutComp>

            <HistoryBox>
            <TitleBox>나의 휴가 히스토리</TitleBox>
            <ListBox >
                {
                    myVacations.map((item : any) => {
                        const date = new Date();
                        const isAfter = moment(item.startDate).isAfter(date)
                        const isBefore = moment(item.endDate).isBefore(date)
                        return (
                            <Link key={item._id} to={{pathname: `/history/${item._id}`,}} >
                                <ListItemBox>
                                    <div style={{display:'flex', flexDirection: 'column',justifyContent:'flex-start', alignItems:'flex-start'}}>
                                        <div style={{fontSize: '0.8rem', lineHeight: '1rem',marginRight: '0.5rem'}}>{`${timeFormatter(new Date(item.startDate))} - ${timeFormatter(new Date(item.endDate))}`}</div>
                                        <div style={{fontSize: '0.8rem', lineHeight: '1rem'}}>{`${item.vacationType} / ${item.timeType} / ${item.usedDate}`}</div>
                                        {/* <div style={{fontSize: '0.8rem', marginRight: '0.5rem'}}>{`종료일 : 2021/07/08`}</div> */}
                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                        {isBefore ?  <div style={{border: '1px solid #F05A24', padding: '0.1rem 0.5rem', borderRadius: 8, color: '#F05A24', fontSize: '0.8rem'}}>휴가 완료</div> : null }
                                        {isAfter ?  <div style={{border: '1px solid #35AE55', padding: '0.1rem 0.5rem', borderRadius: 8, color: '#35AE55', fontSize: '0.8rem'}}>휴가 예정</div> : null }
                                        { !isAfter && !isBefore ?  <div style={{border: '1px solid #409FFE', padding: '0.1rem 0.5rem', borderRadius: 8, color: '#409FFE', fontSize: '0.8rem'}}>휴가 중🏄‍♂️</div> : null }

                                        {/* <FontAwesomeIcon icon={faEllipsisV} size={'xs'} color={'#555'} />   */}
                                    </div>
                                </ListItemBox>
                            </Link>
                        )
                    })
                }


            {/* <Link to={{pathname: `/history/${1}`,}} >
                <ListItemBox>
                        <div style={{display:'flex', flexDirection: 'column',justifyContent:'flex-start', alignItems:'flex-start'}}>
                            <div style={{fontSize: '0.8rem', lineHeight: '1rem',marginRight: '0.5rem'}}>{`2021/07/05 - 2021/07/08`}</div>
                            <div style={{fontSize: '0.8rem', lineHeight: '1rem'}}>연차 / 하루종일 / 4</div>

                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{border: '1px solid red', padding: '0.1rem 0.5rem', borderRadius: 16, color: 'red', fontSize: '0.8rem', marginRight: '1rem'}}>승인 대기</div>
                            <FontAwesomeIcon icon={faEllipsisV} size={'xs'} color={'#555'} />  
                        </div>
                </ListItemBox>
            </Link>

                    <ListItemBox>
                            <div style={{display:'flex', flexDirection: 'column',justifyContent:'flex-start', alignItems:'flex-start'}}>
                                <div style={{fontSize: '0.8rem', lineHeight: '1rem',marginRight: '0.5rem'}}>{`2021/07/05 - 2021/07/08`}</div>
                                <div style={{fontSize: '0.8rem', lineHeight: '1rem'}}>연차 / 하루종일 / 4</div>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <div style={{border: '1px solid #35AE55', padding: '0.1rem 0.5rem', borderRadius: 16, color: '#35AE55', fontSize: '0.8rem', marginRight: '1rem'}}>휴가 예정</div>
                                <div>
                                    <FontAwesomeIcon icon={faEllipsisV} size={'xs'} color={'#555'} />  
                                </div>
                                
                            </div>
                    </ListItemBox>

                    <ListItemBox>
                            <div style={{display:'flex', flexDirection: 'column',justifyContent:'flex-start', alignItems:'flex-start'}}>
                                <div style={{fontSize: '0.8rem', lineHeight: '1rem',marginRight: '0.5rem'}}>{`2021/07/05 - 2021/07/08`}</div>
                                <div style={{fontSize: '0.8rem', lineHeight: '1rem'}}>연차 / 하루종일 / 4</div>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <div style={{border: '1px solid #409FFE', padding: '0.1rem 0.5rem', borderRadius: 16, color: '#409FFE', fontSize: '0.8rem', marginRight: '1rem'}}>휴가 완료</div>
                                <FontAwesomeIcon icon={faEllipsisV} size={'xs'} color={'#555'} />  
                            </div>
                    </ListItemBox> */}
            </ListBox>

           
            </HistoryBox>
        </LayoutComp>
    )
}

export default HistoryPage;