import BooksData from '../../data/books.json'
import JavaBooksData from '../../data/java.json'
import EmBooksData from '../../data/E-M.json'

/**
 * 获取所有的书籍数据（分类）
 */
export function getBooksData() {
    var books = mergeJson(JavaBooksData, EmBooksData)
    return mergeJson(BooksData, books)
}

function mergeJson(jsonbject1, jsonbject2) {
    var resultJsonObject = []
    for (var attr in jsonbject1) {
        resultJsonObject[attr] = jsonbject1[attr]
    }
    attr = parseInt(attr) + 1
    for (var attr1 in jsonbject2) {
        resultJsonObject[parseInt(attr) + parseInt(attr1)] = jsonbject2[attr1]
    }
    return resultJsonObject
}