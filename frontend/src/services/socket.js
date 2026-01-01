import { io } from 'socket.io-client';

let socket = null;

export const initSocket = () => {
    if (socket) return socket;

    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

    socket = io(SOCKET_URL, {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000
    });

    socket.on('connect', () => {
        console.log('🔌 Socket connected:', socket.id);
    });

    socket.on('disconnect', (reason) => {
        console.log('🔌 Socket disconnected:', reason);
    });

    socket.on('connect_error', (error) => {
        console.error('🔌 Socket connection error:', error.message);
    });

    return socket;
};

export const getSocket = () => {
    if (!socket) {
        return initSocket();
    }
    return socket;
};

export const initSession = (userId, sessionId) => {
    const sock = getSocket();
    sock.emit('initSession', { userId, sessionId });
};

export const sendMessage = (message, userId, sessionId) => {
    const sock = getSocket();
    sock.emit('sendMessage', { message, userId, sessionId });
};

export const onMessage = (callback) => {
    const sock = getSocket();
    sock.on('receiveMessage', callback);
    return () => sock.off('receiveMessage', callback);
};

export const onTyping = (callback) => {
    const sock = getSocket();
    sock.on('typing', callback);
    return () => sock.off('typing', callback);
};

export const onSessionInitialized = (callback) => {
    const sock = getSocket();
    sock.on('sessionInitialized', callback);
    return () => sock.off('sessionInitialized', callback);
};

export const emitTyping = (isTyping) => {
    const sock = getSocket();
    sock.emit('userTyping', { isTyping });
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

export default {
    initSocket,
    getSocket,
    initSession,
    sendMessage,
    onMessage,
    onTyping,
    onSessionInitialized,
    emitTyping,
    disconnectSocket
};
