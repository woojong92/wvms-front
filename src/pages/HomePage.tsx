import LayoutComp from 'components/LayoutComp';
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage () {
    return (
        <LayoutComp>
            <div className="List" style={{display: 'flex', flexDirection: 'column', width: '100%', overflow: 'scroll'}}>

                <div className="ListHeader" style={{padding: '1rem', fontWeight: 700}}>휴가 중</div>
                
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



                <div className="ListHeader" style={{padding: '1rem', fontWeight: 700, marginTop: '1rem'}}>다가오는 휴가</div>
                
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



                {/* <div style={{marginBottom: 100}} /> */}

            </div>
        </LayoutComp>
    )
}

export default HomePage;