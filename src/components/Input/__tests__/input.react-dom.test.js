import * as React from "react";
import ReactDOM from "react-dom";
import { Input } from "../";

test("it renders without crashing", () => {
  const containerDiv = document.createElement("div");
  ReactDOM.render(<Input />, containerDiv);
});

test("it renders the label properly", () => {
  const containerDiv = document.createElement("div");
  const label = "Examplelabel";
  ReactDOM.render(<Input label={label} />, containerDiv);
  expect(containerDiv.getElementsByTagName("label")[0].textContent).toBe(label);
});

test("it initializes with a defaultValue", () => {
  const containerDiv = document.createElement("div");
  const defaultValue = "DefaultValue";
  ReactDOM.render(<Input initialValue={defaultValue} />, containerDiv);
  expect(containerDiv.getElementsByTagName("input")[0].value).toBe(
    defaultValue
  );
});

test("it displays a placeholder ", () => {
  const containerDiv = document.createElement("div");
  const placeholder = "Placeholder";
  ReactDOM.render(<Input placeholder={placeholder} />, containerDiv);
  expect(containerDiv.getElementsByTagName("input")[0].placeholder).toBe(
    placeholder
  );
});

/*test("it triggers a callback onChange", () => {
  const containerDiv = document.createElement("div");
  const onChangeMock = jest.fn();
  ReactDOM.render(<Input onChange={onChangeMock} />, containerDiv);
  setNativeValue(containerDiv.getElementsByTagName("input")[0], "test");
  const event = new Event("change", { bubbles: true });
  containerDiv.getElementsByTagName("input")[0].dispatchEvent(event);

  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith("test");
  e;
});

test("it submits the value onEnter", () => {
  const onSubmitMock = jest.fn();
  const wrapper = mount(
    <Input initialValue="InitialValue" onSubmit={onSubmitMock} />
  );

  wrapper.find("input").simulate("keyDown", { keyCode: 13 });
  expect(onSubmitMock).toHaveBeenCalledTimes(1);
  expect(onSubmitMock).toHaveBeenCalledWith("InitialValue");
});*/

function setNativeValue(element, value) {
  const valueSetter = Object.getOwnPropertyDescriptor(element, "value").set;
  const prototype = Object.getPrototypeOf(element);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(
    prototype,
    "value"
  ).set;

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value);
  } else {
    valueSetter.call(element, value);
  }
}
