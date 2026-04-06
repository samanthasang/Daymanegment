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
        paddingX: "5px",
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          width: "24px",
          height: "8px",
          backgroundColor: checked ? "#499BF0" : "#A8A8A8",
          borderRadius: "100px",
          padding: "5px",
          position: "relative",
          transition: "background-color 0.3s ease",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-3px",
            left: checked ? "18px" : "-6px",
            width: "16px",
            height: "16px",
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
