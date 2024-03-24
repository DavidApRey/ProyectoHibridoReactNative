import SelectDropdown from 'react-native-select-dropdown'

interface Props {
    onPress: (cant: number) => void;
}

export const SelectInput = ({onPress}: Props) => {

    const lista = [1,2,3,4,5]

    return (
        <SelectDropdown
            buttonStyle={{
                width: '100%',
                marginTop: 10,
                backgroundColor: '#6553A6',
                borderRadius: 30,
            }}
            defaultButtonText='Cantidad'
            buttonTextStyle={{
                color: 'white'
            }}
            data={lista}
            onSelect={(selectedItem, index) => {
                onPress(selectedItem);
            }}
            
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                return item
            }}
        />
    )
}
