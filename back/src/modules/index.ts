// Modules exports - index.ts
// export * as configurator from "./configurator";
export * as authentication from "./authentication";

import {
  AuthenticationController,
  AuthenticationService,
} from "./authentication";
// import { ConfiguratorController, ConfiguratorService } from "./configurator";

const controllers = {
  authentication: AuthenticationController,
  // configurator: ConfiguratorController,
};

const services = {
  authentication: AuthenticationService,
  // configurator: ConfiguratorService,
};

const modules = {
  controllers,
  services,
}

export { modules, controllers, services };
