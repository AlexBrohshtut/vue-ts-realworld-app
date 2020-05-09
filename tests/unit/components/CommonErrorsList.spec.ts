import { mount } from "@vue/test-utils";

import Component from "@/components/CommonErrorsList.vue";

describe("Common errors list component", () => {
  test("Should render errors", () => {
    const errors = ["error 1", "error 2"];
    const wrapper = mount(Component, {
      propsData: {
        errors
      }
    });
    expect(
      wrapper
        .findAll("li")
        .at(0)
        .text()
    ).toBe("error 1");
    expect(
      wrapper
        .findAll("li")
        .at(1)
        .text()
    ).toBe("error 2");
  });
});
