import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import ItemPost from '../components/ItemPost';
import ModalComments from '../components/Modal';
import { getPosts } from '../utils/api';
import Snackbar from 'react-native-snackbar';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [idPostOpen, setIdPostOpen] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    allPostGet();
  }, []);

  const snacbarShow = () => {
    Snackbar.show({
      text: 'Сталась помилка',
      duration: 5000,
      action: {
        text: 'Повторити запит',
        textColor: 'green',
        onPress: () => {
          allPostGet();
        },
      },
    });
  };

  const allPostGet = async () => {
    try {
      setIsLoading(true);

      const data = await getPosts();
      setPosts(data);
      setIsLoading(false);
    } catch (error) {
      console.log('allPostGet', error);
      setIsLoading(false);
      snacbarShow();
    }
  };

  const handleOpenComment = id => {
    setModalVisible(true);
    setIdPostOpen(id);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#3EB489" />
      ) : (
        <FlatList
          data={posts}
          style={styles.list}
          renderItem={({ item }) => (
            <ItemPost data={item} openComment={handleOpenComment} id={item.id} />
          )}
          keyExtractor={(item, idx) => item.id.toString()}
        />
      )}
      <ModalComments
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
