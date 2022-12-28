import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const ItemPost = ({ data, openComment, id }) => {
  return (
    <TouchableOpacity style={styles.wrap} onPress={() => openComment(id)}>
      <Text style={styles.title}>{data.title}</Text>
      <Text>{data.body}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderRadius: 10,
    color: '#232F34',

    padding: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    color: '#282828',
    textAlign: 'center',

    marginBottom: 10,
  },
});

export default ItemPost;
