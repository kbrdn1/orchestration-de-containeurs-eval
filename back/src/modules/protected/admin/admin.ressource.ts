// Ressource for admin - admin.ressource.ts
import { Admin } from "@/types/models";

const adminRessource = (admin: any): Admin => {
  return {
    id: admin.id,
    email: admin.email,
  };
};

export default adminRessource;
