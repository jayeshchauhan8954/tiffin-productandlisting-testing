import LoadingScreen from '@/components/LoadingScreen';
import { getAuth } from '@/redux/selectors/authSelectors';
import { _UserType } from '@/utils/constants/constants';
import { _routes } from '@/utils/endPoints/routes';
import { getAuthCookie } from '@/utils/helpers/authHelpers';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function UserAuthGuard({ children }) {
    const router = useRouter();

    const { isAuth, userType } = useSelector(getAuth)
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (getAuthCookie()) { // Find jwt , then redirect to product page
            if (userType === 1) {
                setChecked(true) 
            } else {
                router.push(_routes.user.products)
            }
        } else {
            router.push(_routes.user.products)
        }
    }, [isAuth, userType]);

    if (!checked) return <LoadingScreen />
    return children;
}
