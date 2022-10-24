import React ,{useState} from 'react'
import { Box, Container,Alert, Fab, MenuItem, Modal, TextField, Tooltip,Snackbar, Typography,FormLabel,RadioGroup,FormControlLabel,Radio, Button } from '@mui/material'
import {styled} from "@mui/material/styles"
import Post from './Post'
import { FaCross, FaPlus, FaTimes } from 'react-icons/fa'

const StyledFab=styled(Fab)(({theme})=>({
    position:"fixed",
    bottom:20,
    right:20

}))
const StyledContainer=styled(Container)(({theme})=>({
    height:"570px",
    width:"500px",
    backgroundColor:"white",
    marginTop:"30px",
    position:"relative",
    [theme.breakpoints.down("sm")]:{
        height:"100vh",
        width:"100vw",
        margin:"0px"
    }
}))

function Add() {
  const [open,setOpen]=useState(false)
  const [openAlert,setOpenAlert]=useState(false)

   const handleClose = (event,reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  return (
    <>
     <Tooltip title="Add" aria-label="add" arrow>
        <StyledFab color="primary">
            <FaPlus onClick={()=>setOpen(true)} />
        </StyledFab>
     </Tooltip>
    <Modal open={open} style={{}}>
    <StyledContainer>
            <form autoComplete='off' style={{padding:"20px"}}>
                <div style={{marginBottom:"30px"}}>
                 <TextField id="standard-basic" label="Title" variant="standard" style={{width:"100%"}}/>
                </div>
                <div style={{marginBottom:"20px"}}>
                 <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    defaultValue="Write your story..." 
                    label="Description" 
                    variant="outlined" 
                    style={{width:"100%"}}
                  />
                </div>
                <div style={{marginBottom:"20px"}}>
                    <TextField select label="Visibility" value="Public">
                        <MenuItem value="Public">Public</MenuItem>
                        <MenuItem value="Private">Private</MenuItem>
                        <MenuItem value="None">None</MenuItem>
                    </TextField>
                </div>
                <div style={{marginBottom:"20px"}}>
                    <FormLabel id="demo-radio-buttons-group-label">Who can comment</FormLabel>
                    <RadioGroup>
                        <FormControlLabel value="Everybody" control={<Radio size="small"/>} label="Everybody" />
                        <FormControlLabel value="My Friends" control={<Radio size="small" />} label="My Friends" />
                        <FormControlLabel value="Nobody" control={<Radio size="small"/>} label="Nobody" />
                        <FormControlLabel value="Custom" disabled control={<Radio size="small"/>} label="Custom (Premium)" />
                    </RadioGroup>
                </div>
                <div style={{marginBottom:"20px"}}>
                    <Button variant="outlined" color="primary"style={{marginRight:"20px"}} onClick={()=>setOpenAlert(true)}>Create</Button>
                    <Button variant="outlined" color="secondary" onClick={()=>setOpen(false)}>Cancel</Button>
                </div>
            </form>
            <FaTimes onClick={()=>setOpen(false)} style={{position:"absolute",top:"5px",right:"5px",cursor:"pointer"}}/>
        </StyledContainer>
     </Modal>
     <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          succefully created a post!
        </Alert>
      </Snackbar>
    </>
  )
}

export default Add