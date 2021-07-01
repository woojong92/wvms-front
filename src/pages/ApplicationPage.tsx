import LayoutComp from 'components/LayoutComp';
import React, { useCallback, useEffect, useState } from 'react';
import moment, { Moment as MomentTypes, months } from 'moment'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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

function ApplicationPage () {
    // 처음 페이지가 로드 되었을 때
    // 오늘 날짜를 기준으로 전달, 이번달, 다음달을 배열로 가지고 있자?
    // const [calendars, setCalendars] = useState([]);


    const [date, setDate] = useState<moment.Moment>(() => moment());
    const [today, setToday] = useState<moment.Moment>(() => moment());
    const [selected, setSelected] = useState<moment.Moment | null>(null);

    const [startDate, setStartDate] = useState<moment.Moment | null>(null);
    const [endDate, setEndDate] = useState<moment.Moment | null>(null);

    // useEffect(() => {}, [selected])

    const jumpToMonth = (num: number) => {
        if(num) {
            console.log(date.clone().add(30, 'day'))
            setDate(date.clone().add(30, 'day'))
        }else{
            console.log(date.clone().add(30, 'day'))
            setDate(date.clone().subtract(30, 'day'))
        }
    }
    
    // (num ? setDate(date.clone().add(30, 'day')) : setDate(date.clone().subtract(30, 'day')));

    const handleDayClick = (current: moment.Moment) => {
        console.log(current)
        // setSelected(current);
        if(submitObject.vacationType === ''){
            window.alert('휴가 유형을 선택해주세요.')
        }else if(submitObject.timeType === ''){
            window.alert('시간 유형을 선택해주세요.')
        }else if(submitObject.timeType === '4h, 0.5일') {
            // if( startDate=== null){
                setStartDate(current);
                setEndDate(null);
            // }
            // else if(startDate.format('YYYYMMDD') === current.format('YYYYMMDD')){
            //     setStartDate(null);
            // }
        }else if(submitObject.timeType === '8h, 1일') {
            if(endDate) {
                setStartDate(current);
                setEndDate(null);
            }else{
                if(!startDate || startDate.isAfter(current) ) {
                    setStartDate(current);
                    setEndDate(null);
                } else{
                    setEndDate(current);
                }
               
            }
        }
    }

    const generate = () =>  {
        const startWeek = date.clone().startOf("month").week();
        const endWeek = date.clone().endOf("month").week() === 1 ? 53 :  date.clone().endOf("month").week();
        
        let calendar = [];

        console.log(date, startWeek, endWeek)

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
                        .add(n + i, 'day');
        
                      // 오늘이 current와 같다면 우선 '선택'으로 두자
                    //   let isSelected = selected.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'gary' : '';
                      
                      let _background = 'none'

                    //   if(today.format('YYYYMMDD') === current.format('YYYYMMDD')){
                    //     _background  = '#1B73E8'
                    //   }else 
                      
                      if(startDate?.format('YYYYMMDD') === current.format('YYYYMMDD')){
                        _background  = '#1B73E8'
                      }

                      if(startDate?.isBefore(current) && endDate?.isAfter(current) ){
                        _background  = '#D2E2FC'
                      }

                      if(endDate?.format('YYYYMMDD') === current.format('YYYYMMDD')){
                        _background  = '#1B73E8'
                      }

                      // 만약, 이번 달이 아닌 다른 달의 날짜라면 회색으로 표시하자
                      let isGrayed = current.format('MM') !== date.format('MM') ? '#e5e5e5' : '';

        
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
                                    background: _background,
                                    color: isGrayed
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

    const [submitObject, setSubmitObjet] = useState({
        vacationType: "",
        timeType: "",
        vacationReason: "",
        // startDate: "",
        // endDate: ""
    })

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

    return (
        <LayoutComp>
            <div style={{overflow: 'scroll'}}>

                <TitleBox>휴가 신청하기</TitleBox>
                <div style={{padding: '0.5rem 1rem', borderBottom: '2px solid #e5e5e5', display: 'flex', justifyContent: 'space-between'}}>
                    <div>휴가 유형</div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{padding: '0.1rem 0.5rem', background: submitObject.vacationType === '연차' ? '#1B73E8' : 'lightgray', borderRadius: '16px', marginRight: '0.5rem'}} onClick={() => handleSubmitObject({name: 'vacationType', value: '연차'})}>연차</div>
                        <div style={{padding: '0.1rem 0.5rem', background: submitObject.vacationType === '특별휴가' ? '#1B73E8' : 'lightgray', borderRadius: '16px', marginRight: '0.5rem'}} onClick={() => handleSubmitObject({name: 'vacationType', value: '특별휴가'})}>특별휴가</div>
                    </div>
                </div>
                <div style={{padding: '0.5rem 1rem', borderBottom: '2px solid #e5e5e5', display: 'flex', justifyContent: 'space-between'}}>
                    <div>시간 유형</div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{padding: '0.1rem 0.5rem', background: submitObject.timeType === '8h, 1일' ? '#1B73E8' : 'lightgray', borderRadius: '16px', marginRight: '0.5rem'}} onClick={() => handleSubmitObject({name: 'timeType', value: '8h, 1일'})}>8h, 1일</div>
                        <div style={{padding: '0.1rem 0.5rem', background: submitObject.timeType === '4h, 0.5일' ? '#1B73E8' : 'lightgray', borderRadius: '16px', marginRight: '0.5rem'}} onClick={() => handleSubmitObject({name: 'timeType', value: '4h, 0.5일'})}>4h, 0.5일</div>
                    </div>
                </div>
                <div style={{padding: '0.5rem 1rem', borderBottom: '2px solid #e5e5e5', display: 'flex', flexDirection: 'column'}}>
                    <div style={{marginBottom: '0.5rem'}}>휴가 사유</div>
                    {/* <div style={{display: 'flex', flexDirection: 'row', background: '#e5e5e5', height: '3rem', borderRadius: '8px'}}> */}
                        <input type="text" name="email" value={submitObject.vacationReason} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSubmitObject({name: 'vacationReason', value: e.target.value})} style={{outlineStyle: 'none', border: '0px solid gray', background: '#e5e5e5', height: '3rem', borderRadius: '8px', padding: '0.5rem'}} />
                    {/* </div> */}
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
                        <span style={{width: 36, height: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'darkgray'}}>{el}</span>
                    ))}
                    </div>
                    <div style={{position: 'relative'}}>{generate()}</div>
                </div>

                <div>
                    <div style={{margin: '1rem'}}>휴가 사용 후, 남는 연차 일은 11일 입니다.</div>


                    <div style={{background: '#1B73E8', color: 'white',  padding: '0.5rem', margin: '2rem 1rem', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>휴가 신청하기</div>
                </div>

            </div>  

            
            
        </LayoutComp>
    )
}

export default ApplicationPage;