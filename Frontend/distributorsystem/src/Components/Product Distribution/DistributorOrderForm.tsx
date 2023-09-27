import { Typography, styled } from '@mui/material'
import React from 'react'

const TitleTypo = styled(Typography)({
  
  fontSize: 30,
  color: '#203949',
  fontFamily: 'Inter, sans-serif',
  fontWeight: "bolder"
})

export default function DistributorOrderForm(){
  return (
    <div>
      <TitleTypo>Product Distribution Form</TitleTypo>
    </div>
  )
}
