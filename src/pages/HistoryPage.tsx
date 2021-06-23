import LayoutComp from 'components/LayoutComp';
import React from 'react';

function HistoryPage () {
    return (
        <LayoutComp>
            <div >
                <div style={{fontWeight: 700, padding: '1rem', borderBottom: '1px solid gray' }}> 2020</div>
                <div>
                    <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', padding: '1rem', borderBottom: '1px solid gray'}}>
                        <div>5월 30일 - 6월 3일</div>
                        <div>연차(4)</div>
                    </div>
                    <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', padding: '1rem', borderBottom: '1px solid gray'}}>
                        <div>4월 11일</div>
                        <div>반차(0.5)</div>
                    </div>
                </div>
                    
                <div style={{fontWeight: 700, padding: '1rem', borderBottom: '1px solid gray' }}> 2021</div>
                <div>
                    <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', padding: '1rem', borderBottom: '1px solid gray'}}>
                        <div>5월 30일 - 6월 3일</div>
                        <div>연차(4)</div>
                    </div>
                    <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', padding: '1rem', borderBottom: '1px solid gray'}}>
                        <div>5월 30일 - 6월 3일</div>
                        <div>연차(4)</div>
                    </div>
                </div>

            </div>
        </LayoutComp>
    )
}

export default HistoryPage;