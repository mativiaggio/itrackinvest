export interface Users {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  user_id?: string;
  name?: string;
  email?: string;
  birthdate?: string;
  bio?: string;
}

export interface Tickets {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  title?: string;
  description?: string;
  users?: Users;
  solution?: string;
  status?: "open" | "in-progress" | "solved" | "closed" | "under-review";
}

export interface UsersApiResponse {
  users: {
    documents: Users[];
  };
}

export interface TicketsApiResponse {
  tickets: {
    documents: Tickets[];
  };
}
