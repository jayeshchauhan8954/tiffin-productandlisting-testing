import { merge } from 'lodash';
import Accordion from './Accordion';
import Input from './Input';
import Table from './Table';
import Typography from './Typography';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return merge(Accordion(theme), Input(theme), Table(theme), Typography(theme));
}
