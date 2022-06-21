import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ClientFormError } from '../../AtencionAlCliente/components/AddRepair/AddClient/AddClientForm';
import { DniFormError } from '../../AtencionAlCliente/components/AddRepair/AddClient/SearchClient';
import { NewRepair } from '../../AtencionAlCliente/helpers/types';

export const isValidExpression = (input: string, type: string, min: number, max: number) => {
  let regex: RegExp;
  switch (type) {
    case 'string':
      regex = new RegExp(`.{${min},${max}}`);
      break;
    case 'number':
      regex = new RegExp(`\\d{${min},${max}}`);
      break;
    case 'email':
      regex =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      break;
    default:
      regex = new RegExp(`\\.{${min},${max}}`);
      break;
  }
  const resp = regex.exec(input);

  return resp && resp[0] === resp.input;
};

export type InputConfig = {
  label: string;
  name: string;
  type: string;
  min: number;
  max: number;
  isRequired: boolean;
  isReadOnly: boolean;
};

type Props = {
  inputConfig: InputConfig;
  formError: Record<string, boolean>;
  setFormError: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  form: Record<string, string>;
  setForm: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export default function FloatingInputGeneric(props: Props) {
  const [helperMessage, setHelperMessage] = useState(
    props.inputConfig.isRequired ? '* Campo obligatorio' : '',
  );

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > props.inputConfig.max) {
      return;
    }
    props.setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });

    if (props.inputConfig.isRequired) {
      handleErrorAndHelper(e.target.value);
    }
  };

  const handleErrorAndHelper = (input: string) => {
    let msg = '* Campo obligatorio';
    if (!input.trim()) {
      setHelperMessage(msg);
      return;
    }

    const isValid = isValidExpression(
      input,
      props.inputConfig.type,
      props.inputConfig.min,
      props.inputConfig.max,
    );

    if (!isValid) {
      switch (props.inputConfig.type) {
        case 'string':
          if (props.inputConfig.min === 1) {
            msg = `* Campo obligatorio (maximo ${props.inputConfig.max} caracteres)`;
          } else {
            msg = `* Campo obligatorio (entre ${props.inputConfig.min} y ${props.inputConfig.max} caracteres)`;
          }
          break;
        case 'number':
          if (props.inputConfig.min === 1) {
            msg = `* Campo obligatorio (maximo ${props.inputConfig.max} digitos)`;
          } else {
            msg = `* Campo obligatorio (entre ${props.inputConfig.min} y ${props.inputConfig.max} digitos)`;
          }
          break;
        case 'email':
          msg = '* El email no posee un formato valido';
          break;
        default:
          break;
      }
    }
    setHelperMessage(msg);
    return isValid;
  };

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.inputConfig.isRequired) {
      const isValid = isValidExpression(
        e.target.value,
        props.inputConfig.type,
        props.inputConfig.min,
        props.inputConfig.max,
      );
      if (!isValid) {
        props.setFormError((last) => {
          return {
            ...last,
            [props.inputConfig.name]: true,
          };
        });
      }
    }
  };

  const handleOnFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.inputConfig.isRequired) {
      props.setFormError((last) => {
        return {
          ...last,
          [props.inputConfig.name]: false,
        };
      });
    }
  };

  return (
    <FormControl
      variant="floating"
      minH="60px"
      mt="25px"
      isRequired={props.inputConfig.isRequired}
      isInvalid={props.formError[props.inputConfig.name]}
    >
      <Input
        disabled={props.inputConfig.isReadOnly}
        placeholder=" "
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        onChange={handleFormChange}
        value={props.form[props.inputConfig.name]}
        name={props.inputConfig.name}
        autoComplete="off"
        justifySelf="stretch"
        type="text"
      />
      <FormLabel mb="0">{props.inputConfig.label}</FormLabel>
      {!props.inputConfig.isReadOnly && props.formError[props.inputConfig.name] ? (
        <FormErrorMessage m="0" textAlign="start">
          {helperMessage}
        </FormErrorMessage>
      ) : (
        !props.inputConfig.isReadOnly &&
        props.inputConfig.isRequired && (
          <FormHelperText m="0" textAlign="start">
            {helperMessage}
          </FormHelperText>
        )
      )}
    </FormControl>
  );
}
