"use client";
import { InputText } from "primereact/inputtext";

interface IMainpageTableInput {
  value: any;
  editorCallback: (value: any) => void;
}

const MainpageTableInput = (options: IMainpageTableInput, id: string) => {
  return (
    <InputText
      type="text"
      value={options.value}
      onChange={(e) => options.editorCallback(e.target.value)}
      id={id}
    />
  );
};

export default MainpageTableInput;
