import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Select,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import FloatingInput, {
  InputConfig,
  isValidExpression,
} from '../../../shared/components/FloatingInput';
import { useFetch } from '../../../shared/hooks/useFetch';
import { NewRepair } from '../../helpers/types';
import { AddCategoryModal } from './AddCategoryModal';
import { AddManuFacturersModal } from './addManuFacturersModal';

type Props = {
  newRepair: NewRepair;
  setNewRepair: React.Dispatch<React.SetStateAction<NewRepair>>;
  token: string;
};

export type ProductFormError = Record<string, boolean>;

export const initialFormError = {
  cuit_fabricante: false,
  id_categoria: false,
  modelo: false,
  numero_serie: false,
};

export type DataCategorias = {
  id_categoria: string;
  nombre_categoria: string;
};

export type DataFabricantes = {
  cuit: string;
  nombre_comercial: string;
};

export type DataCategoriasFabricantes = {
  nombre_categoria: string;
  nombre_comercial: string;
};

type ProductFormConfig = {
  [key: string]: InputConfig;
  cuit_fabricante: InputConfig;
  id_categoria: InputConfig;
  modelo: InputConfig;
  numero_serie: InputConfig;
};

const productFormConfig: ProductFormConfig = {
  cuit_fabricante: {
    label: 'Fabricante',
    name: 'cuit_fabricante',
    type: 'string',
    min: 1,
    max: 30,
    isRequired: true,
    isReadOnly: false,
  },
  id_categoria: {
    label: 'Categoria',
    name: 'id_categoria',
    type: 'string',
    min: 1,
    max: 30,
    isRequired: true,
    isReadOnly: false,
  },
  modelo: {
    label: 'Modelo',
    name: 'modelo',
    type: 'string',
    min: 1,
    max: 40,
    isRequired: true,
    isReadOnly: false,
  },
  numero_serie: {
    label: 'Numero De Serie',
    name: 'numero_serie',
    type: 'string',
    min: 1,
    max: 40,
    isRequired: true,
    isReadOnly: false,
  },
};

const initialProductForm = {
  cuit_fabricante: '',
  id_categoria: '',
  modelo: '',
  numero_serie: '',
};

export default function AddProduct(props: Props) {
  const [formError, setFormError] = useState<ProductFormError>(initialFormError);
  const [urlCategorias, setUrlCategorias] = useState('http://localhost/reparaciones/categorias');
  const [urlFabricantes, setUrlFabricantes] = useState('http://localhost/reparaciones/fabricantes');
  const [urlCategoriasFabricantes, setUrlCategoriasFabricantes] = useState(
    'http://localhost/reparaciones/categorias_fabricantes',
  );

  const {
    loading: loadingCat,
    error: errorCat,
    data: categorias,
  } = useFetch<DataCategorias[]>(urlCategorias);

  const {
    loading: loadingFab,
    error: errorFab,
    data: fabricantes,
  } = useFetch<DataFabricantes[]>(urlFabricantes);

  const {
    loading: loadingCatFab,
    error: errorCatFab,
    data: categoriasFabricantes,
  } = useFetch<DataCategoriasFabricantes[]>(urlCategoriasFabricantes);

  const handleCategoriasChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (categorias) {
      const cat =
        categorias.find((item) => item.id_categoria === e.target.value)?.nombre_categoria || '';
      props.setNewRepair((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
          nombre_categoria: cat,
        };
      });
    }
  };

  const handleFabricantesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (fabricantes) {
      const fab = fabricantes.find((item) => item.cuit === e.target.value)?.nombre_comercial || '';

      props.setNewRepair((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
          nombre_comercial: fab,
        };
      });
    }
  };

  const handleVolver = () => {
    props.setNewRepair((prev) => {
      return {
        ...prev,
        step: '0',
      };
    });
  };

  const handleGuardar = () => {
    let isValid = true;

    for (const key in productFormConfig) {
      if (productFormConfig[key].isRequired) {
        const isValidExp = isValidExpression(
          props.newRepair[key],
          productFormConfig[key].type,
          productFormConfig[key].min,
          productFormConfig[key].max,
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
      props.setNewRepair((prev) => {
        return {
          ...prev,
          step: '2',
        };
      });
    }
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLSelectElement, Element>) => {
    if (productFormConfig[e.target.name].isRequired) {
      const isValid = isValidExpression(
        e.target.value,
        productFormConfig[e.target.name].type,
        productFormConfig[e.target.name].min,
        productFormConfig[e.target.name].max,
      );
      if (!isValid) {
        setFormError((last) => {
          return {
            ...last,
            [productFormConfig[e.target.name].name]: true,
          };
        });
      }
    }
  };

  const handleOnFocus = (e: React.FocusEvent<HTMLSelectElement, Element>) => {
    if (productFormConfig[e.target.name].isRequired) {
      setFormError((last) => {
        return {
          ...last,
          [productFormConfig[e.target.name].name]: false,
        };
      });
    }
  };

  const borderColor = useColorModeValue('black !important', 'white !important');
  const categoryDisclosure = useDisclosure();
  const manuFacturersDisclosure = useDisclosure();
  return (
    <>
      <Grid
        templateColumns="1fr 1fr"
        columnGap="50px"
        rowGap="10px"
        m="10px 150px"
        justifyContent="center"
      >
        <Flex>
          <FormControl
            variant="floating"
            minH="60px"
            mt="20px"
            isRequired
            isInvalid={formError.cuit_fabricante}
          >
            <Select
              placeholder="Elegir Fabricante..."
              name="cuit_fabricante"
              onBlur={handleOnBlur}
              onFocus={handleOnFocus}
              onChange={handleFabricantesChange}
              value={props.newRepair.cuit_fabricante}
              borderRadius="8px 0 0 8px"
            >
              {fabricantes &&
                fabricantes
                  .filter((item) => {
                    let exists = false;
                    categoriasFabricantes?.forEach((cf) => {
                      if (
                        cf.nombre_comercial === item.nombre_comercial &&
                        cf.nombre_categoria.includes(props.newRepair.nombre_categoria)
                      ) {
                        exists = true;
                      }
                    });
                    return exists;
                  })
                  .map((item) => (
                    <option style={{ background: '#111' }} value={item.cuit} key={item.cuit}>
                      {item.nombre_comercial.toUpperCase()}
                    </option>
                  ))}
            </Select>
            <FormLabel alignSelf="center" textAlign="end" mb="0">
              Fabricante
            </FormLabel>
            {formError.cuit_fabricante ? (
              <FormErrorMessage m="0" h="20px" textAlign="start">
                * Campo obligatorio
              </FormErrorMessage>
            ) : (
              productFormConfig.cuit_fabricante.isRequired && (
                <FormHelperText m="0" h="20px" textAlign="start">
                  * Campo obligatorio
                </FormHelperText>
              )
            )}
          </FormControl>
          <Tooltip hasArrow label="Agregar un nuevo Fabrincate a la lista" placement="top">
            <IconButton
              alignSelf="center"
              borderRadius="0 8px 8px 0"
              aria-label="Add to friends"
              icon={<AddIcon />}
              onClick={manuFacturersDisclosure.onOpen}
            />
          </Tooltip>
        </Flex>
        <Flex>
          <FormControl
            variant="floating"
            minH="60px"
            mt="20px"
            isRequired
            isInvalid={formError.id_categoria}
          >
            <Select
              placeholder="Elegir Categoria..."
              name="id_categoria"
              onBlur={handleOnBlur}
              onFocus={handleOnFocus}
              onChange={handleCategoriasChange}
              value={props.newRepair.id_categoria}
              borderRadius="8px 0 0 8px"
            >
              {categorias &&
                categorias
                  .filter((item) => {
                    let exists = false;
                    categoriasFabricantes?.forEach((cf) => {
                      if (
                        cf.nombre_categoria === item.nombre_categoria &&
                        cf.nombre_comercial.includes(props.newRepair.nombre_comercial)
                      ) {
                        exists = true;
                      }
                    });
                    return exists;
                  })
                  .map((item) => (
                    <option
                      style={{ background: '#111' }}
                      value={item.id_categoria}
                      key={item.id_categoria}
                    >
                      {item.nombre_categoria.toUpperCase()}
                    </option>
                  ))}
            </Select>{' '}
            <FormLabel alignSelf="center" textAlign="end" mb="0">
              Categoria:
            </FormLabel>
            {formError.id_categoria ? (
              <FormErrorMessage m="0" h="20px" textAlign="start">
                * Campo obligatorio
              </FormErrorMessage>
            ) : (
              productFormConfig.id_categoria.isRequired && (
                <FormHelperText m="0" h="20px" textAlign="start">
                  * Campo obligatorio
                </FormHelperText>
              )
            )}
          </FormControl>
          <Tooltip hasArrow label="Agregar una nueva Categoria a la lista" placement="top">
            <IconButton
              alignSelf="center"
              borderRadius="0 8px 8px 0"
              aria-label="Add to friends"
              icon={<AddIcon />}
              onClick={categoryDisclosure.onOpen}
            />
          </Tooltip>
        </Flex>
        <FloatingInput
          inputConfig={productFormConfig.modelo}
          formError={formError}
          setFormError={setFormError}
          newRepair={props.newRepair}
          setNewRepair={props.setNewRepair}
        />
        <FloatingInput
          inputConfig={productFormConfig.numero_serie}
          formError={formError}
          setFormError={setFormError}
          newRepair={props.newRepair}
          setNewRepair={props.setNewRepair}
        />
      </Grid>
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
          Siguiente
        </Button>
      </Flex>
      {fabricantes && (
        <AddCategoryModal
          disclosure={categoryDisclosure}
          token={props.token}
          fabricantes={fabricantes}
          setUrlCategorias={setUrlCategorias}
          setUrlCategoriasFabricantes={setUrlCategoriasFabricantes}
        />
      )}
      {categorias && (
        <AddManuFacturersModal
          disclosure={manuFacturersDisclosure}
          token={props.token}
          categorias={categorias}
          setUrlFabricantes={setUrlFabricantes}
          setUrlCategoriasFabricantes={setUrlCategoriasFabricantes}
        />
      )}
    </>
  );
}
