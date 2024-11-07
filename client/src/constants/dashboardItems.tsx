// Path: client\src\constants\dashboardItems.tsx

import { 
    Calendar, ChartColumnIncreasing, Coffee, CreditCard, Home, 
    List, MessageSquareMore, NotebookPenIcon, Pen, StickyNote, User, Users 
  } from 'lucide-react';
  
  export type DashboardItem = {
    title: string;
    logo: JSX.Element;
  };
  
  export const dashboardItems: Record<string, DashboardItem> = {
    dashboard: {
      title: "Dashboard",
      logo: <Home size={20} />
    },
    orderList: {
      title: "Order List",
      logo: <List size={20} />
    },
    orderDetail: {
      title: "Order Detail",
      logo: <StickyNote size={20} />
    },
    customer: {
      title: "Customer",
      logo: <Users size={20} />
    },
    analytics: {
      title: "Analytics",
      logo: <ChartColumnIncreasing size={20} />
    },
    reviews: {
      title: "Reviews",
      logo: <Pen size={20} />
    },
    foods: {
      title: "Foods",
      logo: <Coffee size={20} />
    },
    foodDetail: {
      title: "Food Detail",
      logo: <NotebookPenIcon size={20} />
    },
    customerDetail: {
      title: "Customer Detail",
      logo: <User size={20} />
    },
    calendar: {
      title: "Calendar",
      logo: <Calendar size={20} />
    },
    chat: {
      title: "Chat",
      logo: <MessageSquareMore size={20} />
    },
    wallet: {
      title: "Wallet",
      logo: <CreditCard size={20} />
    }
  };
  