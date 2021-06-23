import LayoutComp from 'components/LayoutComp';
import React, { useEffect, useState } from 'react';
import moment, { Moment as MomentTypes, months } from 'moment'
import styled from 'styled-components';

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

function CalendarPage () {
    const [date, setdate] = useState<moment.Moment>(() => moment());

    useEffect(()=>{
        console.log(moment());
        console.log(moment().startOf("month").week())
    })

    return (
        <LayoutComp>
            <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid black'}}>
                <div>{"<"}</div>
                <div>2021.06</div>
                <div>{">"}</div>
            </div>

            <div style={{borderBottom: '1px solid black', display: 'flex', flexDirection: 'column'}}>
                <div className="week" style={{display:'flex', justifyContent: 'space-around', background: 'yellowgreen'}}>
                {["일", "월", "화", "수", "목", "금", "토"].map(el => (
                     <span style={{width: 36, height: 36, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{el}</span>
                    // <Square> 
                    //     <Inner>
                    //         <span style={{width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink', borderRadius: 50}}>{el}</span>
                    //     </Inner>
                    // </Square>
                ))}
                </div>

                <div className="week" style={{display:'flex', justifyContent: 'space-between'}}>
                {["1", "2", "3", "4", "5", "6", "7"].map(el => (
                        <Square> 
                            <Inner>
                                <span style={{width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink', borderRadius: 50}}>{el}</span>
                                <div style={{width: 4, height: 4, background: 'red', position: 'absolute', bottom: 5, left: 18, borderRadius: 50}}/>
                            </Inner>
                        </Square>
                ))}
                </div>
                <div className="week" style={{display:'flex', justifyContent: 'space-between'}}>
                {["1", "2", "3", "4", "5", "6", "7"].map(el => (
                        <Square> 
                            <Inner>
                                <span style={{width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink', borderRadius: 50}}>{el}</span>
                                <div style={{width: 4, height: 4, background: 'red', position: 'absolute', bottom: 5, left: 18, borderRadius: 50}}/>
                            </Inner>
                        </Square>
                ))}
                </div>
                <div className="week" style={{display:'flex', justifyContent: 'space-between'}}>
                {["1", "2", "3", "4", "5", "6", "7"].map(el => (
                        <Square> 
                            <Inner>
                                <span style={{width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink', borderRadius: 50}}>{el}</span>
                                <div style={{width: 4, height: 4, background: 'red', position: 'absolute', bottom: 5, left: 18, borderRadius: 50}}/>
                            </Inner>
                        </Square>
                ))}
                </div>
                <div className="week" style={{display:'flex', justifyContent: 'space-between'}}>
                {["1", "2", "3", "4", "5", "6", "7"].map(el => (
                        <Square> 
                            <Inner>
                                <span style={{width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink', borderRadius: 50}}>{el}</span>
                                <div style={{width: 4, height: 4, background: 'red', position: 'absolute', bottom: 5, left: 18, borderRadius: 50}}/>
                            </Inner>
                        </Square>
                ))}
                </div>
                <div className="week" style={{display:'flex', justifyContent: 'space-between'}}>
                {["1", "2", "3", "4", "5", "6", "7"].map(el => (
                        <Square> 
                            <Inner>
                                <span style={{width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink', borderRadius: 50}}>{el}</span>
                                <div style={{width: 4, height: 4, background: 'red', position: 'absolute', bottom: 5, left: 18, borderRadius: 50}}/>
                            </Inner>
                        </Square>
                ))}
                </div>

            </div>

            <div style={{overflow: 'scroll'}}>
                <div className="ListItem" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '1rem'}}>
                        <div style={{display:'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <div style={{width: 50, height: 50, backgroundColor: 'skyblue', borderRadius: 20}}></div>
                            <div style={{marginLeft: '1rem'}}>
                                <div>우디</div>
                                <div>엔지니어</div>
                            </div>
                        </div>
                        <div>2021.07.03 - 2021.07.05</div>
                    </div>

                    <div className="ListItem" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '1rem'}}>
                        <div style={{display:'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <div style={{width: 50, height: 50, backgroundColor: 'skyblue', borderRadius: 20}}></div>
                            <div style={{marginLeft: '1rem'}}>
                                <div>우디</div>
                                <div>엔지니어</div>
                            </div>
                        </div>
                        <div>2021.07.03 - 2021.07.05</div>
                    </div>

                    <div className="ListItem" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '1rem'}}>
                        <div style={{display:'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <div style={{width: 50, height: 50, backgroundColor: 'skyblue', borderRadius: 20}}></div>
                            <div style={{marginLeft: '1rem'}}>
                                <div>우디</div>
                                <div>엔지니어</div>
                            </div>
                        </div>
                        <div>2021.07.03 - 2021.07.05</div>
                    </div>
            </div>
            
        </LayoutComp>
    )
}

export default CalendarPage;