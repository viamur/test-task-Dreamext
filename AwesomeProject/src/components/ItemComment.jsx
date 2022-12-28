import { StyleSheet, Text, View } from 'react-native';

const ItemComment = ({ data }) => {
  const { name, body } = data;
  return (
    <View style={styles.wrap}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{name.slice(0, 1)}</Text>
      </View>
      <Text>{body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 20,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,

    backgroundColor: '#ffe6e6',
    marginRight: 20,
  },
  avatarText: {
    fontSize: 12,
    color: '#282828',

    textAlign: 'center',
  },
});

export default ItemComment;
