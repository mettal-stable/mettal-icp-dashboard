import { Box, Button, Stack } from "@mui/material";
import icpLogo from "@assets/internet-computer-icp-logo.png";

interface IcpLinkScreen {
  onLinkIcp: () => void;
}

export const IcpLinkScreen: React.FC<IcpLinkScreen> = (props) => {
  return (
    <Box>
      <Stack spacing={2}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {
            props.onLinkIcp();
          }}
          startIcon={<img src={icpLogo} alt="ICP" width={24} height={24} />}
        >
          Connect to Internet Computer
        </Button>
      </Stack>
    </Box>
  );
};
