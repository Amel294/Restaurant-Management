// Path: client\src\constants\CardDashboardOverviewData.tsx
import { ArchiveX, Box ,IndianRupee, Truck } from "lucide-react";
export const CardDashboardOverviewData = [
    {
        icon: <Box />,
        title: 'Total Orders',
        value: 75,
        change: {
            percent: 4,
            value: 12,
            period: 'days',
            isIncrease: true,
        },
    },
    {
        icon: <Truck />,
        title: 'Total Delivered',
        value: 357,
        change: {
            percent: 4,
            value: 10,
            period: 'days',
            isIncrease: false,
        },
    },
    {
        icon: <ArchiveX size={32} />,
        title: 'Total Canceled',
        value: 75,
        change: {
            percent: 25,
            value: 12,
            period: 'days',
            isIncrease: true,
        },
    },
    {
        icon: <IndianRupee />,
        title: 'Total revenue',
        value: 357,
        change: {
            percent: 12,
            value: 10,
            period: 'days',
            isIncrease: false,
        },
    },
];