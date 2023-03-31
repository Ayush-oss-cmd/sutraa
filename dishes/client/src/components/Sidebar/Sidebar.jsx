import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { styled, alpha } from '@mui/material/styles';
import { Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Select from 'react-select';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {useState, useEffect} from "react"
import axios from "axios"

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
const drawerWidth = 240;

const Sidebar = () => {

  const [dishes, setDishes] = useState([])
  const [show, setShow] = useState(false)
  const [showCreate, setCreateShow] = useState(false)
  const [newDish, setNewDish] = useState()
  const [newDishIngredients, setNewDishIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredients,setIngredients] = useState([{}])
  const [currentDish, setDish ] = useState({
    _id:'',
    dishName:'',
    ingredients:[]
  })

 const handleClick = (dish)=>{
  
  setCreateShow(false)
    setDish({...currentDish, dishName:dish.dishName, ingredients:dish.ingredients,_id:dish._id})
    setIngredients(dish.ingredients.map(ingredient=>({
      label: ingredient,
      value:ingredient
    })))
    console.log(currentDish,'currentDish')
    setShow(true)
   
  
  }
  const handleCreateClick = ()=>{
  
 
    setShow(false)
    setCreateShow(true)
   
  
  }
  const handleNewDishIngredientsUpdate = (selectedOptions) => {
      
     
      setIngredients(...ingredients, selectedOptions);
      setNewDishIngredients(selectedOptions);
      setSelectedIngredients(selectedOptions.map(option => option.value));
    
  
     
    
    
   
  };
  const handleNewDishIngredientsChange = (selectedOptions) => {
    
        setNewDishIngredients(selectedOptions);
        setSelectedIngredients(selectedOptions.map(option => option.value));
      };
  useEffect(() => {
      getData();
  },[])
 
 const getData = async() => {
   try{
    const data = await axios.get('http://localhost:8800/dish/find')
    const tempData = await data.data;
    console.log(data)
    setDishes(tempData)

   

   }
   catch(err){
    console.log(err)
   }
  }

  const updateDishHandler = async() => {
   
    const data = await axios.put(`http://localhost:8800/update/${currentDish._id}`,{
      dishName : currentDish.dishName,
      ingredients : selectedIngredients
      
    })
    getData();
  }
  const saveDishHandler = async() => {
  //  console.log(newDishIngredients)
    const data = await axios.post(`http://localhost:8800/createDish`,{
      dishName : newDish.dishName,
      ingredients : selectedIngredients
      
    })
    getData();
  }

  return (
    <div>
           <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Dishes
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{  }}>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
        <Divider />
        <Button onClick={()=>handleCreateClick()}>Create</Button>
 
       <div style={{display:"block"}}>
       {
          dishes.map(dish => {
           return <button style={{display:"block",width:"100%",marginBottom:"1rem",height:"3rem"}} onClick={() => handleClick(dish)} key={dish.id}>{dish.dishName}</button>
          })
        }
       </div>
        <div style={{position:"absolute",bottom:"1rem"}}>
        <Pagination  count={3} />  
        </div>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
       {
        show && 
        <div>
          <label>Dishes</label>
          <input type="text" style={{width:'100%',height:"2.5rem"}} onChange={(e) => setDish({...currentDish, dishName:e.target.value})} value={currentDish.dishName}  />
          <br />
          <label>Ingredients</label>
          <Select
            isMulti
            options={[
            { value: 'Ingredient 1', label: 'Ingredient 1' },
            { value: 'Ingredient 2', label: 'Ingredient 2' },
            { value: 'Ingredient 3', label: 'Ingredient 3' },
            { value: 'Ingredient 4', label: 'Ingredient 4' },
            { value: 'Ingredient 5', label: 'Ingredient 5' },
            { value: 'Ingredient 6', label: 'Ingredient 6' },
            { value: 'Ingredient 7', label: 'Ingredient 7' },
            { value: 'Ingredient 8', label: 'Ingredient 8' },
            { value: 'Ingredient 9', label: 'Ingredient 9' },
            { value: 'Ingredient 10', label: 'Ingredient 10' },
            { value: 'Ingredient 11', label: 'Ingredient 11' },
            { value: 'Ingredient 12', label: 'Ingredient 12' },
            ]}
            value={ingredients}
            onChange={handleNewDishIngredientsUpdate}
            fullWidth
          />
          <br />
           <Button
            variant="contained"
            color="primary"
           
           
            onClick={updateDishHandler}
            >
            Update
            </Button>
          
        </div>
       }
       {
        showCreate && 
        <div>
          <label >Dish</label>
          <input type="text" style={{width:'100%',height:"2.5rem"}} onChange={(e)=>setNewDish({dishName:e.target.value})} />
          <br />
          <label >Ingredients</label>
          <Select
            isMulti
            options={[
            { value: 'Ingredient 1', label: 'Ingredient 1' },
            { value: 'Ingredient 2', label: 'Ingredient 2' },
            { value: 'Ingredient 3', label: 'Ingredient 3' },
            { value: 'Ingredient 4', label: 'Ingredient 4' },
            { value: 'Ingredient 5', label: 'Ingredient 5' },
            { value: 'Ingredient 6', label: 'Ingredient 6' },
            { value: 'Ingredient 7', label: 'Ingredient 7' },
            { value: 'Ingredient 8', label: 'Ingredient 8' },
            { value: 'Ingredient 9', label: 'Ingredient 9' },
            { value: 'Ingredient 10', label: 'Ingredient 10' },
            { value: 'Ingredient 11', label: 'Ingredient 11' },
            { value: 'Ingredient 12', label: 'Ingredient 12' },
            ]}
            value={newDishIngredients}
            onChange={handleNewDishIngredientsChange}
            fullWidth
          />
          <br />
          <Button variant="contained"
            color="primary" onClick={saveDishHandler}>Save</Button>
        </div>
       }
      </Box>
    </Box>
    </div>
  )
}

export default Sidebar;