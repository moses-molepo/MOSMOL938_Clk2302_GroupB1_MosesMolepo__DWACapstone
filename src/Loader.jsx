import { Card, CardHeader,CardContent, Skeleton } from "@mui/material";


const LoadingSkeleton = () => (
  <Card variant="outlined">
    <CardHeader>
      <Skeleton animation="wave" variant="text" />
    </CardHeader>
    <CardContent>
      <Skeleton animation="wave" variant="text" />
      <Skeleton animation="wave" variant="text" />
      <Skeleton animation="wave" variant="text" />
    </CardContent>
  </Card>
);


export default LoadingSkeleton;


