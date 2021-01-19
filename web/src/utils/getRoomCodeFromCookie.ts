import { cookieStorageManager } from '@chakra-ui/react';
import Cookies from 'js-cookie';

export const getRoomCodeFromCookie = () => {
    const cookie = Cookies.get();
    console.log(`Come get dessert, boys ;)))) : ${cookie}`)
    return "gaming"
}