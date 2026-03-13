import { describe, it, expect} from 'vitest'
import {storeToRefs} from "pinia";
import {useUserStore} from "../UserStorage";


describe('user storage', () => {
    it('returns token', () => {
        // 1. Arrange
        const userStorage = useUserStore();
        const testData = {"login":"Oliver.conner@gmail.com","password":"asdsadfrgdfsfs33","address":"wdwdw","token":"asdasdasdsadad"};
        userStorage.login(testData);

        // 2. Act
        const {authData} = storeToRefs(userStorage);

        // 3. Assert
        expect(authData.value).toEqual(testData)
    })
})