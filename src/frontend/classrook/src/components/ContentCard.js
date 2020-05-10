import React, {Component} from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, CardMedia } from "@material-ui/core";


class ContentCard extends Component{
  constructor(props){
    super(props)
    console.log(this.props)
    this.state = {
      clicked : false
    }
    console.log(this.state)

  }
  
  componentDidMount = () => {
    console.log("component loaded")
  }

  handleClick = () => {
    alert("Content coming soon!")
    console.log("Clicked!")
    this.setState({
      clicked : true
    })
  }


  render(){
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