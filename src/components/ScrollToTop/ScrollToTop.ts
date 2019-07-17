import { useEffect } from "react";
import { withRouter } from "react-router-dom";

// This route is used to scroll to the top during route change

interface History {
  history: any;
}

function ScrollToTop({ history }: History) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return null;
}

export default withRouter(ScrollToTop);
