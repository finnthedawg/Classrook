import React, {Component} from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, CardMedia } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { withStyles} from '@material-ui/core';
import axios from 'axios';

import CourseCard from "./CourseCard";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

class indMajor extends Component{
  constructor(props){
    super(props)
    console.log("here are the props")
    console.log(this.props)
    this.state = {
      courses : [],
      doneLoading : false
    }


  }
  
  componentDidMount = () => {
    const id = this.props.match.params.id
    axios.post('http://localhost:8000/course_by_code/', {id})
        .then(response => {
            console.log(response.data)
            this.setState({
                courses: response.data
            })
        })
        .catch(error => {
            console.log("ERROR in Category loading ", error)
        })
    console.log(this.state.courses)
  }

  checkLoaded = () => {
      if(this.state.courses != []){
          this.setState({
              doneLoading : true
          })
      }
  }

  Cat = () => {
    const getContentCard = contentCardObj => {
      return (
        <Grid item xs={12} sm={4}>
          <CourseCard {...contentCardObj} />
        </Grid>
      );
    };
  
    return (
      <Grid container spacing={8}>
        {this.state.courses.map(contentCardObj => getContentCard(contentCardObj))}
      </Grid>
    );
  };

  handleClick = () => {
      console.log(this.state.courses)
  }



  render(){
    if(this.state.courses == []){
        return(
        <div>Loading Courses...</div>
    );}
    else
    return(  <Grid container direction="column">
    <Grid item container justify="center" alignItems="center">
      <Grid item xs={false} sm={2} />
        <Grid container spacing={8}>
            {this.state.courses.map(contentCardObj => 
                <Grid item xs={12} sm={4}>
                <CourseCard {...contentCardObj} />
              </Grid>
            )}
        </Grid>
      </Grid>
    </Grid>
    );
  }
}

  
export default withStyles(useStyles)(indMajor);