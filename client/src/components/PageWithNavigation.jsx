import NavigationArrows from "./NavigationArrows";
import { useLocation } from "react-router-dom";

const PageWithNavigation = ({ children }) => {
  const location = useLocation();
  return (
    <>
      <NavigationArrows currentPath={location.pathname} />
      {children}
    </>
  );
};

export default PageWithNavigation;
?""