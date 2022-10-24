import { AppBar,  InputBase,  Toolbar, 
  Typography,alpha,Box, Badge ,IconButton
  ,Menu,MenuItem,Button, Tooltip,Settings,Logout,ListItemIcon,Avatar,Divider} from '@mui/material'
import {FaBell, FaEnvelope, FaSearch, FaUser, FaTimes,FaCog,FaUserPlus, FaSignOutAlt,} from "react-icons/fa"
import {styled } from "@mui/material/styles"
// import profile from "../profile.png"
import React, {useState} from 'react'

const Search=styled("div")(({theme})=>({
  display:"flex",
  alignItems:"center",
  justifyContent:"space-around",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  borderRadius:"5px",
  padding:"4px 10px",
  gap:"15px"
}))

const StyledTypography=styled(Typography)(({theme})=>({
  display:"none",
  [theme.breakpoints.up("sm")]:{
    display:"block"
  }

}))

const StyledTypography1=styled(Typography)(({theme})=>({
  display:"block",
  [theme.breakpoints.up("sm")]:{
    display:"none"
  },
 
}))

const StyledBox=styled(Box)({
  display:"flex",
  alignItems:"center",
  gap:"10px",
  marginRight:"10px"

})


function NavBar() {
  const [open,setOpen]=useState(false)
  const [openMenu,setOpenMenu]=useState(false)

  return (
    <AppBar position="fixed">
        <Toolbar style={{display:"flex", justifyContent:"space-between"}}>

          <StyledTypography>Deno Dev</StyledTypography>
          <StyledTypography1>Deno</StyledTypography1>
       

          {/* <Typography sx={{display:{xs:"none",md:"block"}}}>Deno Dev</Typography>
          <Typography sx={{display:{xs:"block",md:"none"}}}>Deno</Typography> */}

          <Search sx={open?{display:{md:"flex",xs:"flex",sm:"flex"}}:{display:{xs:"none",sm:"flex",md:"flex"}}}>

            <FaSearch/>
            <InputBase placeholder='Search...' style={{color:"inherit"}}/>
            <FaTimes color="inherit" onClick={()=>setOpen(false)}/>

          </Search>
          
   
          <StyledBox sx={open?{display:{md:"flex",xs:"none",sm:"flex"}}:{display:{xs:"flex",sm:"flex",md:"flex"}}} >
            <FaSearch onClick={()=>setOpen(true)} sx={open?{display:{xs:"none"}}:{display:{xs:"block",md:"none",sm:"none"}}}/>

            <IconButton>
               <Badge badgeContent={4} color="error">
                <FaEnvelope style={{color:"white",fontSize:"20px"}}/>
               </Badge>
            </IconButton>

            <IconButton>
               <Badge badgeContent={17} color="error">
                <FaBell style={{color:"white",fontSize:"20px"}}/>
               </Badge>
            </IconButton>
           <Tooltip title="account settings">
            <IconButton onClick={()=>setOpenMenu(!openMenu)}>
               <Badge>
                <FaUser style={{color:"white",fontSize:"20px"}}/>
               </Badge>
            </IconButton>
           </Tooltip>
          <Menu  open={openMenu} onClose={()=>setOpenMenu(false)} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} style={{marginTop:"60px"}}>
            <MenuItem style={{display:"flex",gap:"10px"}}>
              <Avatar   sx={{ width: 20, height: 20}}/> Profile
            </MenuItem>
            <MenuItem style={{display:"flex",gap:"10px"}}>
              <Avatar   sx={{ width: 20, height: 20}}/> My account
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <FaUserPlus  />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <FaCog   />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <FaSignOutAlt fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
      </Menu>

          </StyledBox>
        </Toolbar>
    </AppBar>
  )
}

export default NavBar