import React from 'react'
import { Container,Avatar,Typography,AvatarGroup,ImageList,ImageListItem,Link } from '@mui/material'
import {styled} from "@mui/material/styles"


const StyledContainer=styled(Container)(({theme})=>({
  display:"flex",
  position:"sticky",
  top:0,
  paddingTop:theme.spacing(10),
  flexDirection:"column",
  justifyContent:"flex-start",
  alignItems:"left",
  margin:0
}))

function RightBar() {
  return (
    <StyledContainer>
      <Typography style={{fontSize:"16px",fontWeight:"500px",color:"#555"}} gutterBottom>My Coding Friends</Typography>
      <AvatarGroup max={4}>
        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg"   sx={{ width: 27, height: 27 }}/>
        <Avatar alt="Travis Howard" src="https://material-ui.com/static/images/avatar/2.jpg" sx={{ width: 27, height: 27 }}/>
        <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/3.jpg"sx={{ width: 27, height: 27 }} />
        <Avatar alt="Agnes Walker" src="https://material-ui.com/static/images/avatar/4.jpg"sx={{ width: 27, height: 27 }} />
        <Avatar alt="Trevor Henderson" src="https://material-ui.com/static/images/avatar/5.jpg"sx={{ width: 27, height: 27 }}/>
      </AvatarGroup>
      <Typography style={{fontSize:"16px",fontWeight:"500px",color:"#555",marginTop:"10px"}} >Friends Gallery</Typography>
      <ImageList  cols={3} rowHeight={100} style={{marginTop:"10px"}}>
        <ImageListItem>
          <img src="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format"/>
        </ImageListItem>
        <ImageListItem >
          <img src="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format"/>
        </ImageListItem>
        <ImageListItem >
          <img src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=164&h=164&fit=crop&auto=format"/>
        </ImageListItem>
        <ImageListItem >
          <img src="https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=164&h=164&fit=crop&auto=format"/>
        </ImageListItem>
        <ImageListItem >
          <img src="https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=164&h=164&fit=crop&auto=format"/>
        </ImageListItem>
        <ImageListItem >
          <img src="https://images.unsplash.com/photo-1597645587822-e99fa5d45d25?w=164&h=164&fit=crop&auto=format"/>
        </ImageListItem>
    </ImageList>
    <Typography style={{fontSize:"16px",fontWeight:"500px",color:"#555",marginTop:"10px",marginBottom:"10px"}} >Categories</Typography>
  
      <Link href="#" underline="none" variant="body2" style={{marginRight:"20px",color:"#555",fontSize:"16px",marginBottom:"4px"}}>
        Sports
      </Link>
      <Link href="#" underline="none" variant="body2" style={{marginRight:"20px",color:"#555",fontSize:"16px",marginBottom:"4px"}}>
        Food
      </Link>

      <Link href="#"underline="none" variant="body2" style={{marginRight:"20px",color:"#555",fontSize:"16px",marginBottom:"4px"}}>
        Business
      </Link>
      <Link href="#"underline="none" variant="body2" style={{marginRight:"20px",color:"#555",fontSize:"16px",marginBottom:"4px"}}>
        Trending
      </Link>
    
  
    </StyledContainer>
  )
}

export default RightBar