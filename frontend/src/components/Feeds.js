import React from 'react'
import { Container, Typography } from '@mui/material'
import {styled} from "@mui/material/styles"
import Post from './Post'


const StyledContainer=styled(Container)(({theme})=>({
  paddingTop:theme.spacing(10),
  height:"100%",
  overflowY:"scroll"
}))
function Feeds() {
  return (
    <StyledContainer>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
    </StyledContainer>
  
  )
}

export default Feeds