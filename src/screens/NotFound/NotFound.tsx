import React from "react";
import {Box} from "@mui/material";
import { ROUTES } from "@muc/constant";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";

export const NotFound = () => {
  return (
    <React.Fragment>
      <Box
        display="flex"
        flexDirection="column"
        height={"80vh"}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h1" fontWeight={900} mr={2}>
          404
        </Typography>
        <Typography variant="h5" fontWeight={900} color="GrayText" gutterBottom>
          Page not found
        </Typography>
        <Typography variant="subtitle1">
          The page you are looking for does not exist
        </Typography>
        <Link to={ROUTES.LOGIN_ACCOUNT}>
          <Box display="flex" alignItems="center">
            <ArrowBackIcon fontSize="small" />
            <Typography variant="inherit">Go back</Typography>
          </Box>
        </Link>
      </Box>
    </React.Fragment>
  );
};

export default NotFound;
