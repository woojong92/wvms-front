import LayoutComp from 'components/LayoutComp';
import { useAppSelector } from 'hooks';
import React from 'react';
import { useEffect } from 'react';

function ProfilePage () {

    const profile: any  = useAppSelector(state => state.app.profile)

    useEffect(()=>{console.log(profile)},[]);
    
    return (
        <LayoutComp>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',  padding: '1rem', borderBottom: '1px solid #e5e5e5'}}>
                <div style={{width: '4rem', height: '4rem', backgroundColor: 'skyblue', borderRadius: 20}}></div>
                <div style={{marginLeft: '1rem'}}>
                    <div>{profile?.nickname || ' '}</div>
                    <div>{profile?.role || ' '}</div>
                </div>
                <div></div>
            </div>

            <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e5e5e5'}}>
                <div>입사일 </div>
                <div>2020.09.11 </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', padding: '1rem'}}>
                <div>총 연차일수</div>
                <div>15</div>
            </div>

            <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', padding: '1rem'}}>
                <div>사용 연차</div>
                <div>2</div>
            </div>

            <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', padding: '1rem'}}>
                <div>미사용 연차</div>
                <div>13</div>
            </div>

        </LayoutComp>
    )
}

export default ProfilePage;