import LayoutComp from 'components/LayoutComp';
import { useAppDispatch, useAppSelector } from 'hooks';
import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { TimeFormat_Ymd } from 'utils/timeFormatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faCog,  } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getProfile } from 'apis';
import { setProfile, setToken } from 'appSlice';

interface IVacationCounts {
    etcDate: number;
    totalDate: number;
    usedDate: number;
    year: number;
    _id: string;
}

function ProfilePage () {
    const dispatch = useAppDispatch();
    const {token}: any  = useAppSelector(state => state.app);
    const profile: any  = useAppSelector(state => state.app.profile)
    const [thiYear, setThisYear] = useState<number>(() => moment().get('year'))  
    const [thisYearVacationCounts, setThisYearVacationCounts] = useState<IVacationCounts>({
        etcDate: 0,
        totalDate: 0,
        usedDate: 0,
        year: 0,
        _id: "id"
    })

    const dispatchProfile = async (token: string) => {
        try{
            const response = await getProfile(token);
            if(response.status === 200 ){
                dispatch(setProfile(response.data));
              }
        }catch(e){
            console.log('getProfile Error: ', e)
        }
       

    }

    const handleLogout = () => {
        dispatch(setToken(null));
        dispatch(setProfile(null));
        localStorage.clear()
    }

    useEffect(()=>{  dispatchProfile(token);},[])

    useEffect(()=>{
        // console.log(moment().get('year'))
        console.log(profile)
        const thisYearVacationCounts = profile.vacationCounts.filter((item : {year: number} ) => item.year === moment().get('year'));
        setThisYearVacationCounts(thisYearVacationCounts[0]);
        console.log(thisYearVacationCounts)

    },[profile]);
    
    return (
        <LayoutComp>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  padding: '1rem', borderBottom: '1px solid #e5e5e5'}}>
                {/* <div style={{width: '4rem', height: '4rem', backgroundColor: 'skyblue', borderRadius: 20}}></div> */}
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={profile?.thumbnail} style={{width: '4rem', height: '4rem', backgroundColor: 'skyblue', borderRadius: 20, border: '1px solid #ddd'}} ></img>
                    <div style={{marginLeft: '1rem'}}>
                        <div style={{marginBottom: '0.5rem'}}>{profile?.nickname || ' '}</div>
                        <div>{profile?.role || ' '}</div>
                    </div>
                </div>

                <Link to='/setting'><FontAwesomeIcon icon={faCog} /></Link>
            </div>

            <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e5e5e5'}}>
                <div>이메일 </div>
                <div>{profile.email}</div>
            </div>

            <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e5e5e5'}}>
                <div>입사일 </div>
                <div>{TimeFormat_Ymd(profile.dateOfAntry)}</div>
            </div>

            <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e5e5e5'}}>
                <div>{`${thiYear} 연차일수`}</div>
                <div>{thisYearVacationCounts.totalDate}</div>
            </div>

            <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e5e5e5'}}>
                <div>사용 연차</div>
                <div>{thisYearVacationCounts.usedDate}</div>
            </div>

            <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e5e5e5'}}>
                <div>미사용 연차</div>
                <div>{thisYearVacationCounts.totalDate - thisYearVacationCounts.usedDate}</div>
            </div>

            <div 
            onClick={() => handleLogout()}
            style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e5e5e5', cursor: 'pointer'}}>
                <div>로그아웃</div>
                {/* <div>{thisYearVacationCounts.totalDate - thisYearVacationCounts.usedDate}</div> */}
            </div>

        </LayoutComp>
    )
}

export default ProfilePage;