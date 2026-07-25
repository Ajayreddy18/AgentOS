export interface Organization {
  id: string;

  name: string;

  slug: string;

  description: string | null;

  ownerId: string;

  createdAt: string;

  updatedAt: string;
}
