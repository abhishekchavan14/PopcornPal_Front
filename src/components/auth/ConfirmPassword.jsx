import React from 'react'
import Container from '../Container'
import Title from '../form/Title'
import Input from '../form/Input'
import SubmitBtn from '../form/SubmitBtn'
import BottomLink from '../form/BottomLink'
import Footer from '../Footer'

export default function ConfirmPassword() {
  return (
    <div className='bg-[#1e1e1e] inset-0 fixed z-[-10] flex justify-center items-center'>
      <Container className="">
        <form className='bg-primary flex flex-col p-8 rounded-xl'>
          <Title>Password Reset</Title>
          <Input name='newPassword' label='New Password' placeholder='8-20 characters long'/>
          <Input name='confirmPassword' label='Confirm Password' placeholder='Enter above password'/>
          <SubmitBtn value="Proceed" path="/auth/log-in"/>
        </form>
      </Container>
      <Footer />
    </div>
  )
}
