let users = [];

const addUser = (userId, socketId) => {
    // Si l'array users ne contient pas déjà d'objet avec un champ userId égal à celui passé en argument, on ajoute l'objet {userId, socketId} :
    !users.some( user => user.userId === userId) && users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    // On ne garde dans l'array users que les objets dont le champ socketId n'est pas égal à celui passé en argument :
    users = users.filter(user => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
}

exports.start = (io) => {
    io.on('connection', (socket) => {
        console.log("🔌 A user has connected to socket (Messenger).");
    
        // 🔴 Connexion à la socket :
        socket.on("MESSENGER_addUser", userId => {
            addUser(userId, socket.id); // Récupération de tous les users loggés côté client
            io.emit("MESSENGER_getUsers", users); // Envoi des users loggés
        });
    
        // 📩 Envoi et récupération de messages :
        socket.on("sendMessage", ({senderId, receiverId, text}) => {
            const user = getUser(receiverId);
            io.to(user.socketId).emit("getMessage", { senderId, text });
        });
    
        // ❌ Déconnexion de la socket :
        socket.on("disconnect", () => {
            removeUser(socket.id); // Suppression des users hors-ligne
            io.emit("MESSENGER_getUsers", users); // Renvoi des users
            console.log("🔌 A user has disconnected from socket server (Messenger).");
        });
    })
}