import * as React from 'react';
import { FlatList, View } from 'react-native';
import { Modal, Portal, Text, Button, PaperProvider, Divider } from 'react-native-paper';

interface Props {
  visible: boolean;
  hideModal: any;
  stylesGeneral: any;
  datosLista: any[];
}

export const ModalWinAspecto = ({ stylesGeneral, hideModal, visible, datosLista }: Props) => {

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
          }}>Aspecto</Text>
          <Text style={{ fontSize: 17 }}>{`\u2022 Color: ${datosLista[0].color}`}</Text>
          <Text style={{ fontSize: 17 }}>{`\u2022 Modelo: ${datosLista[0].modelo}`}</Text>
          <Text style={{ fontSize: 17 }}>{`\u2022 Tamaño Pantalla: ${datosLista[0].tamaño_pantalla}`}</Text>
          <Text style={{ fontSize: 17 }}>{`\u2022 Resolucion: ${datosLista[0].resolucion_pantalla}`}</Text>
          <Text style={{ fontSize: 17 }}>{`\u2022 Garantia: ${datosLista[0].garantia}`}</Text>
          <Divider style={{marginVertical: 10, paddingTop: 2}}/>
          <Button mode="contained" onPress={() => hideModal()}>Cerrar</Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default ModalWinAspecto;