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
import CourseInfoCard from "./CourseInfoCard";
import ReviewCard from './ReviewCard';
import CreateReview from './CreateReview';
import DropFile from './DropFile';

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

class CourseFiles extends Component{
  constructor(props){
    super(props)
    console.log("here are the props")

    console.log(this.props)
    this.state = { 
    courseInfo : [],
    }
  }
  
  componentDidMount = () => {
    const id = parseInt(this.props.match.params.id)
    axios.post('http://localhost:8000/get_exact_course/', {id})
        .then(response => {
            console.log(response.data)
            this.setState({
                courseInfo: response.data
            })
        })
        .catch(error => {
            console.log("ERROR in Category loading ", error)
        })
  }


  handleClick = () => {
      console.log(this.state.courseInfo)
      console.log("here are the reviews")
  }

  render(){
   
    return(
        <>
        <Grid container direction="column">
        <Grid item>
            <CourseInfoCard {...this.state.courseInfo} />
        </Grid>
        <Grid item>
            <DropFile {...this.state.courseInfo}/>
        </Grid>
      </Grid>
        </>
    );
  }
}

  
export default withStyles(useStyles)(CourseFiles);




