import * as React from "react";
import { Input } from "../";
import { render, fireEvent, cleanup } from "react-testing-library";

afterEach(cleanup);

test("it renders without crashing", () => {
  const wrapper = render(<Input />);
});

test("it renders the label properly", () => {
  const label = "Testlabel";
  const { getByText } = render(<Input label={label} />);
  const renderedLabel = getByText(label);
  expect(renderedLabel.innerHTML).toBe(label);
});

test("it initializes with a defaultValue", () => {
  const defaultValue = "DefaultValue";
  const { getByLabelText } = render(
    <Input label={"Testlabel"} initialValue={defaultValue} />
  );

  expect(getByLabelText("Testlabel").value).toBe(defaultValue);
});

test("it displays a placeholder", () => {
  const placeholder = "Placeholder";
  const wrapper = render(<Input placeholder={placeholder} />);

  const { getByLabelText } = render(
    <Input label={"Testlabel"} placeholder={placeholder} />
  );
  const input = getByLabelText("Testlabel");

  expect(input.placeholder).toBe(placeholder);
});

test("it triggers a callback onChange", () => {
  const onChangeMock = jest.fn();
  const { getByLabelText } = render(
    <Input label={"Testlabel"} onChange={onChangeMock} />
  );

  const input = getByLabelText("Testlabel");

  fireEvent.change(input, {
    target: { value: "hello" }
  });

  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith("hello");
});

test("it triggers a callback onChange with controlled value", () => {
  const onChangeMock = jest.fn();
  const { getByLabelText } = render(
    <Input label={"Testlabel"} onChange={onChangeMock} value="controlled" />
  );

  const input = getByLabelText("Testlabel");

  fireEvent.change(input, {
    target: { value: "hello" }
  });

  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith("hello");
});

test("it submits the value onEnter", () => {
  const onSubmitMock = jest.fn();

  const { getByLabelText } = render(
    <Input
      label={"Testlabel"}
      initialValue="InitialValue"
      onSubmit={onSubmitMock}
    />
  );

  const input = getByLabelText("Testlabel");

  fireEvent.keyDown(input, {
    keyCode: 13
  });

  expect(onSubmitMock).toHaveBeenCalledTimes(1);
  expect(onSubmitMock).toHaveBeenCalledWith("InitialValue");
});
