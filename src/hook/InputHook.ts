import { ChangeEvent, useState } from 'react';

const InputHook = (
  initialValue: string
): [
  {
    value: string;
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
  },
  () => void
] => {
  const [value, setValue] = useState<string>(initialValue);
  return [
    {
      value,
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setValue(event.target!.value),
    },
    () => setValue(initialValue),
  ];
};
export default InputHook;
