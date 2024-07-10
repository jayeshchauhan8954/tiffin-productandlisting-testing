import PropTypes from 'prop-types';
import { useSearchParams } from 'next/navigation';
import { createContext, useState, useEffect } from 'react';
// material
import { useMediaQuery, useTheme } from '@mui/material';

// ----------------------------------------------------------------------

const initialState = {
  collapseClick: false,
  collapseHover: false,
  onToggleCollapse: () => { },
  onHoverEnter: () => { },
  onHoverLeave: () => { }
};

const CollapseDrawerContext = createContext(initialState);

CollapseDrawerProvider.propTypes = {
  children: PropTypes.node
};

function CollapseDrawerProvider({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  let showHeader;
  let queryHeaderInfo = useSearchParams().get("show_header");
  if (!queryHeaderInfo || queryHeaderInfo === '1') showHeader = true
  else if (queryHeaderInfo === '0') showHeader = false;

  let localSetHeader = sessionStorage.getItem('showHeader');
  if (localSetHeader && !queryHeaderInfo) {
    showHeader = localSetHeader === '0' ? false : true
  } else {
    sessionStorage.setItem('showHeader', showHeader ? '1' : '0');
  }

  const [collapse, setCollapse] = useState({
    click: false,
    hover: false,
    showHeader: showHeader
  });

  useEffect(() => {
    if (isMobile) {
      setCollapse((pre) => ({ ...pre, click: false, hover: false }));
    }
  }, [isMobile]);

  const handleToggleCollapse = () => {
    setCollapse({ ...collapse, click: !collapse.click });
  };

  const handleHoverEnter = () => {
    if (collapse.click) {
      setCollapse({ ...collapse, hover: true });
    }
  };

  const handleHoverLeave = () => {
    setCollapse({ ...collapse, hover: false });
  };

  return (
    <CollapseDrawerContext.Provider
      value={{
        isCollapse: collapse.click && !collapse.hover,
        collapseClick: collapse.click,
        collapseHover: collapse.hover,
        showHeader: collapse.showHeader,
        onToggleCollapse: handleToggleCollapse,
        onHoverEnter: handleHoverEnter,
        onHoverLeave: handleHoverLeave
      }}
    >
      {children}
    </CollapseDrawerContext.Provider>
  );
}

export { CollapseDrawerProvider, CollapseDrawerContext };
