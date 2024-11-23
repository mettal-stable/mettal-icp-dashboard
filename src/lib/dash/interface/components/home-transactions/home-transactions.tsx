import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";

// const rows = [
//   {
//     id: 1,
//     amount: "1,800",
//     status: "Completed",
//     date: "2024-08-12",
//     type: "withdrawal",
//   },
//   {
//     id: 2,
//     amount: "1,550",
//     status: "Completed",
//     date: "2024-08-12",
//     type: "deposit",
//   },
//   {
//     id: 3,
//     amount: "1,4900",
//     status: "Canceled",
//     date: "2024-08-12",
//     type: "withdrawal",
//   },
//   {
//     id: 4,
//     amount: "900",
//     status: "Completed",
//     date: "2024-08-12",
//     type: "deposit",
//   },
//   {
//     id: 5,
//     amount: "300",
//     status: "Canceled",
//     date: "2024-08-12",
//     type: "withdrawal",
//   },
//   {
//     id: 6,
//     amount: "2,100",
//     status: "Freezed",
//     date: "2024-08-12",
//     type: "withdrawal",
//   },
// ];

const rows: any[] = [];
const colStyle = {
  textAlign: "center",
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "canceled":
      return "error";
    case "completed":
      return "success";
    case "freezed":
      return "info";
    default:
      return "default";
  }
};

export const HomeTransactions = () => {
  return (
    <Card>
      <CardHeader title="Transactions" />
      <CardContent sx={{ p: 4, pt: 1 }}>
        {rows.length === 0 ? <Typography> No records yet </Typography> : null}
        {rows.map((item: any, index: number) => {
          return (
            <Box
              key={"transaction-id-" + index}
              sx={{ borderBottom: "1px solid #eee", pb: 1 }}
            >
              <Stack
                flexDirection="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Box width={120}>
                  <Typography
                    variant="body1"
                    color={
                      item.status.toLowerCase() === "canceled"
                        ? "error"
                        : "success"
                    }
                  >
                    ${item.amount}
                  </Typography>
                </Box>
                <Box width={120} sx={colStyle}>
                  <Typography variant="caption">
                    {item.type.toUpperCase()}
                  </Typography>
                </Box>
                <Box width={120} sx={{ ...colStyle, textAlign: "left" }}>
                  <Typography color={getStatusColor(item.status.toLowerCase())}>
                    {item.status}
                  </Typography>
                </Box>

                <Box width={120} sx={colStyle}>
                  <Typography
                    color={
                      item.status.toLowerCase() === "canceled"
                        ? "error"
                        : "success"
                    }
                  >
                    {item.date}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
};
