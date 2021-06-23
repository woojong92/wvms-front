import LayoutComp from 'components/LayoutComp';
import React from 'react';

function ProfilePage () {
    return (
        <LayoutComp>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',  padding: '1rem', borderBottom: '1px solid #e5e5e5'}}>
                <div style={{width: '4rem', height: '4rem', backgroundColor: 'skyblue', borderRadius: 20}}></div>
                <div style={{marginLeft: '1rem'}}>
                    <div>우디</div>
                    <div>개발자</div>
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