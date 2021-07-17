import React, { useState } from 'react';
import LayoutComp from 'components/LayoutComp';
import Button from 'components/common/Button';
import styled from 'styled-components';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {  setProfile, setToken } from 'appSlice';
// import styled from 'styled-components';

const LayoutBox = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #F3F5F6;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: scroll;
`

function LoginPage () {
    const [form, setForm] = useState({email: '', password: ''});
    // const [password, setPassword] = useState('');
    

    
    const {profile, token}= useAppSelector(state => state.app);
    const dispatch = useAppDispatch();
    const history = useHistory();

    useEffect(()=>{
        if(profile) history.push('/');
    },[profile])

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        console.log({name, value})
        setForm({
          ...form,
         [name]: value,
        })
    }

    const handleSubmit = async () => {
        try{
            const response = await axios({
                url: 'http://localhost:3011/api/auth/login',
                method: 'post',
                data: form,
            })
            console.log(response);
            console.log('logined')

            dispatch(setProfile(response.data.profile));
            dispatch(setToken(response.data.token));
        }catch(e){
            console.log(e)
        }
    }

    return (
        <LayoutBox>
           <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
               <div className="LoginForm" style={{padding: '2rem'}}>
                    <div className="title" style={{display:'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 36}}>
                        <span style={{fontSize: 40, fontWeight: 'bold', color: '#47BDFE'}}>WVMS</span>
                    </div>

                    <form style={{display: 'flex', flexDirection: 'column',  width: 300}}>
                        <div style={{display: 'flex', flexDirection: 'column', marginBottom: 24}}>
                            {/* <label style={{marginBottom: 5}}>이메일 주소</label> */}
                            <input type="text" name="email" value={form.email} onChange={onChange} style={{outlineStyle: 'none', border: '0.5px solid gray', borderRadius: 4, height: 36, padding: '0.3rem' }} placeholder={"Email"} />
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', marginBottom: 24}}>
                        {/* <label style={{marginBottom: 5}}>비밀번호</label> */}
                            <input type="text" name="password"  value={form.password} onChange={onChange} style={{outlineStyle: 'none', border: '0.5px solid gray', borderRadius: 4, height: 36, padding: '0.3rem' }} placeholder={"Password"} />
                        </div>

                        <Button title={"로그인"} onClick={ () => handleSubmit()} />
                    </form>
               </div>
           </div>
        </LayoutBox>
    )
}

export default LoginPage;