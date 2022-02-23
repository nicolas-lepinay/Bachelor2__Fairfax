let onlineUsers = []

const addUser = (userId, socketId) => {
    !onlineUsers.some( user => user.userId === userId) && onlineUsers.push({ userId, socketId });
}

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
    return onlineUsers.find(user => user.userId === userId);
}

exports.start = (io) => {
    io.on('connection', (socket) => {
        console.log("🔌 A user has connected to socket (Notifications).");
    
        // 🔴 Connexion à la socket :
        socket.on("NOTIFICATIONS_addUser", userId => {
            addUser(userId, socket.id); // Récupération de tous les users loggés côté client
        });

        // 🔔 Envoi d'une notification :
        socket.on("sendNotification", ({ sender, receiverId, post, type }) => {
            if(receiverId) {
                const receiver = getUser(receiverId);
                io.to(receiver?.socketId).emit('getNotification', {
                    sender,
                    post,
                    type,
                });
            }
        });
        
        // ❌ Déconnexion de la socket :
        socket.on("disconnect", () => {
            removeUser(socket.id);
            console.log("🔌 A user has disconnected from socket server (Notifications).");
        });

    })
}