import Dexie from "dexie";

const db = new Dexie('notoDB');

db.version(1).stores({
    users: 'id, username, email, password, dateCreated',
    notebooks: '++id, userId, title, createdOn',
    notes: '++id, notebookId, userId, title, content, createdOn, updatedOn',
    trash: '++id, userId, type, refId, deletedOn',
    session: ''
});

self.onmessage = async (e) => {
    const { action, payload } = e.data;
  
    try {
        let result;
  
        switch (action) {
        // ================= USERS =================
        case "addUser":
            await db.users.add(payload);
            result = { success: true, user: payload };
            break;
  
        case "findUserByEmail":
            result = await db.users.where("email").equals(payload.email).first();
            break;
  
        case "findUserByCredentials":
            result = await db.users.where("username")
                                   .equals(payload.username)
                                   .and(user => user.password === payload.password)
                                   .first();
            break;
  
        // ================= SESSION =================
        case "setActiveUser":
            await db.session.put({ key: "activeUser", value: payload.userId });
            result = { success: true };
            break;
  
        case "getActiveUser":
            const session = await db.session.get("activeUser");
            if (session) {
                result = await db.users.get(session.value);
            } else {
                result = null;
            }
            break;
  
        case "clearActiveUser":
            await db.session.delete("activeUser");
            result = { success: true };
            break;

        // ================= NOTEBOOKS =================
        case 'addNotebook':
            await db.notebooks.add(payload);
            result = { success: true, user: payload };
            break;

        case "getNotebooks":
            result = await db.notebooks.where("userId").equals(payload.userId).toArray();
            break;
        
        case "updateNotebook":
            await db.notebooks.update(payload.id, {
                ...payload.changes,
            });
            result = { success: true };
            break;

        case "replaceNotebook":
            await db.notebooks.put(payload);
            result = { success: true };
            break;

        case "deleteNotebook":
            await db.notebooks.delete(payload.id);
            result = { success: true };
            break;

        // ================= NOTES =================
        case 'addNote':
            await db.notes.add(payload);
            result = { success: true, user: payload };
            break;
        
        case "getNotesByNotebook":
            result = await db.notes.where("notebookId").equals(payload.notebookId).toArray();
            break;

        case "updateNote":
            await db.notes.update(payload.id, {
                ...payload.changes,
                updatedOn: new Date().toISOString(),
            });
            result = { success: true };
            break;
        
        case "replaceNote":
            await db.notes.put(payload);
            result = { success: true };
            break;

        case "deleteNote":
            await db.notes.delete(payload.id);
            result = { success: true };
            break;
  
        default:
          throw new Error(`Unknown action: ${action}`);
        };
  
        self.postMessage({ action, result });
    } catch (err) {
        self.postMessage({ action, error: err.message });
    };
};

