import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

// This route is used to scroll to the top during route change

function ScrollToTop({ history }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, []);

  return (null);
}

export default withRouter(ScrollToTop);