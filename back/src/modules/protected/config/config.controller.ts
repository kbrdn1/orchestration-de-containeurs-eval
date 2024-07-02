// Controller for configs - config.controller.ts
import DefaultCRUDController from "@/components/DefaultCRUDController";
import service from "./config.service";

class ConfigController extends DefaultCRUDController {
  constructor() {
    super("/config", service, true);
  }
}

export default new ConfigController();
