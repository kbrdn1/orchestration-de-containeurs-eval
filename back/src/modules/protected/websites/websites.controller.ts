// Controller for websites - websites.controller.ts
import DefaultCRUDController from "@/components/DefaultCRUDController";
import service from "./websites.service";

class WebsitesController extends DefaultCRUDController {
  constructor() {
    super("/websites", service, true);
  }
}

export default new WebsitesController();
