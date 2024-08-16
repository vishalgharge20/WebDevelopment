


/// 1. write a function that returns the reverse of a string

// // 1st way
// function reverseString(str){
//     let reversedString = ''
//     for(let i =str.length-1;i>=0;i--){
//         reversedString = reversedString + str[i]
//     }
//     //return reversedString
//     console.log(reversedString)
// }
// reverseString('vishal')

// 2nd way (shortcut way)

// function reverseString(str){
//     // split the string into arr
//     // reverse the arr
//     //join the arr into string

//     // let arr = str.split('')
//     // reverseArray = arr.reverse()
//     // joinArr = reverseArray.join('')
//     // return joinArr

//     // or
//     return str.split('').reverse().join('')
// }
// console.log(reverseString('vishal'))



/// 2. Write a function that returns a longest word in a sentence

// 1st way
// function longestWord(str){
//     //split the string into seprate words, using ',' as seprator
//     let wordsArr = str.split(' ')
//     let len = 0
//     let longWord = ''
//     for(let i=0; i<wordsArr.length;i++){
//         if(wordsArr[i].length>len){
//             len= wordsArr[i].length
//             longWord = wordsArr[i]
//         } 
//     }
//     console.log(longWord) 
// }
// longestWord("hi this is the longest word excersies")

// // 2nd way
// function longestWord(str){
//     //split the string into seprate words, using ',' as seprator
//     let wordsArr = str.split(' ')
//     let len = 0
//     let longWord = ''
//     for(let word of wordsArr){
//         if(word.length>len){
//             len= word.length
//             longWord = word
//         }
//     }
//     console.log(longWord)  
// }
// longestWord("hi this is the longest word excersies")



// // 3. Write a Function that checks if the given string is palindrome or not

// // 1st way
// // using any of the method reverse the given string 
// // check if the string and reverse string are equal using '==='

// function isPalindrome(str){
//     // using spread method here
//     reverseString = [...str].reverse().join('')
//     // compare both the strings now

// return str===reverseString

// // same as below
//     // if(str===reverseString){
//     //     return true
//     // }
//     // else{
//     //     return false
//     // }
// }
// console.log(isPalindrome('mom'))



// 4. Write a function to remove duplicate elements from an array

// // 1st way
// function removeDupilcateArray(arr){
//     let refinedArray = []
//     for(let num of arr){
//         if(!refinedArray.includes(num)){                            // if(refinedArray.includes(num)){
//             refinedArray.push(num)                                  //     continue
//         }                                                           // }
//     }                                                               // else{
//     return refinedArray                                             //     refinedArray.push(num)
// }                                                                   // }
// removeDupilcateArray([1,2,3,4,1,2,6,8])            
        
// // 2nd way
// // use spread and ------> 'new Set(arr)' 
// function removeDupilcateArray(arr){
//     return uniqueElement = ([...new Set(arr)])
// }
// console.log(removeDupilcateArray([1,2,3,4,1,2,6,8]))

// // 3rd way using loops
// function removeDupilcateArray(arr){
//     let uniqueElement = []
//     for(let num of arr){
//         if(uniqueElement.indexOf(num)=== -1){
//             console.log(uniqueElement.indexOf(num))
//             uniqueElement.push(num)
//         }
//     }
//     return uniqueElement
// }
// console.log(removeDupilcateArray([1,2,3,4,1,2,6,8]))



// // 5. Write a function that checks if two strings are anagrams or not
// // example: 'listen' --> 'silent'

// //using sorting
// function areAnagran(str1,str2){
//     array1 = str1.split('').sort().join('')
//     array2 = str2.split('').sort().join('')
//     return array1===array2
// }
// console.log(areAnagran('listen','silent'))



// // 6. Write a function that returns number of vowels in a string

// function numOfVowels(str){
//     let vowels = ['a','e','i','o','u']
//     let num = 0
//     let lowerString = str.toLowerCase()
//     for(let char of lowerString ){
//         if(vowels.includes(char)){
//             num = num +1
//         }
//     }
//     return num
// }
// console.log(numOfVowels('numberofvowelsare'))



// 7. write a function to find the largest num in an array

// 1st way
// function largestNum(arr){
//     let largeNum = arr[0]
//     for(let num of arr ){
//         if(num>largeNum){
//             largeNum= num
//         }
//     }
//     return largeNum
// }
// console.log(largestNum([51,85,96,75,63,1,7,56,2,3,9,1,8,55,99,1,5,7,6,25,63,85,75,96]))

// // 2nd way
// function largestNum(arr){
//     return Math.max(...arr)
// }
// console.log(largestNum([51,85,96,75,63,1,7,56,2,3,9,1,8,55,99,1,5,7,6,25,63,85,75,96]))



// 8. write a function to check if a number is prime or not
// prime number ----> number which is divisble by itself and by 1

// function isPrimeNum(num){
//     for(i=2;i<num;i++){     // to make less iteration you can make loop run till i<num/2 bcz,//if more than 50% of num, it cannot be divisble completly
//         if(num%i===0){                      
//             return false                    // number is completely divisble by i, so its not a prime number
//         }
//         else{
//             return true                     //number is a prime number
//         }
//     }
// }

// console.log(isPrimeNum(7))



// // 8. write a function to calculate the factorial of the number

// function factorial(num){
//     let fact = 1
//     for(let i=num;i>=1;i--){
//         fact = fact * i
//     }
//     return fact
// }
// console.log(factorial(0))



// 9. write a function to remove all white spaces characters from the string
// \s ---> white space, tabs and line breaks
// g ---> global search it searches for more occurence

// 1st way
// function removeSpaces(str){
//     updatedString = ''
//     for(let char of str){
//         if(char!==' '){
//             updatedString = updatedString + char
//         }
//     }
//     return updatedString
// }
// console.log(removeSpaces('Hello, World'))

// // 2nd way
// function removeSpaces(str){
//     result = str.replace(/\s/g, "");
//     return result
// }
// console.log(removeSpaces('Hello, World'))