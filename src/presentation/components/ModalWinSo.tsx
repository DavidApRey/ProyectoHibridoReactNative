import * as React from 'react';
import { FlatList, View } from 'react-native';
import { Modal, Portal, Text, Button, PaperProvider, Divider } from 'react-native-paper';
import { CodigoSistemaOperativo } from '../../interfaces/products.interface';

interface Props {
  visible: boolean;
  hideModal: any;
  stylesGeneral: any;
  datosLista: CodigoSistemaOperativo[];
}

export const ModalWinSo = ({ stylesGeneral, hideModal, visible, datosLista }: Props) => {

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
          }}>Sistema Operativo</Text>
          <Text style={{ fontSize: 17 }}>{`\u2022 Marca: ${datosLista[0].marca}`}</Text>
          <Text style={{ fontSize: 17 }}>{`\u2022 Sistema Operativo: ${datosLista[0].sistema_operativo}`}</Text>
          <Text style={{ fontSize: 17 }}>{`\u2022 Version: ${datosLista[0].version_so}`}</Text>
          <Divider style={{ marginVertical: 10, paddingTop: 2 }} />
          <Button mode="contained" onPress={() => hideModal()}>Cerrar</Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default ModalWinSo;