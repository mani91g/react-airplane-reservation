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

test('Test case 5', () =>{
    const result = fillSeats([[3,2],[4,3],[2,3],[3,4],[2,5]], 60)
    const expectedResult = [[[28,35,1],[30,39,9]],[[2,36,37,3],[10,40,41,11],[17,43,44,18]],
                            [[4,5],[12,13],[19,20]],[[6,38,7],[14,42,15],[21,45,22],[24,46,25]],
                            [[8,29],[16, 31],[23, 32],[26, 33],[27,34]]]
    expect(result).toStrictEqual(expectedResult)
})

test('Test case 6', ()=>{
    const result = fillSeats([[2,3],[3,3],[4,3]], 200)
    const expectedResult = [[[13,1],[15,5],[17,9]],
                            [[2,19,3],[6,22,7],[10,25,11]],
                            [[4,20,21,14],[8,23,24,16],[12,26,27,18]]]
    expect(result).toStrictEqual(expectedResult)
})

test('Test case 7', ()=>{
    const result = fillSeats([[3,2]],6)
    const expectedResult = [[[1,5,2],[3,6,4]]]
    expect(result).toStrictEqual(expectedResult)
})

test('Test case 8', ()=>{
    const result = fillSeats([[2,3]],6)
    const expectedResult = [[[1,2],[3,4],[5,6]]]
    expect(result).toStrictEqual(expectedResult)
})

test('Test case 9', ()=>{
    const result = fillSeats([[1,1]],6)
    const expectedResult = [[[1]]]
    expect(result).toStrictEqual(expectedResult)
})

test('Test case 10', ()=>{
    const result = fillSeats([[2,1]],6)
    const expectedResult = [[[1,2]]]
    expect(result).toStrictEqual(expectedResult)
})

test('Test case 11', ()=>{
    const result = fillSeats([[1,2]],6)
    const expectedResult = [[[1],[2]]]
    expect(result).toStrictEqual(expectedResult)
})

test('Test case 12', ()=>{
    const result = fillSeats([[2,2]],6)
    const expectedResult = [[[1,2],[3,4]]]
    expect(result).toStrictEqual(expectedResult)
})