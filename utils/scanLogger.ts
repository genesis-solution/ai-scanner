import { appConfig } from "../configs/config";

const isDevelopment = appConfig.isEmulatorMode;

const log = (message: string, ...optParams: any) => {
  if (isDevelopment) {
    console.log(message, ...optParams);
  }
};

const error = (message: string, ...optParams: any) => {
  //-- error messages should be showing
  console.error(message, ...optParams);
};

const warn = (message: string, ...optParams: any) => {
  if (isDevelopment) {
    console.warn(message, ...optParams);
  }
};

const info = (message: string, ...optParams: any) => {
  if (isDevelopment) {
    console.info(message, ...optParams);
  }
};

const debug = (message: string, ...optParams: any) => {
  if (isDevelopment) {
    console.debug(message, ...optParams);
  }
};

export default { log, error, warn, info, debug };
