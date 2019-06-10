import React from 'react';
import PropTypes from 'prop-types';
import { logoutUser } from 'store/user/actions';
import { connect } from 'react-redux';
import Error from '../../pages/_error';

export default AuthComponent => {
  class DefaultPage extends React.Component {
    static propTypes = {
      isAuthnticated: PropTypes.bool.isRequired,
      logoutUser: PropTypes.func.isRequired,
    };

    state = {
      error: {},
    };

    componentWillMount() {
      if (!this.props.isAuthnticated) {
        logoutUser();
        this.setState({
          error: {
            errorCode: 401,
            message: 'This page is available only to authorized users. Please login.',
          },
        });
      }
    }

    render() {
      const { error } = this.state;
      if (Object.keys(error).length === 0) {
        return <AuthComponent {...this.props} />;
      } else {
        return <Error statusCode={error.errorCode || 403} title={error.message || 'Forbidden'} />;
      }
    }
  }

  const mapStateToProps = state => ({
    isAuthnticated: state.user.isAuthnticated,
  });

  return connect(
    mapStateToProps,
    { logoutUser },
  )(DefaultPage);
};
