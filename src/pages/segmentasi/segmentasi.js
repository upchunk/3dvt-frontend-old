import React from "react";
import { useSelector } from "react-redux";
import StyledDropzone from "../../components/dropzone";
import ImageGalleryViewer from "../../components/imageGalery";
import "./segmentasi.css";

export default function Segmentasi() {
  const result = useSelector((state) => state.runnerConfig.resultImages);

  return (
    <div className="segmentasi">
      <StyledDropzone></StyledDropzone>
      {result.length !== 0 ? <ImageGalleryViewer /> : <></>}
    </div>
  );
}
