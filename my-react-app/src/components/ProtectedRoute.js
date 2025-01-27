import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ user, children }) {
  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, render the protected content
  return children;
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node.isRequired
};

export default ProtectedRoute; 