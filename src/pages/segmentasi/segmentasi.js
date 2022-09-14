import React from "react";
import { useSelector } from "react-redux";
import StyledDropzone from "../../components/dropzone/dropzone";
import ImageGalleryViewer from "../../components/image Galery/imageGalery";
import "./segmentasi.css";

export default function Segmentasi() {
  const source = useSelector((state) => state.runnerConfig.sourceImages);
  const result = useSelector((state) => state.runnerConfig.resultImages);

  return (
    <div className="segmentasi">
      <StyledDropzone></StyledDropzone>
      {source && result ? <ImageGalleryViewer /> : null}
    </div>
  );
}
