import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// material
import { Box, FormHelperText, styled } from '@mui/material';
//
import EditorToolbar, { formats, redoChange, undoChange } from './QuillEditorToolbar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
  '& .ql-container.ql-snow': {
    borderColor: 'transparent',
    ...theme.typography.body1,
    fontFamily: theme.typography.fontFamily
  },
  '& .ql-editor': {
    minHeight: 150,
    '&.ql-blank::before': {
      fontStyle: 'normal',
      color: theme.palette.text.disabled
    },
    '& pre.ql-syntax': {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900]
    }
  }
}));

// ----------------------------------------------------------------------

QuillEditor.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  simple: PropTypes.bool,
  sx: PropTypes.object
};

import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import('supports-color');

export default function QuillEditor({ id, error, value, onChange, helperText, simple = false, sx, placeholder, ...other }) {

  useEffect(() => {
    hljs.configure({
      languages: ['javascript', 'jsx', 'sh', 'bash', 'html', 'scss', 'css', 'json']
    });
    window.hljs = hljs;
  }, []);

  const modules = {
    toolbar: {
      container: `#${id}`,
      handlers: {
        undo: undoChange,
        redo: redoChange
      }
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
    },
    syntax: true,
    clipboard: {
      matchVisual: false
    }
  };

  return (
    <Box>
      <RootStyle
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`
          }),
          ...sx
        }}
      >
        <EditorToolbar id={id} isSimple={simple} />
        <ReactQuill
          value={value}
          modules={modules}
          formats={formats}
          onChange={onChange}
          placeholder={placeholder ? placeholder : "Write here..."}
          {...other}
        />
      </RootStyle>
      {error && <FormHelperText error={error} sx={{ pl: 2 }}>{helperText}</FormHelperText>}
    </Box>
  );
}
