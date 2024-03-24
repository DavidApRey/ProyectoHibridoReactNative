import * as React from 'react';
import { FlatList, View } from 'react-native';
import { Modal, Portal, Text, Button, PaperProvider, Divider } from 'react-native-paper';
import { CodigoProcesador } from '../../interfaces/products.interface';

interface Props {
  visible: boolean;
  hideModal: any;
  stylesGeneral: any;
  datosLista: CodigoProcesador[];
}

export const ModalWinCpu = ({ stylesGeneral, hideModal, visible, datosLista }: Props) => {

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
          }}>Procesador</Text>
          <Text style={{ fontSize: 17 }}>{`\u2022 Marca: ${datosLista[0].marca}`}</Text>
          <Text style={{ fontSize: 17 }}>{`\u2022 Modelo: ${datosLista[0].modelo}`}</Text>
          <Text style={{ fontSize: 17 }}>{`\u2022 Numero Nucleos: ${datosLista[0].num_nucleos}`}</Text>
          <Text style={{ fontSize: 17 }}>{`\u2022 Velocidad: ${datosLista[0].velocidad} GHz`}</Text>
          <Divider style={{marginVertical: 10, paddingTop: 2}}/>
          <Button mode="contained" onPress={() => hideModal()}>Cerrar</Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default ModalWinCpu;