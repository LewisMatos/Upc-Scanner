import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { getUPC } from './graphql';
import { RNCamera } from 'react-native-camera';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      myWidth: '',
      products: [],
    };
  }

  onBarCodeRead = e => {
    let upc = { upc: e.data };
    if (this.state.products.length > 0) {
      // console.log(this.state.products);
      let hasCode = this.state.products.some(product => {
        // console.log(product);
        return product.upc == upc.upc;
      });
      if (hasCode) {
        this.setState({ success: hasCode });
        return true;
      }
    }
    API.graphql(graphqlOperation(getUPC, upc))
      .then(response => {
        // console.log(response);
        let item = response.data.queryUPCSByUpcCode.items[0];
        if (item) {
          this.setState({ success: true, products: [item, ...this.state.products] });
        } else {
          this.setState({ success: false });
        }
      })
      .catch(e => {
        // console.log(e);
      });
  };

  onLayout = event => {
    const { width } = event.nativeEvent.layout;
    this.setState({ myWidth: width });
  };

  render() {
    const { myWidth, success } = this.state;
    return (
      <View style={styles().container}>
        <RNCamera
          // barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          flashMode={RNCamera.Constants.FlashMode.on}
          style={styles().camera}
          onBarCodeRead={this.onBarCodeRead}
        />
        <View onLayout={this.onLayout} style={styles(myWidth).detect_box} />
        <View style={{ width: '100%' }}>
          <Text style={styles().success}>{success ? 'Success' : 'Not found'}</Text>
        </View>
      </View>
    );
  }
}

const styles = myWidth =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    camera: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
    },
    detect_box: {
      flex: 1,
      position: 'absolute',
      top: '50%',
      left: '50%',
      backgroundColor: 'rgba(500,000,000,0.1)',
      borderColor: 'red',
      borderWidth: 10,
      borderStyle: 'dashed',
      borderRadius: 50,
      transform: [{ translateX: -Math.abs(myWidth / 2) }, { translateY: -Math.abs(myWidth / 2) }],
      width: 300,
      height: 300,
    },
    success: {
      fontSize: 70,
      color: 'red',
      width: '100%',
      textAlign: 'center',
      backgroundColor: 'black',
    },
  });
