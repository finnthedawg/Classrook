import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, CardMedia } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

  root: {
    paddingTop : "25px",
  }

}))

const ContentCard = props => {
  const classes = useStyles();

  const { title, description, imageUrl } = props;
  return (
    <Card className={classes.root}>
      <CardActionArea>
      <CardHeader
        title={title}
      />
      <CardMedia style={{ height: "150px" }} image={imageUrl} />
      <CardContent>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ContentCard;