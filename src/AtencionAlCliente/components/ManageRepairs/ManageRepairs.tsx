import {
  ArrowBackIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TagLabel,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../shared/hooks/useFetch';
import { ManageRepairItem } from './ManageRepairItem';
import { ManageRepairTitle } from './ManageRepairTitle';

export type DataReparaciones = {
  [key: string]: string | DataRegistros[];
  total: string;
  registros: DataRegistros[];
};

export type DataRegistros = {
  [key: string]: string;
  dni: string;
  nombre: string;
  apellido: string;
  telefono: string;
  direccion: string;
  email: string;
  nombre_comercial: string;
  nombre_categoria: string;
  modelo: string;
  numero_serie: string;
  garantia: string;
  desperfecto: string;
  nro_reparacion: string;
  estado: string;
};

const initialSearch = {
  termino: '',
  parametro: 'nro_reparacion',
  estado: '',
  totalRegistros: '',
  totalPaginas: '',
  pagina: '1',
  mostrar: '10',
};

const initialConfig = {
  termino: '',
  parametro: 'nro_reparacion',
  estado: '',
};

export function ManageRepairs() {
  const [search, setSearch] = useState(initialSearch);
  const [config, setConfig] = useState(initialConfig);
  const [numPag, setNumPag] = useState('1');

  const [urlReparaciones, setUrlReparaciones] = useState(
    'http://localhost/reparaciones/reparaciones?page=1&quantity=10&parameter=nro_reparacion&value=&state=todos',
  );

  const {
    loading: loadingRep,
    error: errorRep,
    data: reparaciones,
  } = useFetch<DataReparaciones>(urlReparaciones);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig((last) => {
      return {
        ...last,
        termino: e.target.value,
      };
    });
  };

  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConfig((last) => {
      return {
        ...last,
        estado: e.target.value,
      };
    });
  };

  const handleMostrarChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearch((last) => {
      return {
        ...last,
        mostrar: e.target.value,
        pagina: '1',
      };
    });
  };

  const handleRadioChange = (value: string) => {
    setConfig((last) => {
      return {
        ...last,
        parametro: value,
      };
    });
  };

  const sendQuery = () => {
    setUrlReparaciones(
      `http://localhost/reparaciones/reparaciones?page=${search.pagina}&quantity=${search.mostrar}&parameter=${search.parametro}&value=${search.termino}&state=${search.estado}`,
    );
  };

  useEffect(() => {
    setSearch((last) => {
      return {
        ...last,
        totalRegistros: reparaciones ? reparaciones.total : '0',
        totalPaginas: reparaciones
          ? Math.ceil(parseInt(reparaciones.total) / parseInt(search.mostrar)).toString() !== '0'
            ? Math.ceil(parseInt(reparaciones.total) / parseInt(search.mostrar)).toString()
            : '1'
          : '1',
      };
    });
  }, [reparaciones]);

  useEffect(() => {
    console.log(search);
    sendQuery();
  }, [search.pagina, search.mostrar, search.termino, search.parametro, search.estado]);

  const handlePageChange = (value: number) => {
    setSearch((last) => {
      return {
        ...last,
        pagina: value.toString(),
      };
    });
  };

  const handleNumberInputChange = (value: string) => {
    setNumPag(value);
  };

  const handleBuscarButton = () => {
    setSearch((last) => {
      return {
        ...last,
        termino: config.termino,
        parametro: config.parametro,
        estado: config.estado,
        pagina: '1',
      };
    });
  };

  const handleNumberInputButton = () => {
    setSearch((last) => {
      return {
        ...last,
        pagina: numPag,
      };
    });
  };

  return (
    <Flex flexDirection="column" justifyContent="space-between" minH="493px">
      <Flex flexDirection="column">
        <Flex mb="20px" justifyContent="space-between">
          <Flex>
            <Input
              w="200px"
              mr="20px"
              value={config.termino}
              onChange={handleInputChange}
              placeholder="Buscar Reparaciones"
            />
            <Button onClick={handleBuscarButton}>Buscar</Button>
          </Flex>
          <Flex>
            <FormLabel alignSelf="center" textAlign="center" m="5px" fontSize="0.85em">
              Buscar por:
            </FormLabel>
            <RadioGroup
              name="parametro"
              onChange={handleRadioChange}
              value={config.parametro}
              margin="5px"
            >
              <Stack direction="row" justifyContent="center">
                <Radio value="nro_reparacion">Nro</Radio>
                <Radio value="nombre">Nombre</Radio>
                <Radio value="apellido">Apellido</Radio>
                <Radio value="dni">Dni</Radio>
              </Stack>
            </RadioGroup>
          </Flex>
          <Flex>
            <TagLabel alignSelf="center" mr="10px">
              Estados:
            </TagLabel>
            <Select name="estado" w="200px" onChange={handleEstadoChange}>
              {[
                'todos',
                'ingresada',
                'presupuestada',
                'rechazada por cliente',
                'esperando repuestos',
                'esperando inicio',
                'iniciada',
                'finalizada',
                'abonada',
                'entregada',
              ].map((item) => (
                <option style={{ background: '#111' }} value={item} key={item}>
                  {item.toUpperCase()}
                </option>
              ))}
            </Select>
          </Flex>
        </Flex>
        <ManageRepairTitle />
        {reparaciones &&
          reparaciones.registros.map((item) => (
            <ManageRepairItem data={item} key={item.nro_reparacion} />
          ))}
        {reparaciones && reparaciones.registros.length === 0 && (
          <Text fontWeight={700} mt="120px">
            {' '}
            No hay Registros que coincidan con los criterios de busqueda{' '}
          </Text>
        )}
      </Flex>
      <Flex justifyContent="space-between" mt="20px">
        <IconButton
          aria-label="Search database"
          onClick={() => handlePageChange(1)}
          isDisabled={search.pagina === '1'}
          icon={<ArrowLeftIcon />}
        />
        <IconButton
          aria-label="Search database"
          onClick={() => handlePageChange(parseInt(search.pagina) - 1)}
          isDisabled={search.pagina === '1'}
          icon={<ChevronLeftIcon w="32px" h="32px" />}
        />
        <Flex>
          <Text alignSelf="center">
            Pagina {search.pagina} de {search.totalPaginas}
          </Text>
        </Flex>
        <Flex>
          <TagLabel alignSelf="center" mr="10px">
            Ir a Pagina:
          </TagLabel>
          <NumberInput
            defaultValue={1}
            min={1}
            max={parseInt(search.totalPaginas)}
            w="80px"
            mr="20px"
            onChange={handleNumberInputChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button onClick={handleNumberInputButton}>Ir</Button>
        </Flex>
        <Flex>
          <TagLabel alignSelf="center" mr="10px">
            Resultados por Pagina:
          </TagLabel>
          <Select defaultValue="10" name="estado" w="200px" onChange={handleMostrarChange}>
            {['5', '10', '25', '50', '100'].map((item) => (
              <option style={{ background: '#111' }} value={item} key={item}>
                {item.toUpperCase()}
              </option>
            ))}
          </Select>
        </Flex>
        <IconButton
          aria-label="Search database"
          onClick={() => handlePageChange(parseInt(search.pagina) + 1)}
          isDisabled={search.pagina === search.totalPaginas}
          icon={<ChevronRightIcon w="32px" h="32px" />}
        />
        <IconButton
          aria-label="Search database"
          onClick={() => handlePageChange(parseInt(search.totalPaginas))}
          isDisabled={search.pagina === search.totalPaginas}
          icon={<ArrowRightIcon />}
        />
      </Flex>
    </Flex>
  );
}
