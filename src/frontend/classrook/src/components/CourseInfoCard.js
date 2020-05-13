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
      fontWeight: "bold"
    },
    pos: {
      marginBottom: 12,
    },
  });

class CourseInfoCard extends Component{
  constructor(props){
    super(props)
    //console.log(this.props)
    this.state = {
      card_clicked : false,
    }
    

  }
  
  componentDidMount = () => {
    console.log("component loaded")
    sessionStorage.setItem("course_id",this.props.id)
}

  handleClick = () => {
    this.setState({
        card_clicked : true
    })
  }


  render(){
    const { classes } = this.props
    if (this.state.card_clicked) {
            return (<Redirect to={`/majors/${this.props.category}/${this.props.id}`} />)
    }
    return (
                  <Card className={classes.root} variant="outlined">
                    <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {this.props.category}-{this.props.code}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {this.props.title}
                    </Typography>
                    <br/>
                    <Typography variant="h6" component="h3">
                        {this.props.description}
                    </Typography>
                    </CardContent>
                </Card>
    )
  }
}

  
export default withStyles(useStyles)(CourseInfoCard);