import React from 'react';
import LayoutComp from 'components/LayoutComp';

function LoginPage () {
    return (
        <LayoutComp>
           <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
               <div className="LoginForm" style={{padding: '1rem',}}>
                    <div className="title" style={{display:'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 36}}>
                        <span style={{fontSize: 24}}>로그인</span>
                    </div>

                    <form style={{display: 'flex', flexDirection: 'column',  width: 300}}>
                        <div style={{display: 'flex', flexDirection: 'column', marginBottom: 24}}>
                            <label style={{marginBottom: 5}}>이메일 주소</label>
                            <input type="text" name="email" style={{outlineStyle: 'none', border: '1px solid gray', borderRadius: 4, height: 36 }} />
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', marginBottom: 24}}>
                        <label style={{marginBottom: 5}}>비밀번호</label>
                            <input type="text" name="email" style={{outlineStyle: 'none', border: '1px solid gray', borderRadius: 4, height: 36 }} />
                        </div>

                      
                        <div style={{backgroundColor: '#46BDFE', marginTop: 10, display: 'flex', justifyContent:'center', alignItems: 'center', height: 36, borderRadius: 4 }}>
                            <span style={{textAlign: 'center', color:'white'}}>로그인</span>
                        </div>
                        
                    </form>
               </div>
           </div>
        </LayoutComp>
    )
}

export default LoginPage;