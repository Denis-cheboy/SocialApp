import React from 'react'
import {FaBarcode, FaBars, FaCamera, FaCog, FaHome, FaPlay, FaUser} from "react-icons/fa"
import {Container,Typography} from "@mui/material"
import {styled} from "@mui/material/styles"

const StyledDiv=styled("div")(({theme})=>({
    display:"flex",
    alignItems:"center",
    marginBottom:theme.spacing(4),
    [theme.breakpoints.up("sm")]:{
       marginBottom:theme.spacing(3),
       cursor:"pointer"
    }
}))

const StyledTypography=styled(Typography)(({theme})=>({
    fontWeight:"500px",
    [theme.breakpoints.down("sm")]:{
        display:"none"
    }
}))


const StyledContainer=styled(Container)(({theme})=>({
    position:"sticky",
    top:0,
    height:"100vh",
    color:"white",
    paddingTop:theme.spacing(10),
    backgroundColor:theme.palette.primary.main,
    [theme.breakpoints.up("sm")]:{
        backgroundColor:"white",
        color:"#555",
        border:"1px solid #ece7e7"
    }

}))


function LeftBar() {
  return (
    <StyledContainer>
        <StyledDiv>
            <FaHome sx={{fontSize:{md:"18px"}}} style={{marginRight:"10px"}}/>
            <StyledTypography>Homepage</StyledTypography>
        </StyledDiv>
        <StyledDiv>
            <FaUser sx={{fontSize:{md:"18px"}}} style={{marginRight:"10px"}}/>
            <StyledTypography>User</StyledTypography>
        </StyledDiv>
        <StyledDiv>
            <FaCamera sx={{fontSize:{md:"18px"}}} style={{marginRight:"10px"}}/>
            <StyledTypography>Camera</StyledTypography>
        </StyledDiv>
        <StyledDiv>
            <FaPlay sx={{fontSize:{md:"18px"}}} style={{marginRight:"10px"}}/>
           
            <StyledTypography>Play</StyledTypography>
        </StyledDiv>
        <StyledDiv>
        <FaBars sx={{fontSize:{md:"18px"}}} style={{marginRight:"10px"}}/>
            
            <StyledTypography>Menu</StyledTypography>
        </StyledDiv>
        <StyledDiv>
        <FaCog style={{marginRight:"10px",fontSize:"18px"}}/>
            
            <StyledTypography>Settings</StyledTypography>
        </StyledDiv>
    </StyledContainer>
  )
}

export default LeftBar