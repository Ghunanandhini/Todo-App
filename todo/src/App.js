import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { DialogActions, DialogContent } from '@mui/material';




function App() {

  const _date = new Date();

  const [value, setValues] = useState({
    title: '',
    description: '',
  });
  const [editValue, setEditValues] = useState({
    id: '',
    title: '',
    description: '',
  });


  const [arr, setArr] = useState([]);

  const [count, setCount] = useState(0);

  const [openDialog, setOpenDialog] = useState(false);



  const handleChange = (event) => {
    setValues({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditChange = (event) => {
     setEditValues({
      ...editValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleAdd = e => {
    e.preventDefault(); 

    if(value.title && value.description){
      let temp = [...arr];
    let obj = {
      id: count,
      title: value.title,
      description: value.description,
    };
    temp.push(obj);
    setCount(count + 1);
    setArr(temp);
    setValues({
      title: '',
      description: '',
    });
  }else {
    alert('Form is not valid');
  }
    
  };

  const compareFnc = (obj1, obj2) => {
    return obj2.id - obj1.id;
  };

  const handleDelete = (todo) => {
    let temp = [...arr];
    let index = temp.findIndex((_x) => _x.id === todo.id);
    temp.splice(index, 1);
    setArr(temp);
  };

  const handleView = (todo) => {
    setEditValues({...todo})
    setOpenDialog(true);

  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }
  const handleUpdate = e => {
    e.preventDefault();
    if(editValue.title && editValue.description){
      let temp = [...arr];
    let obj = {
      id: editValue.id,
      title:editValue.title,
      description: editValue.description,
    };
    let index = temp.findIndex(_x => _x.id === editValue.id)
    temp.splice(index, 1)
    temp.push(obj);
    setArr(temp);
    setOpenDialog(false);
    }else{
      alert('Form is not valid');
    }
 };

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Todo Application
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth='sm'>
        <Stack spacing={2}>
          <Card sx={{ minWidth: 275, marginTop: 10 }}>
            <form onSubmit={handleAdd}>
            <CardHeader title='Create a todo' subheader={`${_date}`} />
            <CardContent>
              <Stack spacing={2}>
                <TextField
                  label='Title'
                  id='title-id'
                  placeholder='Enter a title'
                  size='small'
                  fullWidth
                  autoFocus
                  name='title'
                  value={value.title}
                  onChange={handleChange}
                />

                <TextField
                  label='Description'
                  id='title-id'
                  placeholder='Enter a description'
                  size='small'
                  fullWidth
                  name='description'
                  value={value.description}
                  onChange={handleChange}
                />
              </Stack>
            </CardContent>
            <CardActions>
              <Button
                size='small'
                variant='contained'
                fullWidth
                type='submit'
              >
                Add
              </Button>
            </CardActions>
            </form>
          </Card>

          <Card>
            <CardContent>
              <List>
              {arr.length === 0 && <span>No todo</span>}
                {arr.sort(compareFnc).map((todo) => (
                  <ListItem
                    key={todo.id}
                    secondaryAction={
                      <>
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => handleDelete(todo)}
                      >
                        <DeleteIcon />
                      </IconButton> {' '}
                       <IconButton
                       edge='end'
                       aria-label='view'
                       onClick={() => handleView(todo)}
                     >
                       <RemoveRedEyeIcon />
                     </IconButton>
                     </>
                    }
                  >
                    <ListItemText
                      primary={todo.title}
                      secondary={todo.description}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Stack>
      </Container>
      <Dialog onClose={handleCloseDialog} open={openDialog} maxWidth='sm' fullWidth>
      <form onSubmit={handleUpdate}>
      <DialogTitle>Edit Todo</DialogTitle>
      <DialogContent>
      <Stack spacing={2}>
      <TextField
                  label='Title'
                  id='title-id'
                  placeholder='Enter a title'
                  size='small'
                  fullWidth
                  autoFocus
                  name='title'
                  value={editValue.title}
                  onChange={handleEditChange}
                />

                <TextField
                  multiline
                  label='Description'
                  id='title-id'
                  placeholder='Enter a description'
                  size='small'
                  fullWidth
                  name='description'
                  value={editValue.description}
                  onChange={handleEditChange}
                />
                </Stack>
          </DialogContent>
          <DialogActions>
          <Button
                size='small'
                variant='contained'
                fullWidth
                type="submit"
              >
                Update
              </Button>

          </DialogActions>
          </form>
      </Dialog>
    </div>
  );
}


export default App;