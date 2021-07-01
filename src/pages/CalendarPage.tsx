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
    background-color: #eeeeee;
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

function CalendarPage () {
    // 처음 페이지가 로드 되었을 때
    // 오늘 날짜를 기준으로 전달, 이번달, 다음달을 배열로 가지고 있자?
    const [calendars, setCalendars] = useState([]);


    const [date, setDate] = useState<moment.Moment>(() => moment());
    const [today, setToday] = useState<moment.Moment>(() => moment());
    
    const [selected, setSelected] = useState<moment.Moment>(() => moment());

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
        setSelected(current);
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

                      if(today.format('YYYYMMDD') === current.format('YYYYMMDD')){
                        _background  = '#1B73E8'
                      }else if(selected.format('YYYYMMDD') === current.format('YYYYMMDD')){
                        _background  = '#D2E2FC'
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

    return (
        <LayoutComp>
            <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', padding: '1rem'}}>
                <div onClick={() => jumpToMonth(0) }>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                
                <div>{date.format('YYYY. MM')}</div>
                <div onClick={() => jumpToMonth(1)} >
                <FontAwesomeIcon icon={faChevronRight} />    
                </div>
            </div>

            <div style={{borderBottom: '2px solid #e5e5e5', display: 'flex', flexDirection: 'column'}}>
                <div className="week" style={{display:'flex', justifyContent: 'space-around'}}>
                {["일", "월", "화", "수", "목", "금", "토"].map(el => (
                     <span style={{width: 36, height: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'darkgray'}}>{el}</span>
                ))}
                </div>
            {
                generate()
            }
            </div>


            <div style={{overflow: 'scroll', paddingTop: '0.5rem'}}>
                {/* <div className="ListItem" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '1rem'}}>
                    <div style={{display:'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <div style={{width: 50, height: 50, backgroundColor: 'skyblue', borderRadius: 20}}></div>
                        <div style={{marginLeft: '1rem'}}>
                            <div>우디</div>
                            <div>엔지니어</div>
                        </div>
                    </div>
                    <div>2021.07.03 - 2021.07.05</div>
                </div> */}
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


            </div>
            
        </LayoutComp>
    )
}

export default CalendarPage;