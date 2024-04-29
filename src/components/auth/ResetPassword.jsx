import React from 'react'
import Container from '../Container'
import Title from '../form/Title'
import Input from '../form/Input'
import SubmitBtn from '../form/SubmitBtn'
import Footer from '../Footer'

export default function ResetPassword() {
  return (
    <div className='bg-[#1e1e1e] inset-0 fixed z-[-10] flex justify-center items-center'>
      <Container className="">
        <form className='bg-primary flex flex-col p-8 rounded-xl'>
          <Title>Password Reset</Title>
          <Input name='email' label='Email' placeholder='examplemail@gmail.com'/>
          <SubmitBtn value="Send OTP" path="/auth/confirm-password"/>
        </form>
      </Container>
      <Footer />
    </div>
  )
}
