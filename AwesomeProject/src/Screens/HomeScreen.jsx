import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Preloader from '../components/Preloader';
import ListPosts from '../components/ListPosts';
import ModalComments from '../components/ModalComments';

import { getPosts } from '../utils/api';
import snackbar from '../utils/snackbar';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [idPostOpen, setIdPostOpen] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    allPostGet();
  }, []);

  const onError = ({ cb }) => {
    snackbar({ cb });
  };

  const allPostGet = async () => {
    try {
      setIsLoading(true);

      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.log('allPostGet', error);
      snackbar({ cb: allPostGet });
    }
    setIsLoading(false);
  };

  const handleOpenModal = id => {
    setModalVisible(true);
    setIdPostOpen(id);
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Preloader /> : <ListPosts posts={posts} handleOpenComment={handleOpenModal} />}
      <ModalComments
        onError={onError}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        id={idPostOpen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#fff',
  },
});

export default HomeScreen;
