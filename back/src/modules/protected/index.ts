// Protected modules exports - index.ts
export * as admin from "./admin";
export * as apis from "./apis";
export * as apiType from "./apiType";
export * as config from "./config";
export * as users from "./users";
export * as websites from "./websites";

import { AdminController, AdminRessource, AdminService } from "./admin";
import { ApisController, ApisRessource, ApisService } from "./apis";
import { ApiTypeController, ApiTypeRessource, ApiTypeService } from "./apiType";

import { ConfigController, ConfigRessource, ConfigService } from "./config";
import { UsersController, UsersRessource, UsersService } from "./users";
import {
  WebsitesController,
  WebsitesRessource,
  WebsitesService,
} from "./websites";

const controllers = {
  admin: AdminController,
  apis: ApisController,
  apiTypes: ApiTypeController,
  config: ConfigController,
  users: UsersController,
  websites: WebsitesController,
};

const services = {
  admin: AdminService,
  apis: ApisService,
  apiTypes: ApiTypeService,
  config: ConfigService,
  users: UsersService,
  websites: WebsitesService,
};

const resources = {
  admin: AdminRessource,
  apis: ApisRessource,
  apiTypes: ApiTypeRessource,
  config: ConfigRessource,
  users: UsersRessource,
  websites: WebsitesRessource,
};

const modules = {
  controllers,
  services,
  resources,
}

export { modules, controllers, services, resources };