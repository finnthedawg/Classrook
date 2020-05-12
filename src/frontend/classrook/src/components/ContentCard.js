import React, {Component} from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, CardMedia } from "@material-ui/core";
import { Redirect } from 'react-router-dom';

class ContentCard extends Component{
  constructor(props){
    super(props)
    //console.log(this.props)
    this.state = {
      reviews_clicked : false,
      courses_clicked : false,
    }
    console.log(this.state)

  }
  
  componentDidMount = () => {
    console.log("component loaded")
  }

  handleClick = () => {
    console.log(this.props)
    if(this.props.title == "Reviews"){
      this.setState({
        reviews_clicked : true 
      })
    }
    else if(this.props.title == "Courses"){
      this.setState({
        courses_clicked: true
      })
    }
  }


  render(){
    if (this.state.courses_clicked) {
			return (<Redirect to={'/majors'} />)
    }
    if (this.state.reviews_clicked) {
			return (<Redirect to={'/reviews'} />)
    }
    return (
      <Card>
        <CardActionArea onClick={this.handleClick}>
          <CardHeader
            title={this.props.title}
          />
        <CardMedia style={{ height: "150px" }} image={this.props.imageUrl} />
          <CardContent>
            <Typography variant="body2" component="p">
              {this.props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
}

  
export default ContentCard;