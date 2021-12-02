import LayoutComp from 'components/LayoutComp';
import React, { useCallback, useEffect, useState } from 'react';
import moment, { Moment as MomentTypes, months } from 'moment'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from 'hooks';
import { unstable_batchedUpdates } from 'react-dom';
import { setProfile } from 'appSlice';
import { API_ADDRESS, getProfile } from 'apis';

const Square = styled.div`
    width: 50%;
    /* background-color: blue; */
    display: flex;
    justify-content: center;
    align-items: center;


   &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
    }
`;

const Inner = styled.div`
    position: absolute;
    /* background-color: skyblue; */
    /* border-radius: '50%'; */
`;

const ListItemBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: #D8DBEF;
    margin: 0.5rem;
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
        /* background-color: pink; */
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

const TitleBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem 1rem;
    font-weight: bold;
`;

interface IVacationCounts {
    etcDate: number;
    totalDate: number;
    usedDate: number;
    year: number;
    _id: string;
}

function ApplicationPage () {

    const { token } = useAppSelector(state => state.app);
    const profile: any  = useAppSelector(state => state.app.profile)
    const dispatch = useAppDispatch();

    const [thiYear, setThisYear] = useState<number>(() => moment().get('year'))  
    const [thisYearVacationCounts, setThisYearVacationCounts] = useState<IVacationCounts>({
        etcDate: 0,
        totalDate: 0,
        usedDate: 0,
        year: 0,
        _id: "id"
    })

    const dispachProfile = async (token: string) => {
        const response = await getProfile(token);
        if(response.status === 200 ){
          dispatch(setProfile(response.data));
        }
      }

    useEffect(()=>{
        // console.log(moment().get('year'))
        console.log(profile)
        const thisYearVacationCounts = profile.vacationCounts.filter((item : {year: number} ) => item.year === moment().get('year'));
        setThisYearVacationCounts(thisYearVacationCounts[0]);
        console.log(thisYearVacationCounts)
        dispachProfile(token);
    },[]);

    const [date, setDate] = useState<moment.Moment>(() => moment());
    const [startDate, setStartDate] = useState<moment.Moment | null>(null); // 휴가 신청 시작 날짜
    const [endDate, setEndDate] = useState<moment.Moment | null>(null); // 휴가 신청 끝나는 날짜
    const [submitObject, setSubmitObjet] = useState({
        vacationType: "연차",
        timeType: "하루종일",
        reason: "",
    })
    const [usedDate, setUsedDate] = useState<number>(0);

    const jumpToMonth = (num: number) => {
        if(num) {
            console.log(date.clone().add(30, 'day'))
            setDate(date.clone().add(30, 'day'))
        }else{
            console.log(date.clone().add(30, 'day'))
            setDate(date.clone().subtract(30, 'day'))
        }
    }

    const handleDayClick = (current: moment.Moment) => {
        if( !moment().subtract(1,'day').isSameOrBefore(current) ) {
            alert('휴가 신청을 할 수 없는 날짜 입니다.');
        }else if(submitObject.vacationType === ''){
            alert('휴가 유형을 선택해주세요.')
        }else if(submitObject.timeType === ''){
            alert('시간 유형을 선택해주세요.')
        }else if(submitObject.timeType === '오전반차' || submitObject.timeType === '오후반차' ) {
            console.log('aaaa', thisYearVacationCounts.totalDate - thisYearVacationCounts.usedDate - 0.5);
            if( submitObject.vacationType === '연차' && thisYearVacationCounts.totalDate - thisYearVacationCounts.usedDate - 0.5 < 0) {
                alert('죄송합니다. 남은 연차가 부족합니다.');
                return;
            }
            setStartDate(current);
            setEndDate(null);
            setUsedDate(0.5);
        } else if(submitObject.timeType === '하루종일') {
            if(endDate) {
                console.log('startDate', current)
                setStartDate(current);
                setEndDate(null);
                setUsedDate(1);
                console.log('_usedDate', 1)
            }else{
                if(!startDate || startDate.isAfter(current) ) {
                    console.log('startDate', current)
                    if( submitObject.vacationType === '연차' && thisYearVacationCounts.totalDate - thisYearVacationCounts.usedDate - 1 < 0) {
                        alert('죄송합니다. 남은 연차가 부족합니다.');
                        return;
                    }

                    setStartDate(current);
                    setEndDate(null);
                    setUsedDate(1);
                    console.log('_usedDate', 1)
                } else{
                    // let _endDate = moment(startDate).add(9, 'hours').format();
                    let _current = current;
                    let _usedDate = moment(_current.add(9,'hours')).diff(startDate, 'days') + 1;
                    if( submitObject.vacationType === '연차' && thisYearVacationCounts.totalDate - thisYearVacationCounts.usedDate - _usedDate < 0) {
                        alert('죄송합니다. 남은 연차가 부족합니다.');
                        return;
                    }
                    
                    console.log('_usedDate', _usedDate)
                    setEndDate(_current);
                    // setEndDate(current.add(9, 'hours'));
                    console.log('endDate', _current)
                    setUsedDate(_usedDate);
                    
                }
            }
        }
    }

    const generate = () =>  {
        const startWeek = date.clone().startOf("month").week();
        const endWeek = date.clone().endOf("month").week() === 1 ? 53 :  date.clone().endOf("month").week();
        
        let calendar = [];

        // console.log(date, startWeek, endWeek)

        for (let week = startWeek; week <= endWeek; week++ ){
            calendar.push(
                <div className="week" style={{display:'flex', justifyContent: 'space-between'}} key={week}>
                  {Array(7)
                    .fill(0)
                    .map((n, i) => {
                      // 오늘 => 주어진 주의 시작 => n + i일 만큼 더해서 각 주의 '일'을 표기한다.
                      let current = date
                        .clone()
                        .week(week)
                        .startOf('week')
                        .add(n + i, 'day')
                        .add(10,'hours');
        
                      // 오늘이 current와 같다면 우선 '선택'으로 두자
                    //   let isSelected = selected.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'gary' : '';
                      
                      let baColor = 'none'
                      let fontColor = current.format('MM') !== date.format('MM') ? '#e5e5e5' : 'black';
                      
                      if(startDate?.format('YYYYMMDD') === current.format('YYYYMMDD')){
                        baColor  = '#1B73E8';
                        fontColor = '#fff';
                      }

                      if(startDate?.isBefore(current) && endDate?.isAfter(current) ){
                        baColor  = '#D2E2FC'
                        fontColor = '#1B73E8';
                      }

                      if(endDate?.format('YYYYMMDD') === current.format('YYYYMMDD')){
                        baColor  = '#1B73E8';
                        fontColor = '#fff';
                      }

                      // 만약, 이번 달이 아닌 다른 달의 날짜라면 회색으로 표시하자
                    //   let isGrayed = current.format('MM') !== date.format('MM') ? '#e5e5e5' : '';

        
                      return (
                        <Square key={i} onClick={() => handleDayClick(current)}> 
                            <Inner>
                                <div style={{
                                    width: 40, 
                                    height: 40, 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center', 
                                    borderRadius: 50, 
                                    background: baColor,
                                    color: fontColor
                                }}>{current.format('D')}</div>
                                {/* <div style={{width: 4, height: 4, background: 'red', position: 'absolute', bottom: 5, left: 18, borderRadius: 50}}/> */}
                            </Inner>
                        </Square>
                      );
                    })}
                </div>,
              );
        }
        return calendar;
    };



    type HandleSubmitObjectProps = {
        name: string;
        value: string;
      };

    const handleSubmitObject = ({name, value}: HandleSubmitObjectProps) => {
        console.log({ ...submitObject, [name]: value})
        setSubmitObjet({ ...submitObject, [name]: value});
        if(name === 'timeType' && value !== submitObject.timeType){
            setStartDate(null);
            setEndDate(null);
        }
    }

    const handleSubmit = async () => {
        if(usedDate === 0) {
            alert('휴가를 신청할 날짜를 선택하세요.')
            return;
        }

        let data = { ...submitObject, 
            usedDate,
            startDate: moment(startDate).format(), 
            endDate: moment(endDate).format(), 
        };        

        if(submitObject.timeType === '하루종일') {
            if(endDate === null) {
                let _endDate = moment(startDate).add(9, 'hours').format();
                // let _usedDate = moment(_endDate).diff(startDate, 'days') + 1
                data = {
                    ...data,
                    endDate: _endDate,
                    // usedDate: _usedDate,
                }
            }else{
                // let _usedDate = moment(endDate).diff(startDate, 'days') + 1
                data = {
                    ...data,
                    // usedDate: _usedDate,
                }
            }


        }else if(submitObject.timeType === '오전반차') {
                let _endDate = moment(startDate).add(5, 'hours').format();
                // let _usedDate = 0.5;
                data = {
                    ...data,
                    endDate: _endDate,
                    // usedDate: _usedDate,
                }
        }else if(submitObject.timeType === '오후반차') {
                let _startDate = moment(startDate).add(5, 'hours').format();
                let _endDate = moment(startDate).add(9, 'hours').format();
                // let _usedDate = 0.5;
                data = {
                    ...data,
                    startDate: _startDate,
                    endDate: _endDate,
                    // usedDate: _usedDate,
                }
        }
        console.log('token', token);
        console.log('data', data)

        try{
            const response = await axios({
                url: `${API_ADDRESS}/vacations`,
                method: 'post',
                data: data,
                headers: { Authorization: `Bearer ${token}` },
            })
            if(response.status == 200 ){
                setScreenType('success');
            }
            console.log('response', response);
        }catch(e){
            console.log(e);
        }
    }

    const [screenType, setScreenType] = useState('prev'); // prev, apply, success, fail

    if(screenType === 'prev') {
        return (
            <LayoutComp>
                    <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection:'column'}}>
                        <img src="https://img.freepik.com/free-vector/beach-vacations_24908-53916.jpg?size=626&ext=jpg" style={{width: 250, height: 250, borderRadius: '50%'}} />
                        {/* <div>휴가 신청 하시겠습니까?</div> */}
                        {/* <button onClick={() => setApply(true)} >휴가 신청 </button> */}

                        <div 
                        style={{background: '#1B73E8', color: 'white',  padding: '0.5rem 4rem', margin: '2rem 1rem', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                        onClick={() => setScreenType('apply')}
                        >휴가 신청하러 가기</div>
                    </div>
            </LayoutComp>
        )
    }

    if(screenType === 'success') {
        return (
            <LayoutComp>
                    <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection:'column'}}>
                        휴가 신청이 완료되었습니다 :)
                        {/* <img src="https://img.freepik.com/free-vector/beach-vacations_24908-53916.jpg?size=626&ext=jpg" style={{width: 250, height: 250, borderRadius: '50%'}} /> */}
                        {/* <div>휴가 신청 하시겠습니까?</div> */}
                        {/* <button onClick={() => setApply(true)} >휴가 신청 </button> */}

                        {/* <div 
                        style={{background: '#1B73E8', color: 'white',  padding: '0.5rem 4rem', margin: '2rem 1rem', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                        onClick={() => setScreenType('apply')}
                        >휴가 신청하러 가기</div> */}
                    </div>
            </LayoutComp>
        )
    }

    return (
        <LayoutComp>
            {/* {
                screenType === 'prev' ? (
                    <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection:'column'}}>
                        <img src="https://img.freepik.com/free-vector/beach-vacations_24908-53916.jpg?size=626&ext=jpg" style={{width: 200, height: 200, borderRadius: '50%'}} />

                        <div 
                        style={{background: '#1B73E8', color: 'white',  padding: '0.5rem 2rem', margin: '2rem 1rem', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                        onClick={() => handleSubmit()}
                        >휴가 신청하러 가기</div>
                    </div>
                ) :  ( */}
                <div style={{overflow: 'scroll'}}>
                <TitleBox>휴가 신청하기</TitleBox>
                <div style={{padding: '0.5rem 1rem', borderBottom: '2px solid #e5e5e5', display: 'flex', justifyContent: 'space-between'}}>
                    <div>휴가 유형</div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{padding: '0.1rem 0.5rem', background: submitObject.vacationType === '연차' ? '#1B73E8' : '#e5e5e5', color: submitObject.vacationType === '연차' ? '#ffffff' : '#111111', borderRadius: '16px', marginRight: '0.5rem'}} onClick={() => handleSubmitObject({name: 'vacationType', value: '연차'})}>연차</div>
                        <div style={{padding: '0.1rem 0.5rem', background: submitObject.vacationType === '특별휴가' ? '#1B73E8' : '#e5e5e5', color: submitObject.vacationType === '특별휴가' ?  '#ffffff' : '#111111', borderRadius: '16px', marginRight: '0.5rem'}} onClick={() => handleSubmitObject({name: 'vacationType', value: '특별휴가'})}>특별휴가</div>
                    </div>
                </div>
                <div style={{padding: '0.5rem 1rem', borderBottom: '2px solid #e5e5e5', display: 'flex', justifyContent: 'space-between'}}>
                    <div>시간 유형</div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{padding: '0.1rem 0.5rem', background: submitObject.timeType === '하루종일' ? '#1B73E8' : '#e5e5e5', color: submitObject.timeType === '하루종일' ?  '#ffffff' : '#111111', borderRadius: '16px', marginRight: '0.5rem'}} onClick={() => handleSubmitObject({name: 'timeType', value: '하루종일'})}>하루종일</div>
                        <div style={{padding: '0.1rem 0.5rem', background: submitObject.timeType === '오전반차' ? '#1B73E8' : '#e5e5e5', color: submitObject.timeType === '오전반차' ?  '#ffffff' : '#111111',borderRadius: '16px', marginRight: '0.5rem'}} onClick={() => handleSubmitObject({name: 'timeType', value: '오전반차'})}>오전반차</div>
                        <div style={{padding: '0.1rem 0.5rem', background: submitObject.timeType === '오후반차' ? '#1B73E8' : '#e5e5e5', color: submitObject.timeType === '오후반차' ?  '#ffffff' : '#111111',borderRadius: '16px', marginRight: '0.5rem'}} onClick={() => handleSubmitObject({name: 'timeType', value: '오후반차'})}>오후반차</div>
                    </div>
                </div>
                <div style={{padding: '0.5rem 1rem', borderBottom: '2px solid #e5e5e5', display: 'flex', flexDirection: 'column'}}>
                    <div style={{marginBottom: '0.5rem'}}>휴가 사유</div>
                        <input type="text" name="email" value={submitObject.reason} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSubmitObject({name: 'reason', value: e.target.value})} style={{outlineStyle: 'none', border: '0px solid gray', background: '#e5e5e5', height: '3rem', borderRadius: '8px', padding: '0.5rem'}} />
                </div>
                <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', padding: '1rem'}}>
                    <div onClick={() => jumpToMonth(0) }>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    
                    <div>{date.format('YYYY. MM')}</div>
                    <div onClick={() => jumpToMonth(1)} >
                    <FontAwesomeIcon icon={faChevronRight} />    
                    </div>
                </div>

                <div style={{ borderBottom: '2px solid #e5e5e5', display: 'flex', flexDirection: 'column'}}>
                    <div className="week" style={{display:'flex', justifyContent: 'space-around'}}>
                    {["일", "월", "화", "수", "목", "금", "토"].map(el => (
                        <span key={el} style={{width: 36, height: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'darkgray'}}>{el}</span>
                    ))}
                    </div>
                    <div style={{position: 'relative'}}>{generate()}</div>
                </div>

                <div>
                    <div style={{margin: '1rem'}}>{`휴가 신청 후, 남은 연차 일수는 ${submitObject.vacationType === '연차' ? thisYearVacationCounts.totalDate - thisYearVacationCounts.usedDate - usedDate : thisYearVacationCounts.totalDate - thisYearVacationCounts.usedDate  }일 입니다.`}</div>
                    <div 
                        style={{background: '#1B73E8', color: 'white',  padding: '0.5rem', margin: '2rem 1rem', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                        onClick={() => handleSubmit()}
                    >휴가 신청하기</div>
                </div>
            </div> 
            {/* )
        } */}

        </LayoutComp>
    )
}

export default ApplicationPage;