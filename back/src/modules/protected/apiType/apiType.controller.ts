// Controller for  api types - apiType.controller.ts
import DefaultCRUDController from "@/components/DefaultCRUDController";
import service from "./apiType.service";

class ApiTypeController extends DefaultCRUDController {
  constructor() {
    super("/api-types", service, true);
  }
}

export default new ApiTypeController();
