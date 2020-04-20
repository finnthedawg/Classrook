import React from "react";
import ContentCard from "./ContentCard";
import { Grid } from "@material-ui/core";
import contentList from "./constants";

const Content = () => {
  const getContentCard = contentCardObj => {
    return (
      <Grid item xs={12} sm={4}>
        <ContentCard {...contentCardObj} />
      </Grid>
    );
  };

  return (
    <Grid container spacing={8}>
      {contentList.map(contentCardObj => getContentCard(contentCardObj))}
    </Grid>
  );
};

export default Content;