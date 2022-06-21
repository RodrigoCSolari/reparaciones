import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import { Data } from "./HomeTabs";
import { RepairModalItem } from "./RepairModalItem";
import { RepairModalTitle } from "./RepairModalTitle";

type Props={
    disclosure: {
        isOpen: boolean;
        onOpen: () => void;
        onClose: () => void;
        onToggle: () => void;
        isControlled: boolean;
        getButtonProps: (props?: any) => any;
        getDisclosureProps: (props?: any) => any;
    };
    state:Data;
    setState:React.Dispatch<React.SetStateAction<Data>>
    dniBuscado:string
}

export function RepairsModal(props:Props) {
    const { isOpen, onOpen, onClose } = props.disclosure;
    
    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay
                bg='whiteAlpha.50'
                backdropFilter='blur(4px)'
            />
          <ModalContent minWidth="900px" bgColor={"#222222FB"}>
            <ModalHeader textAlign="center">Reparaciones</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {props.state.data.length?
                    <>
                        <RepairModalTitle/>
                        {
                            props.state.data.map(item=>
                                <RepairModalItem 
                                    data={item}
                                    key={item.id_reparacion}
                                />
                            )
                        }
                    </>
                    :
                    <Text textAlign="center">No se encontraron reparaciones asociadas al dni {props.dniBuscado} en nuestro sistema.</Text>
                }
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Cerrar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
  }