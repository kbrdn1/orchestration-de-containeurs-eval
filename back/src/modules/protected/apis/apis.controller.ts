// Controller for  apis - apis.controller.ts
import DefaultCRUDController from "@/components/DefaultCRUDController";
import service from "./apis.service";

class ApisController extends DefaultCRUDController {
  constructor() {
    super("/apis", service, true);
  }
}

export default new ApisController();
