import * as React from "react";
import { mount } from "enzyme";
import { Input } from "../";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

test("it renders without crashing", () => {
  const wrapper = mount(<Input />);
});

test("it renders the label properly", () => {
  const label = "Testlabel";
  const wrapper = mount(<Input label={label} />);
  const renderedLabel = wrapper.find("label").first();
  expect(renderedLabel.text()).toBe(label);
});

test("it initializes with a defaultValue", () => {
  const defaultValue = "DefaultValue";
  const wrapper = mount(<Input initialValue={defaultValue} />);
  const input = wrapper.find("input");

  expect(input.instance().value).toBe(defaultValue);
});

test("it displays a placeholder", () => {
  const placeholder = "Placeholder";
  const wrapper = mount(<Input placeholder={placeholder} />);
  const input = wrapper.find("input");

  expect(input.instance().placeholder).toBe(placeholder);
});

test("it triggers a callback onChange", () => {
  const onChangeMock = jest.fn();
  const wrapper = mount(<Input onChange={onChangeMock} />);

  wrapper.find("input").simulate("change", {
    target: { value: "hello" }
  });
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith("hello");
});

test("it triggers a callback onChange with controlled value", () => {
  const onChangeMock = jest.fn();
  const wrapper = mount(<Input onChange={onChangeMock} value="controlled" />);

  wrapper.find("input").simulate("change", {
    target: { value: "hello" }
  });
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith("hello");
});

test("it submits the value onEnter", () => {
  const onSubmitMock = jest.fn();
  const wrapper = mount(
    <Input initialValue="InitialValue" onSubmit={onSubmitMock} />
  );

  wrapper.find("input").simulate("keyDown", { keyCode: 13 });
  expect(onSubmitMock).toHaveBeenCalledTimes(1);
  expect(onSubmitMock).toHaveBeenCalledWith("InitialValue");
});
