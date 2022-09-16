import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { postSegmentasi } from "../utils/api";
import { useDispatch } from "react-redux";
import { setResultImages, setSourceImages } from "../redux/runnerConfig";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  height: "200px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "gray",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "gray",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function StyledDropzone() {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: { "image/*": [] } });
  const [modelIndex, setModelIndex] = useState(0);
  const models = ["model_tesis_epoch20_sz448.hdf5"];
  const dispatch = useDispatch();

  let formData = new FormData();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  useEffect(() => {
    formData.append("user", 1);
    formData.append("model", models[modelIndex]);
  }, [modelIndex]);

  acceptedFiles.map((file) => {
    formData.append("images", file, file.name);
  });

  const cardTitle = (
    <Typography variant="h6" fontFamily={"Montserrat"} fontWeight={"bold"}>
      Buat Projek Segmentasi Baru
    </Typography>
  );

  async function handleSubmit() {
    if (acceptedFiles.length > 0)
      postSegmentasi(formData).then((res) => {
        dispatch(setSourceImages(res.task_data.sources));
        dispatch(setResultImages(res.task_data.results));
      });
  }

  return (
    <Card sx={{ p: 3 }}>
      <CardHeader
        sx={{
          color: "black",
          size: "small",
          height: 0,
        }}
        title={cardTitle}
      ></CardHeader>
      <CardContent>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Grid item xs={2}>
            Model:
          </Grid>
          <Grid item xs={10}>
            <FormControl fullWidth>
              <Select
                value={modelIndex}
                onChange={(e) => setModelIndex(e.target.value)}
              >
                {models.map((each, index) => (
                  <MenuItem key={index} value={index}>
                    {each}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Grid item xs={2}>
            Lampirkan Gambar:
          </Grid>
          <Grid item xs={10}>
            <div className="container">
              <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <CloudUploadIcon fontSize="large" />
                <p>{"Tarik dan lepas file disini untuk mengunggah"}</p>
              </div>
            </div>
            {files.length !== 0 ? (
              <aside>
                <h4>Files: </h4>
                <ul>{files}</ul>
              </aside>
            ) : null}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button onClick={handleSubmit} variant="contained">
          Run
        </Button>
      </CardActions>
    </Card>
  );
}
