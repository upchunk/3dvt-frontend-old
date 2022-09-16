import React from "react";
import { useSelector } from "react-redux";
import DataTable from "../../components/dataTable";
import ImageGalleryViewer from "../../components/imageGalery";
import "./dataSegmentasi.css";

export default function DataSegmentasi() {
  const showGalery = useSelector((state) => state.runnerConfig.showGalery);

  return (
    <div className="dataSegmentasi">
      <DataTable />
      {showGalery ? <ImageGalleryViewer /> : null}
    </div>
  );
}
