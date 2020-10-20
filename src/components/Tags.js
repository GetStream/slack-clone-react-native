import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

class Tags extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      containerStyle,
      style,
      tagContainerStyle,
      tagTextStyle,
      deleteTagOnPress,
      onTagPress,
      renderTag,
    } = this.props;

    return (
      <View style={[styles.container, containerStyle, style]}>
        {this.props.tags.map((tag, index) => {
          const tagProps = {
            tag,
            index,
            deleteTagOnPress,
            onPress: event => {
              event.persist();
              onTagPress && onTagPress(index, tag, event, false);
            },
            tagContainerStyle,
            tagTextStyle,
          };

          return renderTag(tagProps);
        })}

        <TextInput
          style={{
            flex: 1,
            marginRight: 2,
          }}
          value={this.props.text}
          onChangeText={this.props.onChangeText}
          onSubmitEditing={this.onSubmitEditing}
          {...this.props.textInputProps}
        />
      </View>
    );
  }
}

Tags.defaultProps = {
  initialTags: [],
  initialText: ' ',
  createTagOnString: [',', ' '],
  createTagOnReturn: false,
  readonly: false,
  deleteTagOnPress: true,
  maxNumberOfTags: Number.POSITIVE_INFINITY,
};

Tags.propTypes = {
  initialText: PropTypes.string,
  initialTags: PropTypes.arrayOf(PropTypes.string),
  createTagOnString: PropTypes.array,
  createTagOnReturn: PropTypes.bool,
  onChangeTags: PropTypes.func,
  readonly: PropTypes.bool,
  maxNumberOfTags: PropTypes.number,
  deleteTagOnPress: PropTypes.bool,
  renderTag: PropTypes.func,
  /* style props */
  containerStyle: PropTypes.any,
  style: PropTypes.any,
  inputContainerStyle: PropTypes.any,
  inputStyle: PropTypes.any,
  tagContainerStyle: PropTypes.any,
  tagTextStyle: PropTypes.any,
  textInputProps: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 1,
  },

  textInputContainer: {
    flex: 1,
    minWidth: 100,
    height: 32,
    margin: 4,
    borderRadius: 16,
    backgroundColor: '#ccc',
  },

  textInput: {
    margin: 0,
    padding: 0,
    paddingLeft: 12,
    paddingRight: 12,
    flex: 1,
    height: 32,
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.87)',
  },

  tag: {
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    paddingLeft: 12,
    paddingRight: 12,
    height: 32,
    margin: 4,
  },
  tagLabel: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.87)',
  },
});

export {Tags};
export default Tags;
