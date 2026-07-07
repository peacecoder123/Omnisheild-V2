import { WebSocketServer, WebSocket } from 'ws';

let wss;

export function initWebSocket(server) {
  wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (ws) => {
    console.log('[WS] Client connected');
    ws.on('close', () => {
      console.log('[WS] Client disconnected');
    });
  });

  return wss;
}

export function broadcast(type, data) {
  if (!wss) return;
  const message = JSON.stringify({ type, data, timestamp: new Date().toISOString() });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}
