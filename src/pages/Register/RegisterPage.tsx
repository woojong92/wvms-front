import React, { useState } from 'react';
import LayoutComp from 'components/LayoutComp';
import Button from 'components/common/Button';
import styled from 'styled-components';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import {  setProfile, setToken } from 'appSlice';
import moment from 'moment';
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

function RegisterPage () {
    const [form, setForm] = useState({email: '', password: '', name: '', nickname: '', role: '', dateOfAntry: '', totalDate: 15, usedDate: 0});
    // const [password, setPassword] = useState('');
    

    
    const {profile, token}= useAppSelector(state => state.app);
    const dispatch = useAppDispatch();
    const history = useHistory();

    useEffect(()=>{
        if(profile) history.push('/');
    },[profile])

    const onChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;

        console.log({name, value})
        setForm({
          ...form,
         [name]: value,
        })
    }

    const handleSubmit = async () => {
        console.log(form);
        const d = form.dateOfAntry.split('/')
        console.log(d);
        // console.log(new Date(Number(d[0]), Number(d[1])-1, Number(d[2]) ));
        const _dateOfAntry = new Date(Number(d[0]), Number(d[1])-1, Number(d[2]) );
        // const _vacationCounts  = [{
        //     year: new Date().getFullYear(),
        //     totalDate: 15, // 전체 연차 일 수
        //     usedDate: 0, // 사용한 연차 일 수
        //     etcDate: 0, 
        // }]

        const { email, password, name, nickname, role, dateOfAntry, totalDate, usedDate} = form;
        const data = {
            email,
            password,
            name, 
            nickname,
            role,
            dateOfAntry,
            vacationCounts: [{
                year: new Date().getFullYear(),
                totalDate,
                usedDate,
                etcDate: 0,
            }],
        }

        console.log(data);
        try{
            const response = await axios({
                url: 'http://localhost:3011/api/auth/register',
                method: 'post',
                data: data,
            })
            console.log(response);
            // if(response.status === 200) {
            //     setType('success');
            // }
            dispatch(setProfile(response.data.profile));
            dispatch(setToken(response.data.token));
        }catch(e){
            console.log('register Error : ', e.response)
        }
    }

    const [type, setType] = useState<string>('AccountInfo'); // AccountInfo, PersonalInfo, VacationInfo
    const handleNext = (next: string) => {
        setType(next);
        // console.log('setType')
    }

    const [isShowPassword, setShowPassword] = useState(false);

    return (
        <LayoutBox>
           <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
               <div className="LoginForm" style={{padding: '2rem'}}>


                    {type === 'AccountInfo' ? (
                        <form style={{display: 'flex', flexDirection: 'column',  width: 300}}>
                            <div style={{display: 'flex', flexDirection: 'column', marginBottom: 24}}>
                            <label style={{fontSize: '0.8rem', fontWeight: 'bold', marginBottom: 5}}>이메일</label>
                                <input type="text" name="email" value={form.email} onChange={onChange} style={{outlineStyle: 'none', border: '0.5px solid gray', borderRadius: 4, height: 36, padding: '0.3rem' }} placeholder={"ex) woody@biskitlab.com"} />
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', marginBottom: 32, position: 'relative'}}>
                                <label style={{fontSize: '0.8rem', fontWeight: 'bold', marginBottom: 5}}>비밀번호</label>
                                <input type={isShowPassword ? 'text' : 'password'} name="password"  value={form.password} onChange={onChange} style={{outlineStyle: 'none', border: '0.5px solid gray', borderRadius: 4, height: 36, padding: '0.3rem' }} placeholder={"비밀번호를 입력해 주세요."} />
                                <div style={{position: 'absolute', bottom: 10, right: 10}} onClick={() => setShowPassword((prev) => !prev)}>
                                    { isShowPassword ?  <FontAwesomeIcon icon={faEye} color={'black'}/> :  <FontAwesomeIcon icon={faEyeSlash} color={'black'}/>}
                                </div>
                            </div>

                           
                            <Button title={"다음"} onClick={ () => handleNext('PersonalInfo')} />
                        </form>
                    ) : null}

                    { type === 'PersonalInfo' ? (
                        <form style={{display: 'flex', flexDirection: 'column',  width: 300}}>
                            <div style={{display: 'flex', flexDirection: 'column', marginBottom: 18}}>
                            <label style={{fontSize: '0.8rem', fontWeight: 'bold', marginBottom: 5}}>이름</label>
                                <input type="text" name="name" value={form.name} onChange={onChange} style={{outlineStyle: 'none', border: '0.5px solid gray', borderRadius: 4, height: 36, padding: '0.3rem' }} placeholder={"본인 실명을 입력해 주세요."} />
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', marginBottom: 18}}>
                                <label style={{fontSize: '0.8rem', fontWeight: 'bold', marginBottom: 5}}>닉네임</label>
                                <input type="text" name="nickname"  value={form.nickname} onChange={onChange} style={{outlineStyle: 'none', border: '0.5px solid gray', borderRadius: 4, height: 36, padding: '0.3rem' }} placeholder={"회사에서 사용하는 닉네임을 입력해 주세요."} />
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', marginBottom: 18}}>
                                <label style={{fontSize: '0.8rem', fontWeight: 'bold', marginBottom: 5}}>직무</label>
                                {/* <input type="text" name="role"  value={form.role} onChange={onChange} style={{outlineStyle: 'none', border: '0.5px solid gray', borderRadius: 4, height: 36, padding: '0.3rem' }} placeholder={"비밀번호를 입력해 주세요."} /> */}

                                <select name="role" style={{outlineStyle: 'none', height: 36,padding: '0.3rem' ,border: '0.5px solid gray', borderRadius: 4, backgroundColor: 'white'}} onChange={onChange}>
                                    <option value="">직무선택</option>
                                    <option value="기획자">기획자</option>
                                    <option value="디자이너">디자이너</option>
                                    <option value="개발자">개발자</option>
                                </select>
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', marginBottom: 32}}>
                                <label style={{fontSize: '0.8rem', fontWeight: 'bold', marginBottom: 5}}>입사일</label>
                                <input type="text" name="dateOfAntry"  value={form.dateOfAntry} onChange={onChange} style={{outlineStyle: 'none', border: '0.5px solid gray', borderRadius: 4, height: 36, padding: '0.3rem' }} placeholder={"ex) 2021/07/21"} />
                            </div>

                            <Button title={"다음"} onClick={ () => handleNext('VacationInfo')} />
                            {/* <Button title={"가입하기"} onClick={ () => handleSubmit()} /> */}
                        </form>
                        ): null
                    }

                    { type === 'VacationInfo' ? (
                        <form style={{display: 'flex', flexDirection: 'column',  width: 300}}>
                            <div style={{display: 'flex', flexDirection: 'column', marginBottom: 18}}>
                            <label style={{fontSize: '0.8rem', fontWeight: 'bold', marginBottom: 5}}>{`${new Date().getFullYear()} 총 연차일수`}</label>
                                <input type="text" name="totalDate" value={form.totalDate} onChange={onChange} style={{outlineStyle: 'none', border: '0.5px solid gray', borderRadius: 4, height: 36, padding: '0.3rem' }} placeholder={"본인 실명을 입력해 주세요."} />
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', marginBottom: 18}}>
                                <label style={{fontSize: '0.8rem', fontWeight: 'bold', marginBottom: 5}}>현재 사용한 연차일수</label>
                                <input type="text" name="usedDate"  value={form.usedDate} onChange={onChange} style={{outlineStyle: 'none', border: '0.5px solid gray', borderRadius: 4, height: 36, padding: '0.3rem' }} placeholder={"회사에서 사용하는 닉네임을 입력해 주세요."} />
                            </div>

                            <Button title={"가입하기"} onClick={ () => handleSubmit()} />
                        </form>
                        ): null
                    }

               </div>
           </div>
           <div className="title" style={{position: 'absolute', top: 100, width: '100%',display:'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 36}}>
               <span style={{fontSize: 28, fontWeight: 'bold', color: '#47BDFE'}}>회원가입</span>
            </div>
           <div style={{position: 'absolute', left: 30, top: 10}}>
                 <Link to="/"><span style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#47BDFE'}}>WVMS</span></Link>
            </div>  
           <div style={{position: 'absolute', right: 30, top: 10}}>
                <Link to="/login"><a style={{fontSize: '0.8rem', color: '#409FFE', fontWeight: 'bold', borderBottom: '1px solid #409FFE'}}>로그인하러 가기</a></Link>
            </div>
        </LayoutBox>
    )
}

export default RegisterPage;