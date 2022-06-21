import { Button, Flex, FormLabel, Grid, Input, Text, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { ClientData, NewRepair } from '../../../helpers/types';
import { AddClientForm } from './AddClientForm';
import { ExistentClient } from './ExistentClient';
import { NonexistentClient } from './NonexistentClient';
import { SearchClient } from './SearchClient';

export const initialClientForm = {
  dni: '',
  nombre: '',
  apellido: '',
  telefono: '',
  direccion: '',
  email: '',
};

type Props = {
  clientData: ClientData;
  setClientData: React.Dispatch<React.SetStateAction<ClientData>>;
  newRepair: NewRepair;
  setNewRepair: React.Dispatch<React.SetStateAction<NewRepair>>;
};

export function AddClient(props: Props) {
  return (
    <>
      {!props.clientData.data && (
        <SearchClient
          clientData={props.clientData}
          setClientData={props.setClientData}
          newRepair={props.newRepair}
          setNewRepair={props.setNewRepair}
        />
      )}

      {props.clientData.data &&
        props.clientData.data.length === 0 &&
        props.newRepair.isNewClient === 'no' && (
          <NonexistentClient
            clientData={props.clientData}
            setClientData={props.setClientData}
            newRepair={props.newRepair}
            setNewRepair={props.setNewRepair}
          />
        )}

      {props.clientData.data && props.clientData.data.length > 0 && (
        <ExistentClient
          data={props.clientData.data[0]}
          setClientData={props.setClientData}
          newRepair={props.newRepair}
          setNewRepair={props.setNewRepair}
        />
      )}

      {props.newRepair.isNewClient === 'yes' && (
        <AddClientForm newRepair={props.newRepair} setNewRepair={props.setNewRepair} />
      )}
    </>
  );
}
