import type { Server } from 'socket.io'

let socketServer: Server | null = null

export function setSocketServer(server: Server) {
  socketServer = server
}

export function emitOrderStatus(userId: string, data: { status: string; orderId: string; userId: string }) {
  socketServer?.to(`user:${userId}`).emit('statusUpdated', data)
}
