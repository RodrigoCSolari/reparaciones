import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  ListItem,
  Text,
  UnorderedList,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useFetch } from '../../../shared/hooks/useFetch';
import { NewRepair } from '../../helpers/types';

type Props = {
  newRepair: NewRepair;
  setNewRepair: React.Dispatch<React.SetStateAction<NewRepair>>;
};

export type DataRepuestos = {
  id_repuesto: string;
  nombre: string;
};

export type RepuestosReparacion = {
  id_repuesto: string;
  nombre: string;
  cantidad: number;
};

export default function AddSpares(props: Props) {
  const {
    loading: loadingRep,
    error: errorRep,
    data: repuestos,
  } = useFetch<DataRepuestos[]>('http://localhost/reparaciones/repuestos');
  const [autoCompleteArray, setAutoCompleteArray] = useState<DataRepuestos[]>([]);
  const [indexAutoComplete, setIndexAutoComplete] = useState(0);
  const [spares, setSpares] = useState<RepuestosReparacion[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //const checkInputResponse = checkInput(e.target.value);
    setAutoCompleteArray(
      (repuestos || [])
        .filter((item) => item.nombre.trim().toUpperCase().includes(e.target.value.toUpperCase()))
        .filter((item, i) => i < 5),
    );
    setInputValue(e.target.value);
    setIndexAutoComplete(0);
  };

  const selectOptionAutoComplete = (key: string) => {
    switch (key) {
      case 'ArrowUp':
        if (indexAutoComplete === 0) {
          setIndexAutoComplete(autoCompleteArray.length - 1);
        } else {
          setIndexAutoComplete(indexAutoComplete - 1);
        }
        break;
      case 'ArrowDown':
        if (indexAutoComplete === autoCompleteArray.length - 1) {
          setIndexAutoComplete(0);
        } else {
          setIndexAutoComplete(indexAutoComplete + 1);
        }
        break;
      case 'Enter':
        if (autoCompleteArray.length) {
          handleListClick(indexAutoComplete);
        }
        break;
      default:
        break;
    }
  };

  const handleListClick = (index: number) => {
    const spareIndex = spares.findIndex(
      (s) => autoCompleteArray[index].id_repuesto === s.id_repuesto,
    );

    const newSpares = [...spares];
    const newElement = {
      id_repuesto: autoCompleteArray[index].id_repuesto,
      nombre: autoCompleteArray[index].nombre,
      cantidad: 1,
    };
    if (spareIndex !== -1) {
      const deletedElement = newSpares.splice(spareIndex, 1);
      newElement.cantidad += deletedElement[0].cantidad;
    }
    setSpares([newElement, ...newSpares]);

    setInputValue('');
  };

  const handleQuantityButton = (spareId: string, spareQuantity: number) => {
    if (spareQuantity > 0 && spareQuantity < 100) {
      const spareIndex = spares.findIndex((s) => spareId === s.id_repuesto);

      const newSpares = [...spares];
      newSpares[spareIndex].cantidad = spareQuantity;

      setSpares(newSpares);
    }
  };

  const handleDel = (spareId: string) => {
    const spareIndex = spares.findIndex((s) => spareId === s.id_repuesto);

    const newSpares = [...spares];
    const deletedElement = newSpares.splice(spareIndex, 1);

    setSpares(newSpares);
  };

  const handleQuantityInput = (spareId: string) => {
    console.log('first');
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    props.setNewRepair((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleVolver = () => {
    props.setNewRepair((prev) => {
      return {
        ...prev,
        step: '2',
      };
    });
  };

  const handleGuardar = () => {
    props.setNewRepair((prev) => {
      return {
        ...prev,
        step: '2',
      };
    });
  };

  const borderColor = useColorModeValue('black !important', 'white !important');

  const [inputValue, setInputValue] = useState('');
  return (
    <>
      <Flex justifyContent="space-between" minH="220px">
        <Box
          alignSelf="start"
          border={useColorModeValue('2px #0004 solid', '2px #E4E4E49A solid')}
          borderRadius="8px"
          w={{ sm: 250, md: 300, lg: 400 }}
        >
          <Input
            aria-label="Swap input field"
            borderRadius="full"
            border="0px"
            w={{ sm: 350, md: 400, lg: 450 }}
            //bg={useColorModeValue('#fff0', '#3D639D')}
            placeholder='EJ: "ALAMBRE P/SOLDAR MIG 0,80"'
            _placeholder={{ color: '#B4B4B4' }}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(e) => selectOptionAutoComplete(e.key)}
            _focus={{ border: '0px' }}
          />
          {inputValue.trim() && (
            <div data-testid="suggestion-list">
              <hr />
              <UnorderedList listStyleType={'none'} m={0} pb="15px">
                {autoCompleteArray.map((element, i) => (
                  <ListItem
                    key={element.id_repuesto}
                    value={i}
                    h="30px"
                    onClick={(e) => handleListClick(e.currentTarget.value)}
                    cursor="pointer"
                    _hover={{ background: '#228ECF' }}
                    bg={i === indexAutoComplete ? '#228ECF' : 'transparent'}
                  >
                    <Flex justifyContent="space-between">
                      <Text p="0px 16px">{element.nombre}</Text>
                      {i === indexAutoComplete && (
                        <Flex
                          flexDirection="column"
                          mr="5px"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Text my="0" fontSize="10px">
                            Presiona Enter para
                          </Text>
                          <Text my="0" fontSize="10px">
                            Agregar el Repuesto
                          </Text>
                        </Flex>
                      )}
                    </Flex>
                  </ListItem>
                ))}
              </UnorderedList>
            </div>
          )}
          {inputValue && autoCompleteArray.length === 0 && (
            <Text p="10px 16px">Ningun repuesto contiene el texto ingresado: "{inputValue}"</Text>
          )}
        </Box>

        <Box
          w={{ sm: 450, md: 500, lg: 520 }}
          border="8px solid #fff4"
          borderRadius="8px"
          alignSelf="start"
        >
          <Grid
            templateColumns="9fr 5fr 2.5fr"
            gap="5px"
            m="5px"
            bgGradient={useColorModeValue(
              'linear-gradient(225deg, #0003 3.26%, #0005 100%)',
              'linear-gradient(0deg, #0002 3.26%, #0005 100%)',
            )}
          >
            <Flex w="100%" bg="whiteAlpha.200" justifyContent="center" alignItems="center">
              <Text fontWeight="bolder">REPUESTO</Text>
            </Flex>
            <Flex w="100%" bg="whiteAlpha.200" justifyContent="center" alignItems="center">
              <Text fontWeight="bolder">CANTIDAD</Text>
            </Flex>
            <Flex w="100%" bg="whiteAlpha.200" justifyContent="center" alignItems="center">
              <Text fontWeight="bolder">BORRAR</Text>
            </Flex>
          </Grid>
          {spares.map((spare) => {
            return (
              <Grid
                templateColumns="9fr 5fr 2.5fr"
                gap="5px"
                m="5px"
                bgGradient={useColorModeValue(
                  'linear-gradient(225deg, #0003 3.26%, #0005 100%)',
                  'linear-gradient(0deg, #0002 3.26%, #0005 100%)',
                )}
              >
                <Flex w="100%" bg="whiteAlpha.200" justifyContent="start" alignItems="center">
                  <Text ml="10px" fontSize="0.75em" fontWeight="bolder">
                    {spare.nombre}
                  </Text>
                </Flex>
                <Grid templateColumns="0.7fr 1fr 0.7fr" gap="5px">
                  <Button
                    px="5px"
                    h="24px"
                    onClick={() => handleQuantityButton(spare.id_repuesto, spare.cantidad - 1)}
                  >
                    -
                  </Button>
                  <Input
                    value={spare.cantidad}
                    onChange={() => handleQuantityInput(spare.id_repuesto)}
                    h="24px"
                    textAlign="center"
                  ></Input>
                  <Button
                    px="5px"
                    h="24px"
                    onClick={() => handleQuantityButton(spare.id_repuesto, spare.cantidad + 1)}
                  >
                    +
                  </Button>
                </Grid>
                <Button color="red" h="24px" onClick={() => handleDel(spare.id_repuesto)}>
                  X
                </Button>
              </Grid>
            );
          })}
        </Box>
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
          Volver
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
    </>
  );
}
