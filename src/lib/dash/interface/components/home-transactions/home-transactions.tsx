import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "amount", headerName: "Transanction Amount" },
  { field: "status", headerName: "status", width: 100 },
  { field: "date", headerName: "Date", width: 100 },
];

const rows = [
  { id: 1, amount: "1,800", status: "Completed", date: "2024-08-12" },
  { id: 2, amount: "1,550", status: "Completed", date: "2024-08-12" },
  { id: 3, amount: "1,4900", status: "Canceled", date: "2024-08-12" },
  { id: 4, amount: "900", status: "Completed", date: "2024-08-12" },
  { id: 5, amount: "300", status: "Canceled", date: "2024-08-12" },
  { id: 6, amount: "2,100", status: "Completed", date: "2024-08-12" },
];

const paginationModel = { page: 0, pageSize: 5 };

export const HomeTransactions = () => {
  return (
    <Card>
      <CardHeader title="Movements" />
      <CardContent>
        {rows.map((item: any) => {
          return (
            <Stack
              flexDirection="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box flexGrow={1}>
                <Typography
                  color={
                    item.status.toLowerCase() === "canceled"
                      ? "error"
                      : "success"
                  }
                >
                  ${item.amount}
                </Typography>
              </Box>
              <Box width={120}>
                <Typography
                  color={
                    item.status.toLowerCase() === "canceled"
                      ? "error"
                      : "success"
                  }
                >
                  {item.status}
                </Typography>
              </Box>
              <Box width={120}>
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
          );
        })}
      </CardContent>
    </Card>
  );
};
