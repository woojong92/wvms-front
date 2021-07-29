import React, { useState } from 'react';
import LayoutComp from 'components/LayoutComp';
import Button from 'components/common/Button';
import styled from 'styled-components';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {  setProfile, setToken } from 'appSlice';
import { API_ADDRESS } from 'apis';
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
                url: `${API_ADDRESS}/auth/login`,
                method: 'post',
                data: form,
            })
            console.log(response);
            console.log('logined')

            dispatch(setProfile(response.data.profile));
            dispatch(setToken(response.data.token));

            localStorage.setItem("access_token", response.data.token);
        }catch(e){
            console.log('Login Error : ', e.response)
            const {status} = e.response;
            if( status === 400 ){
                alert("잘못된 요청입니다.");
            }else if(status === 401) {
                alert("존재하지 않는 이메일이거나 비밀번호가 틀렸습니다.");
            }
        }
    }

    return (
        <LayoutBox>
           <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
               <div className="LoginForm" style={{padding: '2rem'}}>
                    {/* <div className="title" style={{display:'flex', flexDirection: 'column',  justifyContent: 'center', alignItems: 'center', marginBottom: 36}}>
                        <span style={{fontSize: 40, fontWeight: 'bold', color: '#47BDFE', }}>WVMS</span>  
                    </div> */}

                    {/* <div style={{display: 'flex', justifyContent: 'center'}}>
                        <span style={{fontSize: 28, fontWeight: 'bold',}}>로그인</span>   
                    </div> */}

                    <form style={{display: 'flex', flexDirection: 'column',  width: 300}}>
                        <div style={{display: 'flex', flexDirection: 'column', marginBottom: 24}}>
                        <label style={{fontSize: '0.8rem', fontWeight: 'bold', marginBottom: 5}}>이메일</label>
                            <input type="text" name="email" value={form.email} onChange={onChange} style={{outlineStyle: 'none', border: '0.5px solid gray', borderRadius: 4, height: 36, padding: '0.3rem' }} placeholder={"Email"} />
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', marginBottom: 32}}>
                            <label style={{fontSize: '0.8rem', fontWeight: 'bold', marginBottom: 5}}>비밀번호</label>
                            <input type="password" name="password"  value={form.password} onChange={onChange} style={{outlineStyle: 'none', border: '0.5px solid gray', borderRadius: 4, height: 36, padding: '0.3rem' }} placeholder={"Password"} />
                        </div>

                        <Button title={"로그인"} onClick={ () => handleSubmit()} />
                    </form>

                    <div style={{display: 'flex', justifyContent: 'center', marginTop: 32}}>
                        <span style={{fontSize: '0.8rem'}}>회원이 아니신가요? <Link to="/register"><a style={{color: '#409FFE', fontWeight: 'bold'}}>회원가입하기</a></Link></span>
                    </div>
               </div>
               <div className="title" style={{position: 'absolute', top: 100, width: '100%',display:'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 36}}>
                <span style={{fontSize: 40, fontWeight: 'bold', color: '#47BDFE'}}>WVMS</span>
            </div>
           </div>
        </LayoutBox>
    )
}

export default LoginPage;