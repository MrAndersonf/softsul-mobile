import React, {MutableRefObject, useEffect} from 'react';

import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('screen');
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import SelectDropdown from 'react-native-select-dropdown';

interface ISelectProps {
  value: string | null;
  options: string[];
  label: string;
  name: string;
  selection: (field: string, value: string | undefined) => void;
}

export interface ISelectHandle {
  reset: () => void;
}

const Select: React.ForwardRefRenderFunction<ISelectHandle, ISelectProps> = (
  {options, selection, label, name, value}: ISelectProps,
  ref,
) => {
  const [selected, setSelected] = React.useState<string | null>();

  const selectRef =
    React.useRef<SelectDropdown>() as MutableRefObject<SelectDropdown>;
  React.useImperativeHandle(ref, () => ({
    reset: () => {
      setSelected('');
      selectRef.current.reset();
    },
  }));

  useEffect(() => {
    setSelected(value === '' ? null : value);
  }, [value]);

  return (
    <SelectDropdown
      ref={selectRef}
      defaultValue={selected}
      data={options}
      buttonStyle={{
        width: '98%',
        backgroundColor: '#fff',
        height: 50,
        marginBottom: 2,
        marginTop: 5,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
      }}
      onSelect={selectedItem => {
        selection(name, selectedItem);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      buttonTextStyle={{
        marginLeft: -10,
        fontWeight: '600',
        color: '#000',
        fontFamily: 'Marvel-Regular',
        fontSize: 23,
      }}
      selectedRowTextStyle={{
        color: '#377EDC',
        fontWeight: 'bold',
        fontFamily: 'Marvel-Regular',
        fontSize: 23,
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
      defaultButtonText={label}
      renderDropdownIcon={isOpened => {
        return (
          <FontAwesome
            name={isOpened ? 'chevron-up' : 'chevron-down'}
            color={'#444'}
            size={16}
          />
        );
      }}
      dropdownIconPosition={'right'}
      dropdownStyle={styles.dropdown1DropdownStyle}
      rowStyle={styles.dropdown1RowStyle}
      rowTextStyle={styles.dropdown1RowTxtStyle}
    />
  );
};

export default React.forwardRef(Select);

const styles = StyleSheet.create({
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {
    color: '#444',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Marvel-Regular',
  },
});
