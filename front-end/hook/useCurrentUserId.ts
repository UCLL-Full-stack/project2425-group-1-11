import { useState, useEffect } from 'react';

const useCurrentUserId = () => {
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('loggedInUser');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                if (user && user.id) {
                    setUserId(user.id);
                }
            } catch (error) {
                console.error('Failed to parse user from sessionStorage:', error);
            }
        }
    }, []);

    return userId;
};

export default useCurrentUserId;