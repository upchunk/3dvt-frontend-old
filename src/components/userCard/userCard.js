import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { listSegmentasi } from "../../utils/api";

export default function UserCard() {
  const userid = useSelector((state) => state.userConfig.userid);
  const userData = useSelector((state) => state.userConfig.userData);
  const groupNames = useSelector((state) => state.userConfig.groupNames);
  const [segCount, setSegCount] = useState(0);

  useEffect(() => {
    listSegmentasi(userid, groupNames, "SUCCESS").then((res) =>
      setSegCount(res.data.count)
    );
    console.log("Count loop");
  }, [userid, groupNames]);

  return (
    <div>
      <Card sx={{ maxWidth: 500 }}>
        <CardHeader
          sx={{
            backgroundColor: "#0148A9",
            height: 120,
            color: "white",
          }}
          title="Welcome Back !"
          text="Welcome"
          subheader={
            <Typography gutterBottom variant="subtitle1" component="div">
              {userData?.full_name
                ? userData?.full_name
                : userData?.first_name + " " + userData?.last_name}
            </Typography>
          }
        />
        <CardActions>
          <Box padding="1vh 0.5vw">
            <h2>{segCount}</h2>
            <div>Projek Segmentasi</div>
            <Link to="/segmentasi/data">
              <Button
                variant="contained"
                size="small"
                sx={{
                  mt: 1,
                  backgroundColor: "#0148A9",
                  fontSize: "small",
                  fontWeight: "300",
                }}
              >
                Lihat Projek Segmentasi {">"}
              </Button>
            </Link>
          </Box>
          <Box padding="1vh 0.5vw">
            <h2>0</h2>
            <div>Projek Rekonstruksi</div>
            <Link to="/rekonstruksi/data">
              <Button
                variant="contained"
                size="small"
                sx={{
                  mt: 1,
                  backgroundColor: "#0148A9",
                  fontSize: "small",
                  fontWeight: "300",
                }}
              >
                Lihat Projek Rekonstruksi {">"}
              </Button>
            </Link>
          </Box>
        </CardActions>
      </Card>
    </div>
  );
}
