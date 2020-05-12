import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import {withStyles} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import {TextField} from '@material-ui/core' 
import {Redirect} from 'react-router-dom'
const useStyles = theme => ({
    
  root: {
    flexGrow: 1,
  },
  helpIcon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    textAlign : "center",
    fontSize : "24px",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  loginButton:{
    display: "block",
  },
});

class SearchAppBar extends Component{
  constructor(props){
    super(props)
    this.state = {
      user_clicked : false,
      title_clicked : false,
    }
  }

  handleUserClick = () => {
    this.setState({
      user_clicked: true
    })
  }

  handleTitleClick = () =>{
    // alert("username clicked!")
    this.setState({
      title_clicked : true
    })
  }

  render(){
  const { classes } = this.props
  console.log(classes)
  if(this.state.title_clicked){
    this.setState({
      title_clicked : false
    })
    return (<Redirect to={'/content'} />)
  }
  if(this.state.user_clicked){
    this.setState({
      user_clicked : false
    })
    return (<Redirect to={'/user'} />)
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap onClick={this.handleTitleClick}>
            ClassRook 
          </Typography>
          <Typography className={classes.loginButton} variant="h6" noWrap onClick={this.handleUserClick}>
            Welcome {sessionStorage.getItem("user")}!
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

        </Toolbar>
      </AppBar>
    </div>
  );
  }
}
export default withStyles(useStyles)(SearchAppBar);