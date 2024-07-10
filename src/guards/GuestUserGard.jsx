import LoadingScreen from '@/components/LoadingScreen';
import { getAuth } from '@/redux/selectors/authSelectors';
import { _UserType } from '@/utils/constants/constants';
import { _routes } from '@/utils/endPoints/routes';
import { getAuthCookie } from '@/utils/helpers/authHelpers';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function GuestUserGuard({ children }) {
    const router = useRouter();

    const { isAuth, userType } = useSelector(getAuth)
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (getAuthCookie()) { // Find jwt , then redirect to product page
            if (userType === 2) { // Here... mean seller want access for user routes ...  so denied here
                router.push(_routes.seller.dashboard)
            } else {
                setChecked(true)
            }
        }else{
            setChecked(true)
        }
    }, [isAuth, userType]);

    if (!checked) return <LoadingScreen />
    return children;
}
