'use client';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// context
import { getAuthCookie } from '@/utils/helpers/authHelpers';
import { _routes } from '@/utils/endPoints/routes';
import LoadingScreen from '@/components/LoadingScreen';

export const LoginGuard = (props) => {
    const { children } = props;
    const router = useRouter();

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (getAuthCookie()) { // Find jwt , then redirect to product page
            router.push(_routes.user.products)
        } else {
            setChecked(true)
        }
    }, []);

    if (!checked) return <LoadingScreen />
    return children;
};

LoginGuard.propTypes = {
    children: PropTypes.node
};
