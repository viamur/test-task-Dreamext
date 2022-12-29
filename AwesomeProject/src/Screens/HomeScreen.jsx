import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dirs, FileSystem } from 'react-native-file-access';

import Preloader from '../components/Preloader';
import ListPosts from '../components/ListPosts';
import ModalComments from '../components/ModalComments';

import { getPosts } from '../utils/api';
import snackbar from '../utils/snackbar';

const HomeScreen = ({ netInfo }) => {
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

  const workWithFileSystem = async ({ type, data }) => {
    try {
      if (type === 'write') {
        await FileSystem.writeFile(Dirs.CacheDir + '/posts.json', JSON.stringify(data));
        return;
      }

      if (type === 'read') {
        const dataFile = await FileSystem.readFile(Dirs.CacheDir + '/posts.json');
        const dataParse = JSON.parse(dataFile);

        return dataParse;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const allPostGet = async () => {
    try {
      setIsLoading(true);

      let data;

      if (netInfo) {
        data = await getPosts();
        await workWithFileSystem({ type: 'write', data });
      }

      if (!netInfo) {
        data = await workWithFileSystem({ type: 'read' });
      }

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
