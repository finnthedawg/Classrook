import React from "react";
import CategoriesCard from "./categoriesCard";
import { Grid } from "@material-ui/core";
import contentList from "./categories";

const Cat = () => {
  const getContentCard = contentCardObj => {
    return (
      <Grid item xs={12} sm={4}>
        <CategoriesCard {...contentCardObj} />
      </Grid>
    );
  };

  return (
    <Grid container spacing={8}>
      {contentList.map(contentCardObj => getContentCard(contentCardObj))}
    </Grid>
  );
};

export default Cat;