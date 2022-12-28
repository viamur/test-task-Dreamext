import { useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import ListComments from './ListComments';
import Preloader from './Preloader';

import { getComments } from '../utils/api';
// import snackbar from '../utils/snackbar';

const ModalComments = ({ setModalVisible, modalVisible, id, onError }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const cb = () => {
    setModalVisible(true);
    allGetComments();
  };

  const allGetComments = async () => {
    try {
      setIsLoading(true);

      const data = await getComments(id);
      setComments(data);
    } catch (error) {
      console.log('allGetComments', error);
      onError({ cb });
      setModalVisible(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    id && allGetComments();
  }, [id]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={{ flex: 1 }}></View>
        </TouchableWithoutFeedback>
        <View style={styles.modalView}>
          {isLoading ? <Preloader /> : <ListComments comments={comments} />}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(201, 201, 201, 0.8)',
  },
  modalView: {
    width: '100%',
    height: '50%',

    borderRadius: 20,
    padding: 20,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'white',
  },
});

export default ModalComments;
