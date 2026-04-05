import { Database } from "./database.types";

export type { Database };

export type User = Database["public"]["Tables"]["profiles"]["Row"];
export type Notebooks = Database["public"]["Tables"]["notebooks"]["Row"];
export type Notes = Database["public"]["Tables"]["notes"]["Row"]; 