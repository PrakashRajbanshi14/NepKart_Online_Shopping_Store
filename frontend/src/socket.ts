import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3000", {
  auth: {
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  },
});
