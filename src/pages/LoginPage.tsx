import React, { useState } from 'react';
import LayoutComp from 'components/LayoutComp';
import Button from 'components/common/Button';
// import styled from 'styled-components';

function LoginPage () {
    const [form, setForm] = useState({email: '', password: ''});
    // const [password, setPassword] = useState('');

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        console.log({name, value})
        setForm({
          ...form,
         [name]: value,
        })
    }

    const handleSubmit = () => {
        // fetch Login
        console.log('logined')
    }

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
                            <input type="text" name="email" value={form.email} onChange={onChange} style={{outlineStyle: 'none', border: '1px solid gray', borderRadius: 4, height: 36 }} />
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', marginBottom: 24}}>
                        <label style={{marginBottom: 5}}>비밀번호</label>
                            <input type="text" name="password"  value={form.password} onChange={onChange} style={{outlineStyle: 'none', border: '1px solid gray', borderRadius: 4, height: 36 }} />
                        </div>

                        <Button title={"로그인"} onClick={ () => console.log("hello")} />
                    </form>
               </div>
           </div>
        </LayoutComp>
    )
}

export default LoginPage;