import { TextArea, TextField } from "@radix-ui/themes";
import type { TextAreaProps } from "@radix-ui/themes/dist/cjs/index.js";
import { Form } from "radix-ui";
import type { ReactNode } from "react";
import useInvoiceStore from "~/store";

type SettingsInputProps = TextAreaProps & {
  defaultValue: string | undefined;
  label: string;
  icon: ReactNode;
  path: string;
};

export default function SettingsArea(props: SettingsInputProps) {
  const invoice = useInvoiceStore();
  return (
    <Form.Field key={props.path} className="FormField" name={props.path}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Form.Label className="hidden">{props.label}</Form.Label>
        <Form.Message className="FormMessage" match="valueMissing">
          Enter value
        </Form.Message>
        <Form.Message className="FormMessage" match="typeMismatch">
          Invalid value
        </Form.Message>
      </div>
      <Form.Control asChild>
        <TextArea
          {...props}
          size={"3"}
          className="!min-h-36"
          key={props.path}
          name={props.path}
          placeholder={props.label}
          defaultValue={props.defaultValue}
          data-settings-field={true}
          onInput={(event) => {
            console.log(props.path, event.target.value);
            invoice.setFieldByPath(props.path, event.target.value);
          }}
        />
      </Form.Control>
    </Form.Field>
  );
}
