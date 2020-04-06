import Vue from "vue";

export const notifyErrors = (errors: string[]): void => {
  Vue.notify({
    type: "error",
    title: "Error occurred",
    text: errors.join("<br />")
  });
};

export const notifySuccess = (message: string): void => {
  Vue.notify({
    type: "success",
    text: message
  });
};

export const notifyWarn = (message: string): void => {
  Vue.notify({
    type: "warn",
    text: message
  });
};
