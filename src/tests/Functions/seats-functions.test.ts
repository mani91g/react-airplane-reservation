import {fillSeats} from '../../Functions/seats-functions'

test('Test case 1', () =>{
    const result = fillSeats([], 0)
    const expectedResult = []
    expect(result).toStrictEqual(expectedResult)
})

test('Test case 2', () =>{
    const result = fillSeats([[3,2],[4,3],[2,3],[3,4]], 0)
    const expectedResult = [[[0,0,0],[0,0,0]],[[0,0,0,0],[0,0,0,0],[0,0,0,0]],
                            [[0,0],[0,0],[0,0]],[[0,0,0],[0,0,0],[0,0,0],[0,0,0]]]
    expect(result).toStrictEqual(expectedResult)
})

test('Test case 3', () =>{
    const result = fillSeats([[3,2],[4,3],[2,3],[3,4]], 30)
    const expectedResult = [[[19,25,1],[21,29,7]],[[2,26,27,3],[8,30,0,9],[13,0,0,14]],
                            [[4,5],[10,11],[15,16]],[[6,28,20],[12,0,22],[17,0,23],[18,0,24]]]
    expect(result).toStrictEqual(expectedResult)
})

test('Test case 4', () =>{
    const result = fillSeats([[3,2],[4,7],[2,3],[3,4]], 60)
    const expectedResult = [[[27, 33, 1],[29, 37, 7]],
                            [[2, 34, 35, 3],[8, 38, 39, 9],[13, 41, 42, 14],[18, 44, 45, 19],
                            [21, 47, 48,22],[ 23, 49, 50, 24],[25, 51, 52,26]],
                            [[ 4, 5 ], [ 10, 11 ], [ 15, 16 ]],
                            [[ 6, 36, 28 ],
                            [ 12, 40, 30 ],
                            [ 17, 43, 31 ],
                            [ 20, 46, 32 ]]]
    expect(result).toStrictEqual(expectedResult)
})
