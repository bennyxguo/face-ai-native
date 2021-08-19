import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Layout from '../layout/Layout.jsx';

const withLayout = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <View style={styles.MainContainer}>
          <Layout>
            <WrappedComponent {...this.props} />
          </Layout>
        </View>
      );
    }
  };
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    // Set hex color code here.
    backgroundColor: '#1a1a1a'
  }
});

export default withLayout;
