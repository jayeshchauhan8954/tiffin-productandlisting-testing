import toast from 'react-hot-toast';
import { _toastVariants } from '../constants/constants';

const showMessage = (options, optionalType) => {
  const _options = { message: options?.message, variant: options?.variant };
  if (typeof options === 'string') {
    _options.message = options;
    _options.variant = optionalType;
  }

  const { variant, message } = _options;
  switch (variant) {
    case _toastVariants.Success:
      toast.success(message);
      break;
    case _toastVariants.Error:
      toast.error(message);
      break;
    default:
      toast(message);
      break;
  }
};

export { showMessage };
