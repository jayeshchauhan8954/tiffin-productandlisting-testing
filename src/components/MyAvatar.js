// material
import { MAvatar } from '@/components/@material-extend';


// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  return (
    <MAvatar src={""} alt={""} {...other}>
      {/* {user?.name?.at(0)} */}
    </MAvatar>
  );
}
