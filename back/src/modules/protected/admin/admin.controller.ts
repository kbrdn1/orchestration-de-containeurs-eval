// Controller for admin - admin.controller.ts
import DefaultCRUDController from "@/components/DefaultCRUDController";
import service from "./admin.service";

class AdminController extends DefaultCRUDController {
  constructor() {
    super("/admin", service, true);
  }
}

export default new AdminController();
