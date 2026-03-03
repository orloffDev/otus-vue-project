import { describe, it, expect, beforeEach } from 'vitest'
import {createPinia, setActivePinia, storeToRefs} from "pinia";
import {useUserStore} from "../UserStorage";


describe('user storage', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('returns token', () => {
        // 1. Arrange
        const userStorage = useUserStore();
        const testToken = 'testToken';
        userStorage.save(testToken);

        // 2. Act
        const {token} = storeToRefs(userStorage);

        // 3. Assert
        expect(token.value).toBe(testToken)
    })
})