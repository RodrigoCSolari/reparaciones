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
import { AddCategoryModal } from '../AddRepair/AddCategoryModal';
import { AddManuFacturersModal } from '../AddRepair/addManuFacturersModal';

type Props = {
  token: string;
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

export default function ManageProducts(props: Props) {
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

  const categoryDisclosure = useDisclosure();
  const manuFacturersDisclosure = useDisclosure();
  return (
    <>
      <Flex justifyContent="center" flexDirection="column">
        <Flex justifyContent="center" mt="100px">
          <Button alignSelf="center" w="300px" m="50px" onClick={manuFacturersDisclosure.onOpen}>
            Agregar Fabricante
          </Button>
          <Button alignSelf="center" w="300px" m="50px" onClick={categoryDisclosure.onOpen}>
            Agregar Categoria
          </Button>

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
        </Flex>
      </Flex>
    </>
  );
}
