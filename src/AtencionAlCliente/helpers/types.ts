export type ClientData = {
  loading: boolean;
  error: null | unknown;
  data: ClientForm[] | null;
};

export type ClientForm = {
  [key: string]: string;
  dni: string;
  nombre: string;
  apellido: string;
  telefono: string;
  direccion: string;
  email: string;
};

export type ProductForm = {
  cuit_fabricante: string;
  id_categoria: string;
  modelo: string;
  numero_serie: string;
};

export type DetailsForm = {
  garantia: string;
  desperfecto: string;
};

export type NewRepair = {
  [key: string]: string;
  dni: string;
  nombre: string;
  apellido: string;
  telefono: string;
  direccion: string;
  email: string;
  cuit_fabricante: string;
  nombre_comercial: string;
  id_categoria: string;
  nombre_categoria: string;
  modelo: string;
  numero_serie: string;
  garantia: string;
  desperfecto: string;
  step: string;
  isNewClient: string;
};
