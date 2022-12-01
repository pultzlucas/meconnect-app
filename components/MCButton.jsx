import { Colors } from "meconnect-sdk"
import { ActivityIndicator, Button, Pressable, StyleSheet, Text, TouchableOpacity } from "react-native"

function MCButton({ styleType = 'primary', size = 'medium', onClick, children, style, isLoading = false, noElevation = false, disabled }) {
  const styleTypeString = styleType.charAt(0).toUpperCase() + styleType.slice(1)
  const sizeString = size.charAt(0).toUpperCase() + size.slice(1)
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        {
          display: 'flex'
        },
        styles[`button${styleTypeString}`],
        styles[`button${sizeString}`],
        {elevation: noElevation ? 0 : 3},
        { ...style },
      ]}
      disabled={disabled}
    >
      {isLoading && <ActivityIndicator size='small' color="white" />}
      {
        !isLoading &&
        <Text
          style={[
            styles[`text${styleTypeString}`],
            styles[`text${sizeString}`],
          ]}
        >{children}</Text>
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
  },
  buttonPrimary: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.LightGray,
    backgroundColor: Colors.DarkOrange,
    borderRadius: 8
  },
  buttonSecondary: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    borderColor: Colors.LightGray,
    borderWidth: 1,
    backgroundColor: '#EEEEEE',
    borderRadius: 10
  },

  textPrimary: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  textSecondary: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    color: Colors.DarkGray,
  },

  buttonSmall: {
    padding: 5,
  },
  buttonMedium: {
    padding: 14,
    width: '50%',
  },
  buttonLarge: {
    padding: 20,
    width: '80%',
  },

  textSmall: {
    fontSize: 14,
    lineHeight: 14,
  },
  textMedium: {
    fontSize: 17,
    lineHeight: 17,
  },
  textLarge: {
    fontSize: 20,
    lineHeight: 20,
  },

})

export default MCButton