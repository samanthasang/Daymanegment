import { Box, SxProps, Theme, Typography } from "@mui/material";

interface Props {
  labelSx?: SxProps<Theme>;
  label: string;
  checked: boolean;
  handleToggle: (e?: React.MouseEvent<HTMLDivElement>) => void;
}

const BasicSwitch = ({ checked, handleToggle, label, labelSx }: Props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      onClick={handleToggle}
      sx={{
        cursor: "pointer",
        width: "fit-content",
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          width: "28px",
          height: "16px",
          backgroundColor: checked ? "#07C307" : "#A8A8A8",
          borderRadius: "100px",
          padding: "5px",
          position: "relative",
          transition: "background-color 0.3s ease",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "2px",
            left: checked ? "14px" : "2px",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            transition: "left 0.3s ease",
          }}
        />
      </Box>
      <Typography
        sx={{
          marginLeft: "8px",
          fontWeight: 400,
          fontSize: 16,
          color: "#7B7B7B",
          ...labelSx,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default BasicSwitch;
