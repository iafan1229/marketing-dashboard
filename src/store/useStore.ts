import { create } from "zustand";
import { Chat, User, ChartData, DashboardMetric } from "@/types/app";

interface AppStore {
  // Chat state
  chats: Chat[];
  currentUser: User | null;
  searchQuery: string;
  sortBy: "owner" | "lastModified";
  currentPage: number;
  itemsPerPage: number;

  // Dashboard state
  dashboardMetrics: DashboardMetric[];
  charts: ChartData[];

  // Actions
  setChats: (chats: Chat[]) => void;
  setCurrentUser: (user: User) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: "owner" | "lastModified") => void;
  setCurrentPage: (page: number) => void;
  addChart: (chart: ChartData) => void;
  removeChart: (chartId: string) => void;
  updateChart: (chartId: string, updates: Partial<ChartData>) => void;

  // Computed
  filteredChats: () => Chat[];
  paginatedChats: () => Chat[];
}

export const useStore = create<AppStore>((set, get) => ({
  // Initial state
  chats: [
    {
      id: "1",
      name: "Real Estate Landing Page Content",
      owner: "Moskur Alam",
      ownerAvatar: "👤",
      created: "39 min ago",
      lastModified: "24 sec ago",
      isOwn: true,
    },
    {
      id: "2",
      name: "Cover Letter Assistant",
      owner: "John Doe",
      ownerAvatar: "👨",
      created: "Yesterday",
      lastModified: "4 hr ago",
      isOwn: false,
    },
    {
      id: "3",
      name: "Upgrade to Pro Summary",
      owner: "Peter Moor",
      ownerAvatar: "🧑",
      created: "Yesterday",
      lastModified: "Yesterday",
      isOwn: false,
    },
  ],

  currentUser: {
    id: "current",
    name: "Moskur Alam",
    avatar: "👤",
  },

  searchQuery: "",
  sortBy: "lastModified",
  currentPage: 1,
  itemsPerPage: 10,

  dashboardMetrics: [
    {
      title: "Website Traffic",
      value: "+15%",
      change: "+15%",
      trend: "up",
      data: [20, 30, 25, 40, 35, 45, 40],
    },
    {
      title: "Conversion Rates",
      value: "8.2%",
      change: "+2%",
      trend: "up",
    },
    {
      title: "Top Performing Channels",
      value: "25%",
      change: "+10%",
      trend: "up",
    },
    {
      title: "Customer Acquisition Cost",
      value: "-5%",
      change: "-5%",
      trend: "down",
    },
  ],

  charts: [],

  // Actions
  setChats: (chats) => set({ chats }),
  setCurrentUser: (currentUser) => set({ currentUser }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortBy: (sortBy) => set({ sortBy }),
  setCurrentPage: (currentPage) => set({ currentPage }),

  addChart: (chart) =>
    set((state) => ({
      charts: [...state.charts, chart],
    })),

  removeChart: (chartId) =>
    set((state) => ({
      charts: state.charts.filter((chart) => chart.id !== chartId),
    })),

  updateChart: (chartId, updates) =>
    set((state) => ({
      charts: state.charts.map((chart) =>
        chart.id === chartId ? { ...chart, ...updates } : chart
      ),
    })),

  // Computed
  filteredChats: () => {
    const { chats, searchQuery, sortBy } = get();
    const filtered = chats.filter(
      (chat) =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.owner.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortBy === "owner") {
        return a.owner.localeCompare(b.owner);
      }
      return (
        new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
      );
    });
  },

  paginatedChats: () => {
    const { currentPage, itemsPerPage } = get();
    const filtered = get().filteredChats();
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  },
}));
