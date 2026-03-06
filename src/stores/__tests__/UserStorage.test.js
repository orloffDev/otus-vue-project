import { describe, it, expect} from 'vitest'
import {storeToRefs} from "pinia";
import {useUserStore} from "../UserStorage";


describe('user storage', () => {
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