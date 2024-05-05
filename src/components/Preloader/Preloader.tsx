import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"

export const Preloader = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  )
}
