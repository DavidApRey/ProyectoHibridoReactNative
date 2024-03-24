import * as React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, Button, PaperProvider, Divider } from 'react-native-paper';
import { CodigoMemoriaRAM } from '../../interfaces/products.interface';

interface Props {
  visible: boolean;
  hideModal: any;
  stylesGeneral: any;
  datosLista: CodigoMemoriaRAM[];
}

export const ModalWinRam = ({ stylesGeneral, hideModal, visible, datosLista }: Props) => {

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={stylesGeneral}>
        <View>
          <Text style={{
            fontSize: 30,
            color: 'black',
            fontWeight: '500',
            textAlign: 'center',
            padding: 10
          }}>Memoria Ram</Text>
          <Text style={{ fontSize: 17 }}>{`\u2022 Marca: ${datosLista[0].marca}`}</Text>
          <Text style={{ fontSize: 17 }}>{`\u2022 Capacidad: ${datosLista[0].capacidad} GB`}</Text>
          <Text style={{ fontSize: 17 }}>{`\u2022 Socket: ${datosLista[0].socket}`}</Text>
          <Text style={{ fontSize: 17 }}>{`\u2022 Velocidad: ${datosLista[0].velocidad} GHz`}</Text>
          <Divider style={{marginVertical: 10, paddingTop: 2}}/>
          <Button mode="contained" onPress={() => hideModal()}>Cerrar</Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default ModalWinRam;