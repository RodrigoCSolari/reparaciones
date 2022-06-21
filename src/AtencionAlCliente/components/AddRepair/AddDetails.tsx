import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Session } from '../../../Navigation';
import { InputConfig, isValidExpression } from '../../../shared/components/FloatingInput';
import { ClientData, ClientForm, NewRepair } from '../../helpers/types';
import { ConfirmRepairAlert } from './ConfirmRepairAlert';

type Props = {
  session: Session;
  clientData: ClientData;
  setClientData: React.Dispatch<React.SetStateAction<ClientData>>;
  newRepair: NewRepair;
  setNewRepair: React.Dispatch<React.SetStateAction<NewRepair>>;
};

export type DetailsFormError = Record<string, boolean>;

export const initialFormError = {
  garantia: false,
  desperfecto: false,
};

type DetailsFormConfig = {
  [key: string]: InputConfig;
  garantia: InputConfig;
  desperfecto: InputConfig;
};

const detailsFormConfig: DetailsFormConfig = {
  garantia: {
    label: 'Garantia',
    name: 'garantia',
    type: 'string',
    min: 2,
    max: 2,
    isRequired: true,
    isReadOnly: false,
  },
  desperfecto: {
    label: 'Desperfecto',
    name: 'desperfecto',
    type: 'string',
    min: 1,
    max: 200,
    isRequired: true,
    isReadOnly: false,
  },
};

const initialDetailsForm = {
  garantia: '',
  desperfecto: '',
};

export default function AddDetails(props: Props) {
  const [formError, setFormError] = useState<DetailsFormError>(initialFormError);

  const confirmRepairDisclosure = useDisclosure();

  const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > detailsFormConfig.desperfecto.max) {
      return;
    }
    props.setNewRepair((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleRadioChange = (value: string) => {
    props.setNewRepair((prev) => {
      return {
        ...prev,
        garantia: value,
      };
    });

    if (detailsFormConfig.garantia.isRequired) {
      setFormError((last) => {
        return {
          ...last,
          [detailsFormConfig.garantia.name]: false,
        };
      });
    }
  };

  const handleVolver = () => {
    props.setNewRepair((prev) => {
      return {
        ...prev,
        step: '1',
      };
    });
  };

  const handleGuardar = () => {
    let isValid = true;

    for (const key in detailsFormConfig) {
      if (detailsFormConfig[key].isRequired) {
        const isValidExp = isValidExpression(
          props.newRepair[key],
          detailsFormConfig[key].type,
          detailsFormConfig[key].min,
          detailsFormConfig[key].max,
        );
        if (!isValidExp) {
          setFormError((last) => {
            return {
              ...last,
              [key]: true,
            };
          });
          isValid = false;
        }
      }
    }
    if (isValid) {
      confirmRepairDisclosure.onOpen();
    }
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    if (detailsFormConfig[e.target.name].isRequired) {
      const isValid = isValidExpression(
        e.target.value,
        detailsFormConfig[e.target.name].type,
        detailsFormConfig[e.target.name].min,
        detailsFormConfig[e.target.name].max,
      );
      if (!isValid) {
        setFormError((last) => {
          return {
            ...last,
            [detailsFormConfig[e.target.name].name]: true,
          };
        });
      }
    }
    console.log(formError);
  };

  const handleOnFocus = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    if (detailsFormConfig[e.target.name].isRequired) {
      setFormError((last) => {
        return {
          ...last,
          [detailsFormConfig[e.target.name].name]: false,
        };
      });
    }
  };

  const borderColor = useColorModeValue('black !important', 'white !important');
  return (
    <>
      <Flex mb="10px" flexDirection="column" justifyContent="center">
        <Flex mb="10px" justifyContent="center">
          <FormControl minH="60px" mt="5px" isRequired isInvalid={formError.garantia}>
            <FormLabel alignSelf="center" textAlign="center" m="5px" fontSize="0.85em">
              Esta en Garantia?
            </FormLabel>
            <RadioGroup
              name="garantia"
              onChange={handleRadioChange}
              value={props.newRepair.garantia}
              margin="5px"
            >
              <Stack direction="row" justifyContent="center">
                <Radio value="si">Si</Radio>
                <Radio value="no">No</Radio>
              </Stack>
            </RadioGroup>
            {formError.garantia ? (
              <FormErrorMessage m="0" justifyContent="center">
                * Campo obligatorio
              </FormErrorMessage>
            ) : (
              detailsFormConfig.garantia && (
                <FormHelperText m="0" justifyContent="center">
                  * Campo obligatorio
                </FormHelperText>
              )
            )}
          </FormControl>
        </Flex>
        <FormControl minH="60px" mt="5px" isRequired isInvalid={formError.desperfecto}>
          <FormLabel alignSelf="center" textAlign="start" ml="5px" fontSize="0.85em">
            Detalles del Desperfecto
          </FormLabel>
          <Textarea
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            onChange={handleFormChange}
            name="desperfecto"
            value={props.newRepair.desperfecto}
            placeholder="Detalles..."
            type="text"
          />
          {formError.desperfecto ? (
            <FormErrorMessage m="0" justifyContent="center">
              * Campo obligatorio
            </FormErrorMessage>
          ) : (
            detailsFormConfig.desperfecto && (
              <FormHelperText m="0" justifyContent="center">
                * Campo obligatorio
              </FormHelperText>
            )
          )}
        </FormControl>
      </Flex>
      <Flex justifyContent="center">
        <Button
          w="120px"
          my="10px"
          mt={4}
          colorScheme="red"
          type="submit"
          fontSize="1.1em"
          fontWeight={700}
          onClick={handleVolver}
        >
          Atras
        </Button>
        <Button
          w="120px"
          ml="10px"
          mt={4}
          colorScheme="green"
          type="submit"
          fontSize="1.1em"
          fontWeight={700}
          onClick={handleGuardar}
        >
          Guardar
        </Button>
      </Flex>
      <ConfirmRepairAlert
        confirmRepairDisclosure={confirmRepairDisclosure}
        clientData={props.clientData}
        setClientData={props.setClientData}
        newRepair={props.newRepair}
        setNewRepair={props.setNewRepair}
        token={props.session.token}
      />
    </>
  );
}
