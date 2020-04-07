import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {
  AutoCompleteInput,
  AttachButton,
  SendButton,
} from 'stream-chat-react-native';

export const InputBox = props => {
  return (
    <View style={styles.container}>
      <AutoCompleteInput {...props} />
      <View style={styles.actionsContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              props.appendText('@');
            }}>
            <Text style={styles.textActionLabel}>@</Text>
          </TouchableOpacity>
          {/* Text editor is not functional yet. We will cover it in some future tutorials */}
          <TouchableOpacity style={styles.textEditorContainer}>
            <Text style={styles.textActionLabel}>Aa</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <AttachButton {...props} />
          <SendButton {...props} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    height: 60,
  },
  actionsContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  row: {flexDirection: 'row'},
  textActionLabel: {
    color: '#787878',
    fontSize: 18,
  },
  textEditorContainer: {
    marginLeft: 10,
  },
});
