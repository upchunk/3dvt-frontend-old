import "react-image-gallery/styles/css/image-gallery.css";
import React from "react";
import ImageGallery from "react-image-gallery";
import { Card, Grid } from "@mui/material";
import { useSelector } from "react-redux";

export default function ImageGalleryViewer() {
  const source = useSelector((state) => state.runnerConfig.sourceImages);
  const result = useSelector((state) => state.runnerConfig.resultImages);

  return (
    <Card sx={{ p: 3, mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ImageGallery
            items={source}
            showFullscreenButton={false}
            showPlayButton={false}
            showBullets={true}
          />
        </Grid>
        <Grid item xs={6}>
          <ImageGallery
            items={result}
            showFullscreenButton={false}
            showPlayButton={false}
            showBullets={true}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
