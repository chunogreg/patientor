import FavoriteIcon from "@mui/icons-material/Favorite";

import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
//import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

const Rating = ({ rating }: { rating: number | null }) => {
  switch (rating) {
    case 0:
      return <FavoriteIcon sx={{ color: "#1a8321" }} />;
    case 1:
      return <FavoriteIcon sx={{ color: "#d7d72d" }} />;
    case 2:
      return <FavoriteIcon sx={{ color: "#e6b03b" }} />;
    case 3:
      return <FavoriteIcon sx={{ color: "#c90c15" }} />;
  }
};

const HealthTypeIcons = ({ type }: { type: string }) => {
  switch (type) {
    case "Hospital":
      return <LocalHospitalIcon fontSize="medium" />;
    case "HealthCheck":
      return <HealthAndSafetyIcon fontSize="medium" />;
    case "OccupationalHealthcare":
      return <WorkHistoryIcon fontSize="medium" />;
  }
};
export { Rating, HealthTypeIcons };
