import React from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';

export interface NumericInputProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { value: string; name: string } }) => void;
}

const NumericInput = (props: NumericInputProps & NumberFormatProps) => {
  const { inputRef, name, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
            name: name!
          }
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
    />
  );
};

export default NumericInput;
