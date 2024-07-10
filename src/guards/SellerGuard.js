import LoadingScreen from '@/components/LoadingScreen';
import { getAuth } from '@/redux/selectors/authSelectors';
import { _UserType } from '@/utils/constants/constants';
import { _routes } from '@/utils/endPoints/routes';
import { getAuthCookie } from '@/utils/helpers/authHelpers';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function SellerGuard({ children }) {
    const router = useRouter();

    const { isAuth, userType } = useSelector(getAuth)
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (getAuthCookie()) { // Find jwt , then redirect to product page
            if (userType === 2) {
                setChecked(true) // Here... mean seller want access seller routing
            } else {
                router.push(_routes.user.products) // Here... mean user is logged in
            }
        } else {
            router.push(_routes.user.products) // Here... mean guest user access the seller routes
        }
    }, [isAuth, userType]);

    if (!checked) return <LoadingScreen />
    return children;
}
